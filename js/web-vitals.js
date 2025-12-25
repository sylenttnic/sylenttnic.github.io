import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'https://unpkg.com/web-vitals@4?module';

function sendToGoogleAnalytics({name, delta, value, id}) {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/ga4
  if (typeof gtag === 'function') {
      gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        // Use a non-interaction event to avoid affecting bounce rate.
        non_interaction: true,
        // Also send the full value as a custom parameter if needed
        metric_value: value,
        metric_delta: delta
      });
  } else {
      console.warn('gtag not found, Web Vitals event not sent:', name);
  }
}

onCLS(sendToGoogleAnalytics);
onINP(sendToGoogleAnalytics);
onLCP(sendToGoogleAnalytics);
onFCP(sendToGoogleAnalytics);
onTTFB(sendToGoogleAnalytics);
