// Formatting helpers. They only format values passed in from the manifest.
const nf = new Intl.NumberFormat('en-IN');
export const num = (n) => nf.format(n);

const df = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const mf = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });
export const day = (iso) => (iso ? df.format(new Date(iso)) : null);
export const month = (iso) => (iso ? mf.format(new Date(iso)) : null);

// key with the largest value in a {key: count} object (ties: first in the given order)
export const topKey = (obj, order = Object.keys(obj)) =>
  order.reduce((best, k) => ((obj[k] ?? 0) > (obj[best] ?? 0) ? k : best), order[0]);

export const sum = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);
