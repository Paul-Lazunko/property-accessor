export function walk(currentPath: string, val: any, result: string[]) {
  if (val === null || typeof val !== 'object') {
    result.push(currentPath);
    return;
  }
  if (Array.isArray(val)) {
    if (!val.length) {
      result.push(currentPath);
    }
    for (let i = 0; i < val.length; i++) {
      walk(`${currentPath}[${i}]`, val[i], result);
    }
  } else {
    if (!Object.keys(val).length) {
      result.push(currentPath);
    }
    for (const key of Object.keys(val)) {
      walk(`${currentPath}.${key}`, val[key], result);
    }
  }
}
