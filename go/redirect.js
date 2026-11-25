'use strict';
(function () {
  const config = window.ELPIDI_LINKS;
  const params = new URLSearchParams(window.location.search);
  const destination = params.get('to');
  const token = params.get('id') || '';
  const anchor = document.getElementById('continue');
  const status = document.getElementById('status');
  if (!config || !Object.prototype.hasOwnProperty.call(config.destinations, destination)) {
    status.textContent = 'Aquest enllaç no és vàlid. Pots visitar la web de Roger.';
    return;
  }
  const target = config.destinations[destination];
  anchor.href = target;
  anchor.textContent = destination === 'dossier' ? 'Obrir el dossier' : 'Obrir la web';
  const redirect = () => window.location.replace(target);
  // A preview never records. Use a separate TEST token for end-to-end checks.
  if (params.get('preview') === '1' || !/^[a-f0-9]{32}$/.test(token) ||
      !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(config.endpoint)) {
    redirect();
    return;
  }
  // Only a code, destination and random event ID leave this page. No cookies,
  // localStorage, referrer, email, IP collection or browser fingerprint.
  const eventId = crypto.randomUUID().replaceAll('-', '');
  const payload = JSON.stringify({token, destination, eventId});
  // no-cors is intentional: Apps Script cannot expose a readable CORS response.
  // Resolution is NOT proof of a saved event. Check the private sheet instead.
  const recording = fetch(config.endpoint, {
    method: 'POST', mode: 'no-cors', credentials: 'omit',
    referrerPolicy: 'no-referrer', keepalive: true,
    headers: {'Content-Type': 'text/plain;charset=UTF-8'}, body: payload
  }).catch(() => undefined);
  // Never prevent opening the project if analytics is slow or blocked.
  Promise.race([recording, new Promise(resolve => setTimeout(resolve, 900))])
    .then(redirect);
})();
