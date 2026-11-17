/**
 * Resolves an asset URL correctly regardless of host environment:
 * - GitHub Pages (subpath /SAKTHI-GARMENTS/)
 * - Custom Domain (https://sakthigarments.in/)
 * - Localhost dev server & production jar
 */
export function getAssetUrl(path: string | undefined): string {
  if (!path) return '';
  if (/^(https?:|\/\/|data:|blob:)/i.test(path)) {
    return path;
  }
  // Strip any leading slashes
  const clean = path.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || './';
  if (base.endsWith('/')) {
    return `${base}${clean}`;
  }
  return `${base}/${clean}`;
}

export default getAssetUrl;
