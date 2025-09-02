
(function(){
  'use strict';

  const c = console.log.bind(document);

  let host = window.location.host;
  if (host.includes("github")) {
    document.querySelector("link[rel='shortcut icon']").href = "../ka_assets/favicon2.ico";
  // console.log('den finns på github')
  }

  // Ordningen (måste matcha JSON-fälten)
  var FIELDS = ['Tidigmorgon','Vardagkvall','Vardagnatt','Helgerdagtid','Helgnatt','Storhelg'];
  var PRETTY = {
    Tidigmorgon: 'Tidiga morgnar',
    Vardagkvall: 'Vardagskvällar',
    Vardagnatt: 'Vardagsnätter',
    Helgerdagtid: 'Helger dagtid',
    Helgnatt: 'Helgnätter',
    Storhelg: 'Storhelger'
  };

  // UI: skapa kryssrutor
  var checks = d3.select('#checks');
  var rowElements = [];
  FIELDS.forEach(function(key){
    var row = checks.append('label').attr('class','row');
    row.append('input')
      .attr('type','checkbox')
      .attr('value', key)
      .attr('data-key', key)
      .style('width', '18px')
      .style('height', '18px')
      .style('margin-right', '4px');
    row.append('span').text(PRETTY[key]);
    rowElements.push(row.node());
  });

  // Animate rows one by one on load
  function animateRows(rows, delay) {
    // Detect columns from CSS grid
    var checksEl = document.getElementById('checks');
    var computed = window.getComputedStyle(checksEl);
    var gridTemplate = computed.getPropertyValue('grid-template-columns');
    var columns = gridTemplate.split(' ').length;
    if (window.innerWidth < 600 || columns < 2) {
      // Animate row by row (default)
      rows.forEach(function(row, i) {
        setTimeout(function() {
          row.classList.add('animate-highlight');
          setTimeout(function() {
            row.classList.remove('animate-highlight');
          }, 800);
        }, i * delay);
      });
    } else {
      // Animate column by column
      // Build columns: each column is an array of row nodes
      var gridColumns = Array.from({length: columns}, () => []);
      rows.forEach(function(row, i) {
        var col = i % columns;
        gridColumns[col].push(row);
      });
      // Animate column by column, top to bottom
      var idx = 0;
      gridColumns.forEach(function(colRows) {
        colRows.forEach(function(row) {
          setTimeout(function() {
            row.classList.add('animate-highlight');
            setTimeout(function() {
              row.classList.remove('animate-highlight');
            }, 800);
          }, idx * delay);
          idx++;
        });
      });
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    animateRows(rowElements, 200);
    var animationInterval = setInterval(function() {
      animateRows(rowElements, 200);
    }, 5000);

    // Stop animation when any box is checked
    document.getElementById('checks').addEventListener('change', function(e) {
      var anyChecked = Array.from(document.querySelectorAll('#checks input[type=checkbox][data-key]')).some(function(cb) { return cb.checked; });
      if (anyChecked && animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
    });
  });

  var clearDiv = checks.append('div')
    .attr('class', 'clear-row')
    .style('margin-top', '10px')
    .style('padding-top', '10px')
    .style('border-top', '1px solid #ddd')
    .style('display', 'block')
    .style('width', '100%');

  // Lägg till "rensa" checkbox
  var clearRow = clearDiv.append('label').attr('class','row');
  clearRow.append('input')
    .attr('type','checkbox')
    .attr('id', 'clearAll')
    .style('width', '18px')
    .style('height', '18px')
    .style('margin-right', '8px');
  clearRow.append('span').text('Rensa');

  // Hjälpfunktioner
  function keyFromSelection(selectedSet) {
    return FIELDS.map(function(f){ return selectedSet.has(f) ? '1' : '0'; }).join('');
  }
  function matchesInclusive(rec, selectedSet) {
    var ok = true;
    selectedSet.forEach(function(f){ if (!rec[f]) ok = false; });
    return ok;
  }

  var countEl = d3.select('#count');
  var svg = d3.select('#bar');
  
  // Gör SVG responsiv genom att ta bort fasta dimensioner
  svg.attr('width', null).attr('height', null)
      .style('width', '100%')
      .style('height', '120px')
      .attr('viewBox', null);
  
  // Lägg till SVG för pie chart
  var pieSvg = d3.select('#pie');
  pieSvg.attr('width', null).attr('height', null)
        .style('width', '100%')
        .style('height', '200px')
        .attr('viewBox', null);
  
  // Funktion för att få aktuella dimensioner
  function getCurrentDimensions() {
    var rect = svg.node().getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  }
  
  function getPieDimensions() {
    var rect = pieSvg.node().getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  }
  
  function getResponsiveMargin() {
    if (window.innerWidth < 600) {
      return {left: 40, right: 40, top: 8, bottom: 8};
    } else {
      return {left: 60, right: 50, top: 8, bottom: 8};
    }
  }
  var margin = getResponsiveMargin();
  var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  var pieG = pieSvg.append('g');
  
  // Funktion för att beräkna bar-dimensioner
  function getBarDimensions() {
    var dims = getCurrentDimensions();
    var barW = dims.width - margin.left - margin.right;
    var barH = dims.height - margin.top - margin.bottom;
    return {barW: barW, barH: barH};
  }

  var kommuner = [];     // radlista per kommun med boolar
  var comboMap = new Map(); // bitnyckel ("101010") -> Antal
  var totalMax = 0;

  // Ladda data
  d3.json('kommuner.json').then(function(kommunData){
    kommuner = kommunData;

    c(kommuner.length)

      // Logga kommunnamn (org) för varje val
      FIELDS.forEach(function(field) {
        var namnLista = kommuner
          .filter(function(rec) { return rec[field]; })
          .map(function(rec) { return rec.Org; }); // 'kommun' istället för 'org'
        // console.log(field + ':', namnLista);
      });

    // Bygg comboMap från alla möjliga kombinationer i data
    comboMap = new Map();
    kommuner.forEach(function(d){
      var selected = new Set(FIELDS.filter(function(f){ return d[f]; }));
      var key = keyFromSelection(selected);
      comboMap.set(key, (comboMap.get(key) || 0) + 1);
    });

    console.log('ComboMap built with', comboMap.size, 'unique combinations');
    console.log('All combinations in data:');
    Array.from(comboMap.entries()).forEach(function(entry) {
      var key = entry[0];
      var count = entry[1];
      var fields = [];
      for (var i = 0; i < FIELDS.length; i++) {
        if (key[i] === '1') fields.push(FIELDS[i]);
      }
      console.log('Key:', key, '| Fields:', fields.join(', '), '| Count:', count);
    });


    totalMax = d3.max(Array.from(comboMap.values())) || 0;
    drawBar(0, Math.max(totalMax, kommuner.length)); // Initialt visa 0 valda
    drawPie(0, kommuner.length); // Rita initial pie chart med 0 valda

    updateCount();
  }).catch(function(err){
    // Enkel felhantering i konsolen
    console.error('Kunde inte ladda JSON:', err);
  });

  function drawBar(value, max) {
    console.log('drawBar called with value:', value, 'max:', max);
    g.selectAll('*').remove();
    
    // Få aktuella dimensioner
    var barDims = getBarDimensions();
    var barW = barDims.barW;
    var barH = barDims.barH;
    
    var totalKommuner = kommuner.length; // 153
    var useMax = Math.max(max || 1, totalKommuner);
    var x = d3.scaleLinear().domain([0, useMax]).range([0, barW]);
    
    // Lägg till bara en bottom line utan ticks eller värden
    g.append('line')
      .attr('x1', 0)
      .attr('x2', barW)
      .attr('y1', barH - 1)
      .attr('y2', barH - 1)
      // .attr('stroke', '#999')
      .attr('stroke-width', 2);
    
    var barHeight = (barH - 20) / 2; // Dela höjden för två staplar
    
    // Övre stapel: Totalt antal kommuner (alltid 153)
    var totalWidth = x(totalKommuner);
    g.append('rect')
      .attr('x', 0)
      .attr('y', 4)
      .attr('width', totalWidth)
      .attr('height', barHeight)
      .attr('fill', '#E0E0E0') // Ljusgrå för total
      // .attr('stroke', '#999')
      .attr('stroke-width', 1);
      
    // Undre stapel: Valt antal
    var selectedWidth = x(value);
    console.log('Bar width calculated:', selectedWidth);
    // var valueFontSize = '20px';
    
    g.append('rect')
      .attr('x', 0)
      .attr('y', 8 + barHeight)
      .attr('width', selectedWidth)
      .attr('height', barHeight)
      .attr('fill', '#2e4874'); // Blå för valt antal

    // Värden till höger om staplarna
    g.append('text')
      .attr('x', totalWidth + 4)
      .attr('y', 4 + barHeight/2)
      .attr('dy','0.35em')
      .attr('class', 'BodyImage-caption value')
      .attr('text-anchor','start')
      //Setting size with css instead
      // .style('font-size', valueFontSize)
      .style('font-weight', 'bold')
      .text(totalKommuner.toLocaleString('sv-SE'));
      
    g.append('text')
      .attr('x', selectedWidth + 4)
      .attr('y', 8 + barHeight + barHeight/2)
      .attr('dy','0.35em')
      .attr('text-anchor','start')
      .attr('class', 'BodyImage-caption value')
       //Setting size with css instead
      // .style('font-size', valueFontSize)
      .style('font-weight', 'bold')
      .style('fill', '#2e4874') // Blå för att matcha stapeln
      .text(value.toLocaleString('sv-SE'));
      
    // Labels
    g.append('text')
      .attr('x', -6).attr('y', 4 + barHeight/2).attr('dy','0.35em')
      .attr('text-anchor','end')
      .attr('class', 'BodyImage-caption totalt-valda')
      // .style('font-size', '12px')
      .text('Totalt');
      
    g.append('text')
      .attr('x', -6).attr('y', 8 + barHeight + barHeight/2).attr('dy','0.35em')
      .attr('text-anchor','end')
      .attr('class', 'BodyImage-caption totalt-valda')
      // .style('font-size', '12px')
      .text('Valda');
    informHeight();
  }

  function drawPie(selectedCount, totalCount) {
    pieG.selectAll('*').remove();
    
    var pieDims = getPieDimensions();
    var width = pieDims.width;
    var height = pieDims.height;
    var radius = Math.min(width, height) / 2 - 20;
    
    // Centrera pie chart
    pieG.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    var data = [
      { label: 'Valda kommuner', value: selectedCount, color: '#4CAF50' },
      { label: 'Övriga kommuner', value: totalCount - selectedCount, color: '#E0E0E0' }
    ];
    
    // Ta bort segment med värde 0
    data = data.filter(function(d) { return d.value > 0; });
    
    var pie = d3.pie()
      .value(function(d) { return d.value; })
      .sort(null);
    
    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
    
    var labelArc = d3.arc()
      .innerRadius(radius + 10)
      .outerRadius(radius + 10);
    
    var arcs = pieG.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');
    
    // Rita segmenten
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', function(d) { return d.data.color; })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);
    
    // Lägg till värden som text
    arcs.append('text')
      .attr('transform', function(d) { 
        var centroid = arc.centroid(d);
        return 'translate(' + centroid + ')'; 
      })
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', function(d) {
        // Använd vit text för mörka färger, svart för ljusa
        return d.data.color === '#4CAF50' ? 'white' : '#333';
      })
      .text(function(d) { 
        return d.data.value > 0 ? d.data.value.toLocaleString('sv-SE') : '';
      });
    
    // Lägg till legend
    var legend = pieG.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(' + (-width/2 + 20) + ',' + (height/2 - 40) + ')');
    
    var legendItems = legend.selectAll('.legend-item')
      .data(data)
      .enter().append('g')
      .attr('class', 'legend-item')
      .attr('transform', function(d, i) { return 'translate(0,' + (i * 20) + ')'; });
    
    legendItems.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', function(d) { return d.color; })
      .attr('stroke', '#999')
      .attr('stroke-width', 1);
    
    legendItems.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .style('font-size', '12px')
      .text(function(d) { return d.label; });
    informHeight();
  }

  function updateCount() {
    var checked = document.querySelectorAll('#checks input[type=checkbox]:checked');
    console.log("klickar");
    
    var selected = new Set(Array.prototype.map.call(checked, function(el){ return el.dataset.key; }));
    
    console.log('Selected fields:', Array.from(selected));

    var count = 0;


  // Ny kod för drawer
  const showBtn = document.getElementById("showDrawer");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeDrawer");
  const kommunListaEl = document.getElementById("kommunlista");

  // Funktionen du kallar när namnLista ska fyllas
  function uppdateraKommunlista(namnLista) {
    kommunListaEl.innerHTML = ""; // rensa gammal lista
    namnLista.forEach(namn => {
      const li = document.createElement("li");
      li.textContent = namn;
      kommunListaEl.appendChild(li);
    });
    informHeight();
  }



  function openDrawer() {
  drawer.classList.add("open");
  overlay.style.display = "block";
  informHeight();
  }

  function closeDrawer() {
  drawer.classList.remove("open");
  overlay.style.display = "none";
  informHeight();
  }

  showBtn.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // slut ny kod för drawer

    if (selected.size === 0) {
      count = 0; // Visa 0 när inget är valt i den nedre stapeln
      document.getElementById('kpi').classList.add('hidden');
      document.getElementById("showDrawer").classList.add('hidden');
    // Logga tom lista om inget är valt
    console.log('Kommuner (org) för valda fält:', []);
    } else {
      var matchandeKommuner = kommuner.filter(function(rec){ return matchesInclusive(rec, selected); });
      count = matchandeKommuner.length;
      document.getElementById('kpi').classList.remove('hidden');
      document.getElementById("showDrawer").classList.remove('hidden');

      var namnLista = matchandeKommuner.map(function(rec) { return rec.Org; });
      console.log('Kommuner (org) för valda fält:', namnLista);
      // document.getElementById("kommunlista").innerHTML = namnLista.join(', ');

      uppdateraKommunlista(namnLista);

      // Uppdatera KPI-texten med valda alternativ
      var selectedNames = Array.from(selected).map(function(key) {
        return PRETTY[key];
      });
      
      var kpiText = count.toLocaleString('sv-SE') + ' kommuner har barnomsorg ';
      if (selectedNames.length === 1) {
        kpiText += selectedNames[0].toLowerCase() + '.';
      } else if (selectedNames.length === 2) {
        kpiText += selectedNames[0].toLowerCase() + ' och ' + selectedNames[1].toLowerCase() + '.';
      } else {
        kpiText += selectedNames.slice(0, -1).map(function(name) {
          return name.toLowerCase();
        }).join(', ') + ' och ' + selectedNames[selectedNames.length - 1].toLowerCase() + '.';
      }
      
      var i = 0;
      var speed = 15;
      var kpiElement = document.getElementById('kpi');
      if (kpiElement) {
        kpiElement.innerHTML = ""; // Clear previous text
        function typeWriter() {
          if (i < kpiText.length) {
            kpiElement.innerHTML += kpiText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        }
        typeWriter();
      }

    }
    
    console.log('Found inclusive count:', count);

  countEl.text(count.toLocaleString('sv-SE'));
  drawBar(count, kommuner.length);
  drawPie(count, kommuner.length);
  }

  // Lyssna på UI
  document.getElementById('checks').addEventListener('change', updateCount);
  
  // Lyssna på fönster-storleksändringar för responsivitet
  var resizeTimeout;
  window.addEventListener('resize', function() {
    // Debounce resize events
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      if (kommuner.length > 0) {
        margin = getResponsiveMargin();
        var currentCount = parseInt(countEl.text().replace(/\s/g, '')) || 0;
        drawBar(currentCount, Math.max(totalMax, currentCount));
        drawPie(currentCount, kommuner.length);
        informHeight();
      }
    }, 100);
  });
  
  // Hantera "rensa" checkbox
  document.getElementById('clearAll').addEventListener('change', function(e) {
    if (e.target.checked) {
      // Avmarkera alla andra checkboxes
      var allCheckboxes = document.querySelectorAll('#checks input[type=checkbox][data-key]');
      Array.prototype.forEach.call(allCheckboxes, function(checkbox) {
        checkbox.checked = false;
      });
      // Avmarkera "rensa" checkbox också
      e.target.checked = false;
      updateCount();
    }
  });
})();
