let titles = d3.select("div.menu").selectAll("a").nodes();
titles = titles.map(item => item.textContent);

let filteredDivs = d3.select("div.content").selectAll("div")
  .filter(function() {
    let text = d3.select(this).select("b").text();
    return titles.includes(text);
  }).nodes();
d3.select("div.content").selectAll("div").remove();
d3.select("div.content").selectAll("div").data(filteredDivs).enter().append(d => d);