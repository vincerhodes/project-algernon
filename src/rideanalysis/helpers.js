export const getUrl = (value, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === value) {
      return array[i].url;
    }
  }
};

export const getValue = (url, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].url === url) {
      return array[i].value;
    }
  }
};