'use strict';

const mNemReplace = str => str.replace(/./gi, symbol => MNEMES[symbol] || symbol);

function filter(code, tags) {

	const TAGEXPR = /<([^>]+)>/g;
	const MNEMES = {
  			"'": "&#39;",
  			'\"' : '&quot;',
			'&' : '&amp;',
			'<' : '&lt;',
			'>' : '&gt;'
	};

	let valid = false;
	let log = []; // watch for tags
	let begin = 0; // prev code block`s bieginning index
	let result;
	let newString = '';
	let end;

	while (result = TAGEXPR.exec(code)) {
		if (result[1][0] != '\/') {
			log.push(result[1]);
			end = result.index;
		} else {
			log.pop();
			end = TAGEXPR.lastIndex + 1;
		}
		if (tags.find(item => item === log[log.length - 1])) {
			if (!valid) {
				newString += MnemReplace(code.substring(begin, end));
				begin = end;
			}
			valid = true;
		} else {
			if (valid) {
				newString += code.substring(begin, end);
				begin = end;
			}
			valid = false;
		}
	}

	if (begin < code.length + 1) {
		newString += MnemReplace(code.substring(begin));
	}
	
	return newString;
}