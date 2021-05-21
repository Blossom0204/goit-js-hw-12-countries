import { error } from '@pnotify/core';

const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}`).then(response => {
    if (!response.ok) {
      error({
        text: 'Too many matches found. Please enter a more spesific query!',
        delay: '2000',
        maxTextHeight: null,
      });
      return;
    }
    return response.json();
  });
}

export default { fetchCountry };
