import { flatKeyHelper, validatePath } from '@helpers';

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
    return path.split('.').reduce((acc: string, part: string) => {
      if (acc === undefined || acc === null) {
        return;
      }
      const parts: string[] = part.split(/[\[\]]/).filter(Boolean);
      for (const part of parts) {
        acc = acc?.[part as any];
        if (acc === undefined) {
          return;
        }
      }
      return acc;
    }, src);
  }

  static set(path: string, value: any, src: any): boolean {
    if (!src) {
      return;
    }
    if (!path) {
      return false;
    }
    if (!validatePath(path)) {
      return false;
    }
    const keys = path.split('.');
    let target = src;
    for (let i = 0; i < keys.length; i++) {
      const parts = keys[i].split(/[\[\]]/).filter(Boolean);
      for (let j = 0; j < parts.length; j++) {
        const key = parts[j];
        const isLastKey = i === keys.length - 1 && j === parts.length - 1;
        if (isLastKey) {
          target[key] = value;
        } else {
          if (!target[key] || typeof target[key] !== 'object') {
            target[key] = /^\d+$/.test(parts[j + 1] || '') ? [] : {};
          }
          target = target[key];
        }
      }
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
    const keys = path.split('.');
    let target = src;
    for (let i = 0; i < keys.length; i++) {
      const parts = keys[i].split(/[\[\]]/).filter(Boolean);
      for (let j = 0; j < parts.length; j++) {
        const key = parts[j];
        const isLastKey = i === keys.length - 1 && j === parts.length - 1;
        if (isLastKey) {
          delete target[key];
        } else {
          if (!target[key] || typeof target[key] !== 'object') {
            target[key] = /^\d+$/.test(parts[j + 1] || '') ? [] : {};
          }
          target = target[key];
        }
      }
    }
    return true;
  }

  static flat(target: any): any {
    const flat: Record<string, any> = {};
    flatKeyHelper(target, flat);
    return flat;
  }
}
