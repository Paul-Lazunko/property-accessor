import { flatKeyHelper, splitPath, validatePath, walk } from '@helpers';

export class PropertyAccessor {
  protected target: any;

  constructor(target: any) {
    this.target = target;
  }
  public get(key: string): any {
    return PropertyAccessor.get(key, this.target);
  }

  public set(key: string, value: any): any {
    return PropertyAccessor.set(key, value, this.target);
  }

  public delete(key: string) {
    return PropertyAccessor.delete(key, this.target);
  }

  public flat(spaceReplacer?: string) {
    return PropertyAccessor.flat(this.target, spaceReplacer);
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
    return splitPath(path).reduce((acc: any, part: string) => {
      if (acc === undefined || acc === null) {
        return;
      }
      return acc[part];
    }, src);
  }

  static set(path: string, value: any, src: any): boolean {
    if (!src || !path || !validatePath(path)) {
      return false;
    }
    const parts = splitPath(path);
    let target = src;
    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      const isLast = i === parts.length - 1;
      if (isLast) {
        target[key] = value;
        return true;
      }
      if (target[key] === undefined || target[key] === null || typeof target[key] !== 'object') {
        const next = parts[i + 1];
        target[key] = /^\d+$/.test(next ?? '') ? [] : {};
      }
      target = target[key];
    }
    return true;
  }

  static delete(path: string, src: any): boolean {
    if (!src) {
      return;
    }
    if (!path) {
      return false;
    }
    if (!validatePath(path)) {
      return false;
    }
    const parts = splitPath(path);
    let target = src;
    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      const isLast = i === parts.length - 1;
      if (isLast) {
        delete target[key];
      } else {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = /^\d+$/.test(parts[i + 1] || '') ? [] : {};
        }
        target = target[key];
      }
    }
    return true;
  }

  static flat(target: any, spaceReplacer?: string): any {
    const flat: Record<string, any> = {};
    flatKeyHelper(target, flat, '', spaceReplacer);
    return flat;
  }

  static collectKeys(basePath: string, value: any): string[] {
    const result: string[] = [];
    walk(basePath, value, result);
    return result;
  }
}
