const storage = {
  getItem: (key: string) => {
    const value = localStorage.getItem(key);

    return Promise.resolve(value);
  },

  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);

    return Promise.resolve();
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);

    return Promise.resolve();
  },
};

export default storage;
