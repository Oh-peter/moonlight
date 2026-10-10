export const getLocalStorageItem = <T>(key: string, fallbackValue: T | null = null): T | null => {
  if (typeof window === 'undefined') {
    return fallbackValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (!item || item === 'undefined') {
      return fallbackValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`LocalStorage parsing error for key "${key}":`, error);
    return fallbackValue;
  }
};

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;

  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`LocalStorage save error for key "${key}":`, error);
  }
};