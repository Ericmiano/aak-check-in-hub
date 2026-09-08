const fs = require('fs');
const content = fs.readFileSync('/tmp/page.html', 'utf8');

const regex = /goog\.script\.init\("(.*?)"\);/s;
const match = content.match(regex);

if (match) {
    let escaped = match[1];
    // Evaluate the escaped string literal
    const actualStr = eval('"' + escaped + '"');
    const data = JSON.parse(actualStr);
    fs.writeFileSync('/tmp/userHtml.html', data.userHtml);
    console.log("Extracted to /tmp/userHtml.html");
} else {
    console.error("No match found");
}
