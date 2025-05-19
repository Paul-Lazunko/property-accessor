import { flatKeyHelper, validatePath } from '@helpers';

export class PropertyAccessor {
  protected target: any;

  constructor(target: any) {
    this.target = target;
  }

  public get(key: string) {
    return PropertyAccessor.get(key, this.target);
  }

  public set(key: string, value: any) {
    return PropertyAccessor.set(key, value, this.target);
  }

  public flat() {
    return PropertyAccessor.flat(this.target);
  }

  static get(path: string, src: any): any {
    if (!src) {
      return;
    }
    if (!path) {
      return src;
    }
    if (!validatePath(path)) {
      return;
    }

    const keys = PropertyAccessor.parsePath(path);
    return keys.reduce((acc: any, key: string) => {
      if (acc === undefined || acc === null) return;
      acc = acc[key];
      return acc;
    }, src);
  }

  static set(path: string, value: any, src: any): boolean {
    if (!src || !path || !validatePath(path)) {
      return false;
    }

    const keys = PropertyAccessor.parsePath(path);
    let target = src;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLast = i === keys.length - 1;

      if (isLast) {
        target[key] = value;
      } else {
        if (typeof target[key] !== 'object' || target[key] === null) {
          // Determine if the next key is numeric → assume array
          const nextKey = keys[i + 1];
          target[key] = /^\d+$/.test(nextKey) ? [] : {};
        }
        target = target[key];
      }
    }

    return true;
  }

  static flat(target: any): any {
    const flat: Record<string, any> = {};
    flatKeyHelper(target, flat);
    return flat;
  }

  static parsePath(path: string): string[] {
    const parts: string[] = [];
    let buffer: string = '';
    let insideBracket: boolean = false;

    for (let i = 0; i < path.length; i++) {
      const char: string = path[i];

      if (char === '.' && !insideBracket) {
        if (buffer !== '') {
          parts.push(buffer);
          buffer = '';
        }
      } else if (char === '[') {
        if (buffer !== '') {
          parts.push(buffer);
          buffer = '';
        }
        insideBracket = true;
      } else if (char === ']') {
        if (buffer !== '') {
          parts.push(buffer);
          buffer = '';
        }
        insideBracket = false;
      } else {
        buffer += char;
      }
    }

    if (buffer !== '') {
      parts.push(buffer);
    }

    const mergedParts: string[] = [];
    for (let i = 0; i < parts.length; i++) {
      const cur: string = parts[i];
      const next: string = parts[i + 1];

      if (next && /^\d+$/.test(cur) && /^\d+$/.test(next)) {
        mergedParts.push(`${cur}.${next}`);
        i++;
      } else {
        mergedParts.push(cur);
      }
    }
    return mergedParts;
  }

}
