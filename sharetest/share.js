console.log("script is running")

let host = window.location.host;
if (host.includes("github")) {
  document.querySelector("link[rel='shortcut icon']").href = "favicon2.ico";
  console.log('den finns på github')
}

console.log(document.querySelector('meta[property="og:title"]').content);
