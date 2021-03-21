/**
 * Zisti ci objekt je prazdny alebo nie
 */
function isEmtyObj(obj) {
   return Object.keys(obj).length === 0; //TRUE or FALSE
}

/**
 * Nahradi prve pismeno stringu za Velke
 */
function capitalize(s) {
   if (typeof s !== 'string') return '';
   return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * odstrani diakritiku
 */
function noDiacritics(s) {
   if (typeof s !== 'string') return '';
   return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export { isEmtyObj, capitalize, noDiacritics };
