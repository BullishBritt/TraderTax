/**
 * TraderTax Affiliate Tracker
 * Captures ?ref= URL params, persists to localStorage, 
 * injects into all Firestore form submissions.
 */
window.TTAffiliate = (function() {

  const STORAGE_KEY = 'tt_ref';
  const EXPIRY_KEY  = 'tt_ref_exp';
  const TTL_DAYS    = 30;

  // On every page load — capture ?ref= if present
  (function capture() {
    const params = new URLSearchParams(window.location.search);
    const ref = (params.get('ref') || params.get('aff') || '').toUpperCase().trim();
    if (ref) {
      const expiry = Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000;
      try {
        localStorage.setItem(STORAGE_KEY, ref);
        localStorage.setItem(EXPIRY_KEY, expiry.toString());
      } catch(e) {}
    }
  })();

  function getCode() {
    try {
      const code   = localStorage.getItem(STORAGE_KEY);
      const expiry = parseInt(localStorage.getItem(EXPIRY_KEY) || '0', 10);
      if (code && Date.now() < expiry) return code;
      // Expired — clean up
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    } catch(e) {}
    return null;
  }

  // Returns object to spread into any Firestore .add() or .set() call
  function getPayload() {
    const code = getCode();
    if (!code) return {};
    return {
      referredBy:    code,
      referredAt:    new Date().toISOString(),
      referralSource: document.referrer || 'direct'
    };
  }

  function clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    } catch(e) {}
  }

  return { getCode, getPayload, clear };

})();
