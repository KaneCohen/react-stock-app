export function toMoney(n, c = 0, d = '.', t = ',') {
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  c = c > 0 ? c : (n - parseInt(n)) > 0 ? 2 : 0;
  let s = n < 0 ? '-' : '';
  let i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '';
  let j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}
