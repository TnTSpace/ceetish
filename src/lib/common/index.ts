import type { TFilter } from "$lib/interfaces";

export const capitalize = (str: string) => {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const slugify = (str: string) => {
  return str.toLowerCase().trim().replace(/\s+/g, '-') // Convert to lowercase and replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove non-word characters except -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Remove leading -
    .replace(/-+$/, ''); // Remove trailing -
}

interface QueryParams {
  [key: string]: string;
}

export function updateUrlWithQueryParams(params: Record<TFilter, string>): void {
  // Get the current URL
  const url = new URL(window.location.href);

  // Store the initial search string
  const initialSearch = url.search;

  // Iterate through the object keys and add valid query parameters
  for (const key in params) {
    const tKey = key as TFilter
    const trimmedValue = params[tKey].trim();
    if (trimmedValue !== "") {
      url.searchParams.set(key, trimmedValue);
    } else {
      url.searchParams.delete(key);
    }
  }

  // Only update the location.href if the query string has changed
  if (url.search !== initialSearch) {
    window.location.href = url.toString();
  }
}
