const fs = require('fs');
const content = fs.readFileSync('/tmp/page.html', 'utf8');

const startMarker = 'goog.script.init("';
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error("Start marker not found");
    process.exit(1);
}

const dataStart = startIndex + startMarker.length;
// Find the closing "); that isn't escaped.
// Since it's a JS string literal, we can find the end by looking for the first " that isn't preceded by an odd number of \.
// But wait, the string itself is \x prefixed mostly.
// Let's just find the last "); in the file or something simpler.
let endIndex = content.lastIndexOf('");');

if (endIndex <= dataStart) {
    console.error("End marker not found or before start");
    process.exit(1);
}

const escaped = content.substring(dataStart, endIndex);
try {
    const actualStr = eval('"' + escaped + '"');
    if (actualStr.startsWith('https://')) {
        console.error("Redirected to abuse/login: " + actualStr);
        process.exit(1);
    }
    const data = JSON.parse(actualStr);
    fs.writeFileSync('/tmp/userHtml.html', data.userHtml);
    console.log("Extracted to /tmp/userHtml.html");
} catch (e) {
    console.error("Error during extraction: " + e.message);
    process.exit(1);
}
