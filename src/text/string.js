function trim (txt) {
  return txt.replace(/^\s+|\s+$/gm, '')
}

function isString (str) {
  return (typeof str === 'string' || str instanceof String)
}

export { trim, isString }
