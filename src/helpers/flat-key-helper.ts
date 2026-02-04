export function flatKeyHelper(source: any, accumulator: any, prefix: string = '', spaceReplacer?: string) {
  if (typeof source !== 'object') {
    accumulator[prefix] = source;
  } else if (Array.isArray(source)) {
    for (let i = 0; i < source.length; i++) {
      const property = `${prefix ? (spaceReplacer ? prefix.replace(/\s/g, spaceReplacer) : prefix) : ''}[${i}]`;
      flatKeyHelper(source[i], accumulator, property, spaceReplacer);
    }
  } else {
    for (const key in source) {
      const property = prefix
        ? spaceReplacer
          ? `${prefix.replace(/\s/g, spaceReplacer)}.${key.replace(/\s/g, spaceReplacer)}`
          : `${prefix}.${key}`
        : key;
      flatKeyHelper(source[key], accumulator, property, spaceReplacer);
    }
  }
}
