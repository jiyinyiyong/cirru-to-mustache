// Generated by CoffeeScript 1.7.0
var cirru, handle, mustache, q, req, show;

q = function(query) {
  return document.querySelector(query);
};

cirru = require("cirru-parser");

mustache = require("./mustache");

console.log('start');

req = new XMLHttpRequest;

req.open("get", "./cirru/div.cr");

req.send();

req.onload = function() {
  var content;
  content = req.responseText;
  return show(content);
};

show = function(text) {
  var html, tree;
  q(".source").value = text;
  tree = cirru.parseShort(text);
  html = mustache.render(tree);
  q(".target").value = html;
  console.clear();
  return console.log(tree);
};

q(".source").onkeyup = function() {
  return show(this.value);
};

handle = function(event) {
  var indent, last_line, new_text, start, text_after, text_before;
  console.log(event.keyCode);
  if (event.keyCode === 13) {
    event.preventDefault();
    start = this.selectionStart;
    text_before = this.value.slice(0, start);
    text_after = this.value.slice(start);
    last_line = text_before.split("\n").reverse()[0];
    indent = "";
    while (last_line[0] === " ") {
      indent += " ";
      last_line = last_line.slice(1);
    }
    new_text = text_before + "\n" + indent + text_after;
    this.value = new_text;
    return this.selectionStart = this.selectionEnd = start + indent.length + 1;
  } else if (event.keyCode === 9) {
    event.preventDefault();
    start = this.selectionStart;
    text_before = this.value.slice(0, start);
    text_after = this.value.slice(start);
    new_text = text_before + "  " + text_after;
    this.value = new_text;
    return this.selectionStart = this.selectionEnd = start + 2;
  }
};

q("textarea.source").onkeydown = handle;

q("textarea.target").onkeydown = handle;
