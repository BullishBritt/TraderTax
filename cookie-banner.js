/**
 * TraderTax Cookie Consent Banner
 * Drop one script tag on every page:
 * <script src="/cookie-banner.js"></script>
 *
 * Fires on first visit. Remembers choice. Never shows again.
 */
(function() {
  const KEY = 'tt_cookie_prefs';

  // Already decided — do nothing
  if (localStorage.getItem(KEY)) return;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #tt-cookie-banner {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: #0a1628;
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      z-index: 99999;
      flex-wrap: wrap;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.3);
      animation: tt-cookie-slide 0.4s ease;
      font-family: 'DM Sans', system-ui, sans-serif;
    }
    @keyframes tt-cookie-slide {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    #tt-cookie-banner p {
      font-size: 13px;
      color: #ffffff;
      flex: 1;
      min-width: 200px;
      line-height: 1.55;
      margin: 0;
    }
    #tt-cookie-banner a {
      color: #3dba7e;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .tt-cookie-btns {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    .tt-cookie-btn {
      padding: 9px 20px;
      border-radius: 9px;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .tt-cookie-accept {
      background: #3dba7e;
      color: #fff;
    }
    .tt-cookie-accept:hover { background: #2ea86c; }
    .tt-cookie-decline {
      background: transparent;
      color: rgba(255,255,255,0.45);
      border: 1.5px solid rgba(255,255,255,0.15) !important;
    }
    .tt-cookie-decline:hover {
      border-color: rgba(255,255,255,0.4) !important;
      color: rgba(255,255,255,0.75);
    }
    @media (max-width: 560px) {
      #tt-cookie-banner { padding: 14px 16px; }
      .tt-cookie-btns { width: 100%; }
      .tt-cookie-btn  { flex: 1; text-align: center; }
    }
  `;
  document.head.appendChild(style);

  // Build banner HTML
  const banner = document.createElement('div');
  banner.id = 'tt-cookie-banner';
  banner.innerHTML = `
    <p>
      We use cookies for essential functionality, analytics, and affiliate tracking.
      See our <a href="/privacy.html">Privacy Policy</a>.
    </p>
    <div class="tt-cookie-btns">
      <button class="tt-cookie-btn tt-cookie-decline" id="tt-cookie-decline">Essential Only</button>
      <button class="tt-cookie-btn tt-cookie-accept" id="tt-cookie-accept">Accept All</button>
    </div>
  `;
  document.body.appendChild(banner);

  function dismiss(analytics) {
    localStorage.setItem(KEY, JSON.stringify({
      essential: true,
      analytics: analytics,
      marketing: analytics,
      timestamp: new Date().toISOString()
    }));
    banner.style.transition = 'opacity 0.3s, transform 0.3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => banner.remove(), 320);

    // GA4 consent mode (uncomment if using gtag consent mode v2)
    // if (typeof gtag !== 'undefined') {
    //   gtag('consent', 'update', {
    //     analytics_storage: analytics ? 'granted' : 'denied',
    //     ad_storage: 'denied'
    //   });
    // }
  }

  document.getElementById('tt-cookie-accept').onclick  = () => dismiss(true);
  document.getElementById('tt-cookie-decline').onclick = () => dismiss(false);
})();
