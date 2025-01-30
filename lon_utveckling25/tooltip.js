const enclosingDiv = d3.select(divId).node();
const divWidth = enclosingDiv.offsetWidth;
const divHeight = enclosingDiv.offsetHeight;
const tooltipWidth = tooltip.node().offsetWidth;
const tooltipHeight = tooltip.node().offsetHeight;

tooltip.style("left", (event.pageX + 10) + "px")
       .style("top", (event.pageY - 20) + "px");

// Adjust position to keep tooltip inside the enclosing div
let left = event.pageX + 10;
let top = event.pageY - 20;

if (left + tooltipWidth > divWidth) {
    left = divWidth - tooltipWidth - 10;
}

if (top + tooltipHeight > divHeight) {
    top = divHeight - tooltipHeight - 10;
}

tooltip.style("left", left + "px")
       .style("top", top + "px");