export const cleanupSize = (size: string): string =>
  size.includes('_') ? size.split('_')[0] : size;
