export function flatKeyHelper(source: any, accumulator: any, prefix: string = '') {
  if (typeof source !== 'object') {
    accumulator[prefix] = source;
  } else if (Array.isArray(source)) {
    for (let i=0; i < source.length; i++) {
      const property = `${prefix}[${i}]`;
      flatKeyHelper(source[i], accumulator, property);
    }
  } else {
    for (const key in source) {
      const property = prefix ?  `${prefix}.${key}` : key;
      flatKeyHelper(source[key], accumulator, property);
    }
  }
}
