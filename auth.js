// Pont dels correus del compte (confirmar el correu, contrasenya nova). Els correus porten aquí, i
// no directament a l'app, perquè si s'obren a l'ordinador surti un missatge clar en lloc d'un error.
// Al mòbil, el botó torna a l'app amb el codi d'un sol ús perquè hi obri la sessió.
(function () {
  var params = new URLSearchParams(location.search + '&' + location.hash.replace(/^#/, ''));
  var to = params.get('to') || '';
  var code = params.get('code') || '';
  var failed = params.get('error') || params.get('error_code');

  // Només es torna a l'app (de la botiga o la de desenvolupament): mai a una adreça qualsevol.
  var match = /^(commandertower(?:-dev)?):\/\/\/?(auth\/(?:callback|reset))$/.exec(to);
  if (failed || !match) {
    document.getElementById('failed').hidden = false;
    return;
  }
  var scheme = match[1];
  var path = match[2];
  var reset = path === 'auth/reset';
  document.getElementById(reset ? 'reset' : 'confirmed').hidden = false;

  var target = path + (code ? '?code=' + encodeURIComponent(code) : '');
  var pkg = 'app.commandertower.mobile' + (scheme === 'commandertower-dev' ? '.dev' : '');
  // A Android, l'adreça "intent" obre l'app si hi és i, si no, porta a Google Play.
  var href = /Android/i.test(navigator.userAgent)
    ? 'intent://' + target + '#Intent;scheme=' + scheme + ';package=' + pkg + ';end'
    : scheme + '://' + target;
  document.getElementById(reset ? 'open-reset' : 'open-confirmed').href = href;
})();
