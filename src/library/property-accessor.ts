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
    if (
      (!path.includes('.') && !path.includes('[')) ||
      (!path.includes('[') && /^\d+\.\d+$/.test(path))
    ) {
      return [path];
    }

    const parts: string[] = [];
    const regex = /[^.[\]]+/g;
    let match;
    while ((match = regex.exec(path)) !== null) {
      parts.push(match[0]);
    }

    return parts;
  }
}
