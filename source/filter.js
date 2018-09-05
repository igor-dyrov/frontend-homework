'use strict';

const TAGEXPR = /<\/?([^>\s]+)[^>]*>/g;
const MNEMES = {
    '\'': '&#39;',
    '"' : '&quot;',
    '&' : '&amp;',
    '<' : '&lt;',
    '>' : '&gt;'
};
const symbolReplace = str => str.replace(/./g, symbol => MNEMES[symbol] || symbol);

function filter(code, tags) {
  let result;
  let begin = 0;
    
  while (result = TAGEXPR.exec(code)) {
    const end = tags.find(item => item === result[1]) ? result.index : TAGEXPR.lastIndex; 
    const toReplace = code.substring(begin, end);
    const newString = symbolReplace(toReplace);
    const diff = newString.length - toReplace.length;
    code = code.replace(toReplace, newString);
    begin = TAGEXPR.lastIndex + diff;
  }
    
  if (begin != code.length - 1) {
     const toReplace = code.substring(begin);
     code = code.replace(toReplace, symbolReplace(toReplace));
  }
    
  return code;
}