export function generateUniqueEmail(prefix = 'user'): string {
  const uniqueSuffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return `${prefix}${uniqueSuffix}@testmail.com`;
}

export function generateUniqueName(prefix = 'User'): string {
  const uniqueSuffix = Date.now().toString().slice(-6);
  return `${prefix}${uniqueSuffix}`;
}
