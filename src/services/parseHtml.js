const ENTITY_MAP = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;',
  '&': '&amp;',
  '=': '&#61;'
};

export function formatXML(xml) {
  let formatted = '';
  let pad = 0;

  xml
    .replace(/(>)(<)(\/*)/g, '$1\r\n$2$3')
    .split('\r\n')
    .forEach(node => {
      let indent = 0;

      if (!node.match(/.+<\/\w[^>]*>$/) && node.match(/^<\w([^>]*[^/])?>.*$/)) {
        indent = 1;
      }

      if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      }

      formatted += `${'\t'.repeat(pad) + node}\r\n`;
      pad += indent;
    });

  return formatted;
}

export function sanitizeXML(xml) {
  return xml.replace(/[<>"'`&=]/g, char => ENTITY_MAP[char]);
}

export function colorizeXML(xml) {
  const parsedCode = xml
    // Hightlight HTML comments
    // Between '<!--' and '-->'
    .replace(
      /&lt;!--(.+?)--&gt;/gm,
      '<span class="code-gray">&lt;!--$1--&gt;</span>'
    )
    // Highlight HTML properties
    // After ' ' and until '=',
    .replace(
      /((&lt;\w+\s)|(&quot;\s))(.+?)(?=&#61;&quot;)/gm,
      '$1<span class="code-green">$4</span>'
    )
    // Highlight HTML quotes
    // Between quotes
    .replace(
      /&#61;&quot;(.+?)&quot;/gm,
      '&#61;<span class="code-yellow">&quot;$1&quot;</span>'
    )
    // Highlight HTML tags
    // Between html tags
    .replace(
      /&lt;(\/)?(\w+)(?=&gt;|\s)/gm,
      '&lt;$1<span class="code-pink">$2</span>'
    );

  return `<span class="code-ghost-white">${parsedCode}</span>`;
}

export function beautifyXML(xml) {
  const trimmedXml = xml.replace(/\s\s+|\t|\r\n|\n/gm, '');
  return colorizeXML(sanitizeXML(formatXML(trimmedXml)));
}

export default beautifyXML;
