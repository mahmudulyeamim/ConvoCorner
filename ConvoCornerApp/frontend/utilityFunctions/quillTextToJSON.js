export function htmlToQuillDelta(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
  
    const delta = [];
    doc.body.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        delta.push({ insert: node.textContent });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const attributes = {};
        const insert = node.nodeName === 'STRONG' ? node.textContent : '';
  
        if (node.nodeName === 'STRONG') {
          attributes.bold = true;
        }
  
        if (node.nodeName === 'U') {
          attributes.underline = true;
        }
  
        delta.push({ insert, attributes });
      }
    });
    console.log(delta)
    return delta;
  }


