/* eslint-disable */

(function () {
  var body = document.body;
  var html = document.documentElement;
  var parentWindow = window.parent;

  function debounce(callback, wait) {
    var timeoutId = null;
    return function () {
      var args = [].slice.call(arguments);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(function () {
        callback.apply(null, args);
      }, wait);
    };
  }

  function getDocumentHeight() {
    return Math.max(body.scrollHeight, body.offsetHeight, html.offsetHeight);
  }

  function informHeight() {
    var height = getDocumentHeight();

    if (parentWindow && parentWindow.postMessage) {
      parentWindow.postMessage(
        {
          height: height,
        },
        '*',
      );
    }
  }

  var debouncedInformHeight = debounce(informHeight, 100);

  function informScrollIntoView() {
    if (parentWindow && parentWindow.postMessage) {
      parentWindow.postMessage(
        {
          scrollTop: true,
        },
        '*',
      );
    }
  }

  window.informHeight = informHeight;
  window.informScrollIntoView = informScrollIntoView;

  window.addEventListener('resize', debouncedInformHeight, false);
  window.addEventListener('load', debouncedInformHeight, false);
})();