const ENTITY_MAP = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;',
  '&': '&amp;',
  '=': '&#61;'
};

export default function(html) {
  const parsedCode = String(html)
    .replace(/[<>"'`&=]/g, char => {
      return ENTITY_MAP[char];
    })
    // Hightlight HTML comments
    // Between '<!--' and '-->'
    .replace(/&lt;!--(.+?)--&gt;/g, '<span class="code-gray">&lt;!--$1--&gt;</span>')
    // Highlight HTML properties
    // After ' ' and until '=',
    .replace(/\s(.+?)(?=&#61;&quot;)/g, ' <span class="code-green">$1</span>')
    // Highlight HTML quotes
    // Between quotes
    .replace(/&quot;(.+?)&quot;/g, '<span class="code-yellow">&quot;$1&quot;</span>')
    // Highlight HTML tags
    // Between html tags
    .replace(/&lt;(\/?)([^!]+?(?=(\s|&gt;)))/g, '&lt;$1<span class="code-pink">$2</span>')

  return '<span class="code-ghost-white">' + parsedCode + '</span>';
}
