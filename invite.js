// Pont d'una invitació: llegeix el codi de l'adreça i prepara el botó que obre l'app.
// Les apps de missatgeria només fan clicables els enllaços https, i aquesta pàgina n'és el destí.
(function () {
  var PACKAGE = 'app.commandertower.mobile';
  var kind = document.body.getAttribute('data-kind');
  var token = new URLSearchParams(location.search).get('t') || '';
  var open = document.getElementById('open');
  var invalid = document.getElementById('invalid');
  var valid = document.getElementById('valid');

  if (!/^[0-9a-f]{32}$/i.test(token)) {
    valid.hidden = true;
    invalid.hidden = false;
    return;
  }

  var path = '/' + kind + '/' + token;
  // A Android, l'adreça "intent" obre l'app si hi és i, si no, porta a Google Play.
  var android = /Android/i.test(navigator.userAgent);
  open.href = android
    ? 'intent://' + path + '#Intent;scheme=commandertower;package=' + PACKAGE + ';end'
    : 'commandertower://' + path;
  document.getElementById('code').textContent = token;
})();
