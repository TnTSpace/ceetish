import { browser } from "$app/environment";
import type { iFilter, TFilter } from "$lib/interfaces";
import { get, type Writable } from "svelte/store";

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

export const paramify = (str: string | null) => {
  const $str = str as string
  return $str.toLowerCase().trim().replace(/\s+/g, '+') // Convert to lowercase and replace spaces with -
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

export const serializeParams = (store: Writable<iFilter>) => {
  const values = get(store)
  return {
    ...values,
    colors: values.colors.join("--"),
    sizes: values.sizes.join("--")
  }
}

export const pluralToSingular = (word: string) => {
  // Common rules for English pluralization
  const rules: [RegExp, string][] = [
      [/(m)en$/i, '$1an'],
      [/(pe)ople$/i, '$1rson'],
      [/(child)ren$/i, '$1'],
      [/(f)eet$/i, '$1oot'],
      [/(t)eeth$/i, '$1ooth'],
      [/(g)eese$/i, '$1oose'],
      [/(.*)ives$/i, '$1ife'],
      [/(.*)ves$/i, '$1f'],
      [/(.*)men$/i, '$1man'],
      [/(.*)ies$/i, '$1y'],
      [/(.*)s$/i, '$1'],
  ];

  for (let [rule, replacement] of rules) {
      if (rule.test(word)) {
          return word.replace(rule, replacement);
      }
  }

  // Default to returning the original word if no rule matches
  return word;
}

export const isActive = (paramValue: string, paramKey: string) => {
  if (browser) {
    const url = new URL(location.href);
    const searchParams = url.searchParams;
    const urlParamValue = searchParams.get(paramKey);
    return paramValue.toLowerCase() === urlParamValue?.toLowerCase();
  }
  return false;
};

export const act = (list: string[], str: string, action: 'remove' | 'add') => {
  switch (action) {
    case 'remove':
      let set = new Set(list);
      set.delete(str);
      list = Array.from(set);
      break;
    case 'add':
      list.push(str);
      list = list;
      break;
  }
  return list;
};

export const upperAndLowerLimit = (value: string) => {
  const pieces = value.split('-')
  const lowerLimit = Number(pieces[0])
  const upperLimit = Number(pieces[1])
  return { lowerLimit, upperLimit }
}