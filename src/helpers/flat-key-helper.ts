import { ISO_DATE_REGEXP } from '@const';

function needsBracketNotation(key: string): boolean {
  return ISO_DATE_REGEXP.test(key) || key.includes('.') || key.includes('[') || key.includes(']');
}

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
      const safePrefix = prefix ? (spaceReplacer ? prefix.replace(/\s/g, spaceReplacer) : prefix) : '';
      const safeKey = spaceReplacer ? key.replace(/\s/g, spaceReplacer) : key;
      const property = needsBracketNotation(key)
        ? `${safePrefix}['${safeKey}']`
        : safePrefix
          ? `${safePrefix}.${safeKey}`
          : safeKey;
      flatKeyHelper(source[key], accumulator, property, spaceReplacer);
    }
  }
}
