// Google Consent Mode v2 Initialization
window.dataLayer = window.dataLayer || [];
window.gtag = function() { window.dataLayer.push(arguments); };

var storedConsent = null;
try {
  storedConsent = JSON.parse(localStorage.getItem('f2fintech_cookie_consent'));
} catch (e) {}

var hasAnalytics = storedConsent && storedConsent.analytics;
var hasMarketing = storedConsent && storedConsent.marketing;

window.gtag('consent', 'default', {
  'ad_storage': hasMarketing ? 'granted' : 'denied',
  'analytics_storage': hasAnalytics ? 'granted' : 'denied',
  'ad_user_data': hasMarketing ? 'granted' : 'denied',
  'ad_personalization': hasMarketing ? 'granted' : 'denied'
});
