(function () {
  const conversionTarget = 'AW-18490439152/dqopCI6rsqsdEPDr9vBE';
  const contactLinkSelector = 'a[href*="wa.me"], a[href*="api.whatsapp.com"]';

  document.addEventListener('click', function (event) {
    const target = event.target;
    const link = target instanceof Element ? target.closest(contactLinkSelector) : null;

    if (!link || typeof window.gtag !== 'function') {
      return;
    }

    const opensSeparateContext =
      link.target === '_blank' ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0;

    const conversionEvent = {
      send_to: conversionTarget,
      event_category: 'lead',
      event_label: 'portfolio_whatsapp_contact_click'
    };

    // A new-tab link leaves the page open, so the conversion can send normally.
    if (opensSeparateContext) {
      window.gtag('event', 'conversion', conversionEvent);
      return;
    }

    // For same-tab links, wait for the conversion callback before navigating.
    event.preventDefault();
    let navigated = false;
    const continueToWhatsApp = function () {
      if (navigated) return;
      navigated = true;
      window.location.assign(link.href);
    };

    window.gtag('event', 'conversion', {
      ...conversionEvent,
      event_callback: continueToWhatsApp,
      event_timeout: 1200
    });

    // Keep the contact button usable if the tag is blocked or the callback never fires.
    window.setTimeout(continueToWhatsApp, 1600);
  });
})();
