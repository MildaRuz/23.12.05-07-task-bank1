import { v4 as uuidv4 } from 'uuid';

const getLS = (key) => {
  const value = localStorage.getItem(key);
  if (null === value) {
    return [];
  }
  return JSON.parse(value);
};

const setLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const storeLS = (key, value) => {
  const id = uuidv4();
  value.id = id;
  const items = getLS(key);
  items.unshift(value);
  setLS(key, items);
  return id;
};

export const readLS = (key, id = 0) => {
  const items = getLS(key);
  if (id) {
    return items.find((item) => item.id === id);
  }
  return items;
};

export const updateLS = (key, id, value) => {
  const items = getLS(key).map((item) => (item.id === id ? { ...item, ...value, id } : item));
  setLS(key, items);
};

export const destroyLS = (key, id) => {
  const items = getLS(key).filter((item) => item.id !== id);
  setLS(key, items);
};
