import { VALID_PATH_REGEX } from '@const';

export function validatePath(key: string): boolean {
  const normalizedKey = key.replace(/\['([^']+)'\]/g, '[$1]').replace(/\["([^"]+)"\]/g, '[$1]');
  return VALID_PATH_REGEX.test(normalizedKey);
}
