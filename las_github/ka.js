var body = document.body;
var html = document.documentElement;
var hostname = window.location.hostname;
var path = window.location.pathname;
var parentWindow = window.parent;

function getDocumentHeight() {
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );
}

console.log(getDocumentHeight())

function informHeight() {
  var height = getDocumentHeight();
  var codepenSlug = '';
  var githubSlug = '';

  if (hostname.substr(-10) === 'codepen.io' || hostname.substr(-7) === 'cdpn.io') {
    codepenSlug = path.substr(path.lastIndexOf('/') + 1);
  } else if (hostname.substr(-29) === 'visualiseringar.lomediehus.se') {
    githubSlug = path.substr(1, path.substr(1).indexOf('/'));
  } else if (hostname.substr(-20) === 'lomediehus.github.io') {
    githubSlug = path.substr(16, path.substr(16).indexOf('/'));
  }

  if (parentWindow && parentWindow.postMessage) {
    parentWindow.postMessage({
      codepenSlug: codepenSlug,
      githubSlug: githubSlug,
      codepenHeight: height,
    }, '*');
  }
  console.log('informade')

}

window.addEventListener('resize', informHeight, false);
window.addEventListener('load', informHeight, false);
