
// const birthYearArray = [1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987];

const filearray = [
  {
    "Födelseår": 1953,
    "Lägsta pensionsålder": 61,
    "Riktålder": 65
  },
  {
    "Födelseår": 1954,
    "Lägsta pensionsålder": 61,
    "Riktålder": 65
  },
  {
    "Födelseår": 1955,
    "Lägsta pensionsålder": 61,
    "Riktålder": 65
  },
  {
    "Födelseår": 1956,
    "Lägsta pensionsålder": 61,
    "Riktålder": 65
  },
  {
    "Födelseår": 1957,
    "Lägsta pensionsålder": 61,
    "Riktålder": 65
  },
  {
    "Födelseår": 1958,
    "Lägsta pensionsålder": 61,
    "Riktålder": 66
  },
  {
    "Födelseår": 1959,
    "Lägsta pensionsålder": 62,
    "Riktålder": 66
  },
  {
    "Födelseår": 1960,
    "Lägsta pensionsålder": 62,
    "Riktålder": 67
  },
  {
    "Födelseår": 1961,
    "Lägsta pensionsålder": 63,
    "Riktålder": 67
  },
  {
    "Födelseår": 1962,
    "Lägsta pensionsålder": 63,
    "Riktålder": 67
  },
  {
    "Födelseår": 1963,
    "Lägsta pensionsålder": 64,
    "Riktålder": 67
  },
  {
    "Födelseår": 1964,
    "Lägsta pensionsålder": 64,
    "Riktålder": 67
  },
  {
    "Födelseår": 1965,
    "Lägsta pensionsålder": 64,
    "Riktålder": 67
  },
  {
    "Födelseår": 1966,
    "Lägsta pensionsålder": 64,
    "Riktålder": 67
  },
  {
    "Födelseår": 1967,
    "Lägsta pensionsålder": 64,
    "Riktålder": 67
  },
  {
    "Födelseår": 1968,
    "Lägsta pensionsålder": 64,
    "Riktålder": 68
  },
  {
    "Födelseår": 1969,
    "Lägsta pensionsålder": 64,
    "Riktålder": 68
  },
  {
    "Födelseår": 1970,
    "Lägsta pensionsålder": 64,
    "Riktålder": 68
  },
  {
    "Födelseår": 1971,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1972,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1973,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1974,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1975,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1976,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1977,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1978,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1979,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1980,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1981,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1982,
    "Lägsta pensionsålder": 65,
    "Riktålder": 68
  },
  {
    "Födelseår": 1983,
    "Lägsta pensionsålder": 65,
    "Riktålder": 69
  },
  {
    "Födelseår": 1984,
    "Lägsta pensionsålder": 65,
    "Riktålder": 69
  },
  {
    "Födelseår": 1985,
    "Lägsta pensionsålder": 65,
    "Riktålder": 69
  },
  {
    "Födelseår": 1986,
    "Lägsta pensionsålder": 66,
    "Riktålder": 69
  },
  {
    "Födelseår": 1987,
    "Lägsta pensionsålder": 66,
    "Riktålder": 69
  }
];

var p1 = document.getElementById('result1').firstElementChild.nextElementSibling;
var p2 = document.getElementById('result2').firstElementChild.nextElementSibling;



// fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2076398/pensionstabell.json')
//   .then(blob => blob.json())
//   .then(data => filearray.push(...data))




const valjar = document.getElementById('valjar');

valjar.addEventListener('change', function() {
  match(filearray);
})

var match = function(array) {

  for (var item in array) {
    if (array[item]['Födelseår'].toString() === valjar.value) {
      console.log(valjar.value)
      console.log('Lägsta pensionsålder: ' + array[item]['Lägsta pensionsålder'] + ' år ' + "Riktålder: " + array[item]["Riktålder"] + " år.");
      if (valjar.value === "Välj födelseår") {
        p1.innerHTML = "?";
        p2.innerHTML = "?";
      }
      else {
        p1.innerHTML = array[item]["Lägsta pensionsålder"];
        p2.innerHTML = array[item]["Riktålder"];
      }
    }
  }
}
