import './sass/main.scss';
import './js/fetchCountries';
import './css/styles.css';

import debounce from 'lodash.debounce';
import API from './js/fetchCountries';
import countryCard from './templates/card.hbs';
import countryList from './templates/list.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const searchForm = document.querySelector('.search-form-input');
const cardContainer = document.querySelector('.js-card-container');

searchForm.addEventListener('input', debounce(countrySearch, 500));

function countrySearch(evt) {
  evt.preventDefault();
  const searchQuery = searchForm.value;

  if (!searchQuery.trim()) {
    cardContainer.innerHTML = '';
    return;
  }

  API.fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => searchForm.reset);
}

function onFetchError() {
  error({
    text: 'Too many matches found. Please enter a more spesific query!',
    delay: '2000',
    maxTextHeight: null,
  });
}
function renderCountryCard(country) {
  if (country.length > 10) {
    cardContainer.innerHTML = '';
    onFetchError();
    return;
  }

  if (country.length >= 2 && country.length <= 10) {
    const markupList = countryList(country);
    cardContainer.innerHTML = markupList;
    return;
  }

  const markupCard = countryCard(country);
  cardContainer.innerHTML = markupCard;
}
