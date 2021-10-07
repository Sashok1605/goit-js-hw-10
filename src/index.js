import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const inputNode = document.querySelector('#search-box');

function getInput() {
    const inputSearch = inputNode.value.trim();

    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    if (!inputSearch) {
        return;
    }

    fetchCountries(inputSearch)
        .then((item) => {
            
            
            if (item.status === 404) {
                Notiflix.Notify.failure("Oops, there is no country with that name.");
                return;
            }
            if (item.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
                return;
            }
            if (item.length > 1) {
                renderCountriesList(item);
                
                
                return;
            }
            renderCountryInfo(item);
        })
        .catch((error) => console.log(error));
};

inputNode.addEventListener('input', debounce(getInput, DEBOUNCE_DELAY));

function renderCountriesList(item) {
  countryInfo.innerHTML = '';
    
    
  const markup = item.map((country) => {
        console.log(country);
        
      return `
        <li class="country-list-item">
          <img src='${country.flags.svg}' alt='${country.name.common} flag' width='40px' />
          <p>${country.name.common}</p>
        </li>
        `;
    })
    .join("");
    
    countryList.innerHTML = markup;
};

function renderCountryInfo(country) {
    countryList.innerHTML = '';

  const markup = country
    .map((country) => {
        let language = Object.values(country.languages)
      return `
        <div class="renderCountryInfo-firstString">
          <img src='${country.flags.svg}' alt='${country.name.common} flag' width='200px' height='100px'/>
          <h2>${country.name.common}</h2>
        </div>
        <p><b>Capital</b>: ${country.capital[0]}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${language[0]}</p>
        `;
    })
    .join("");
    
  countryInfo.innerHTML = markup;
};



