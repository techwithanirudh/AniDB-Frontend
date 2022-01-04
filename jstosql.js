let htmlToSql = {
  string: "VARCHAR(255)",
  number: "INT",
  boolean: "BOOLEAN",
  date: "DATE",
  array: "TEXT",
  object: "TEXT",
  null: "NULL",
  undefined: "NULL",
  function: "TEXT",
  symbol: "TEXT",
  bigint: "BIGINT",
  float: "FLOAT",
  double: "DOUBLE",
  decimal: "DECIMAL",
  any: "TEXT",
  dropdown: "TEXT",
  radio: "TEXT",
  checkbox: "TEXT",
  text: "TEXT",
  textarea: "TEXT",
  password: "TEXT",
  email: "TEXT",
  url: "TEXT",
  tel: "TEXT",
  integer: "INT",
};

// Find out the type of a text from a string.
// @param {string} text - The text to find the type of.
// @return {string} - The type of the text.
function getType(text) {
  if (text === "") {
    return "null";
  }
  if (text === "true" || text === "false") {
    return "boolean";
  }
  if (text.match(/^[0-9]+$/)) {
    return "number";
  }
  if (text.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    return "date";
  }
  // array
  if (text.match(/^\[.*\]$/)) {
    return "array";
  }
  // object
  if (text.match(/^\{.*\}$/)) {
    return "object";
  }
  // function
  if (text.match(/^function\(.*\)$/)) {
    return "function";
  }
  // symbol
  if (text.match(/^Symbol\(.*\)$/)) {
    return "symbol";
  }
  // bigint
  if (text.match(/^[0-9]+$/)) {
    return "bigint";
  }
  // float
  if (text.match(/^[0-9]+\.[0-9]+$/)) {
    return "float";
  }
  // double
  if (text.match(/^[0-9]+\.[0-9]+$/)) {
    return "double";
  }
  // decimal
  if (text.match(/^[0-9]+\.[0-9]+$/)) {
    return "decimal";
  }
  // any
  if (text.match(/^any$/)) {
    return "any";
  }
  // dropdown
  if (text.match(/^dropdown$/)) {
    return "dropdown";
  }
  // radio
  if (text.match(/^radio$/)) {
    return "radio";
  }
  // checkbox
  if (text.match(/^checkbox$/)) {
    return "checkbox";
  }
  // text
  if (text.match(/^text$/)) {
    return "text";
  }
  // textarea
  if (text.match(/^textarea$/)) {
    return "textarea";
  }
  // password
  if (text.match(/^password$/)) {
    return "password";
  }
  // email
  if (text.match(/^email$/)) {
    return "email";
  }
  // url
  if (text.match(/^url$/)) {
    return "url";
  }
  // tel
  if (text.match(/^tel$/)) {
    return "tel";
  }
  // integer
  if (text.match(/^integer$/)) {
    return "integer";
  }
  return "text";
}

function getSql(text) {
  return htmlToSql[getType(text)];
}
