export function splitPath(path: string): string[] {
  const parts: string[] = [];
  let current = '';
  let i = 0;

  while (i < path.length) {
    const char = path[i];

    if (char === '[') {
      if (current) {
        parts.push(current);
        current = '';
      }
      const end = path.indexOf(']', i);
      if (end === -1) {
        current += path.slice(i);
        break;
      }
      let inner = path.slice(i + 1, end);
      if ((inner.startsWith("'") && inner.endsWith("'")) || (inner.startsWith('"') && inner.endsWith('"'))) {
        inner = inner.slice(1, -1);
      }
      parts.push(inner);
      i = end + 1;
    } else if (char === '.') {
      if (current) {
        parts.push(current);
        current = '';
      }
      i++;
    } else {
      current += char;
      i++;
    }
  }

  if (current) {
    parts.push(current);
  }

  return parts;
}
