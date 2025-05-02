import "./style.css";

import * as _ from "lodash";

interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      ell: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    EUR: {
      symbol: string;
      name: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    ell: string;
  };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  cca3: string;
  translations: {
    ara: {
      official: string;
      common: string;
    };
    bre: {
      official: string;
      common: string;
    };
    ces: {
      official: string;
      common: string;
    };
    cym: {
      official: string;
      common: string;
    };
    deu: {
      official: string;
      common: string;
    };
    est: {
      official: string;
      common: string;
    };
    fin: {
      official: string;
      common: string;
    };
    fra: {
      official: string;
      common: string;
    };
    hrv: {
      official: string;
      common: string;
    };
    hun: {
      official: string;
      common: string;
    };
    ind: {
      official: string;
      common: string;
    };
    ita: {
      official: string;
      common: string;
    };
    jpn: {
      official: string;
      common: string;
    };
    kor: {
      official: string;
      common: string;
    };
    nld: {
      official: string;
      common: string;
    };
    per: {
      official: string;
      common: string;
    };
    pol: {
      official: string;
      common: string;
    };
    por: {
      official: string;
      common: string;
    };
    rus: {
      official: string;
      common: string;
    };
    slk: {
      official: string;
      common: string;
    };
    spa: {
      official: string;
      common: string;
    };
    srp: {
      official: string;
      common: string;
    };
    swe: {
      official: string;
      common: string;
    };
    tur: {
      official: string;
      common: string;
    };
    urd: {
      official: string;
      common: string;
    };
    zho: {
      official: string;
      common: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini: {
    string: number;
  };
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode: {
    format: string;
    regex: string;
  };
}

async function searchByCountryName(name: string): Promise<Country[]> {
  showSpinner();
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const json = await response.json();
  hideSpinner();
  return json.slice(0, 5);
}

const search = document.getElementById("search");

if (search) {
  async function handleInput(event: Event) {
    // console.log((search as HTMLInputElement).value.length);

    if ((search as HTMLInputElement).value.length >= 3) {
      const countries = await searchByCountryName(
        (event.target as HTMLInputElement).value,
      );
      renderCountries(countries);
    }
  }

  const debouncedHandleInput = _.debounce(handleInput, 1000);

  search.addEventListener("input", debouncedHandleInput);
}

function renderCountries(countries: Country[]) {
  const results = document.getElementById("results");

  if (results) {
    results.innerHTML = "";

    for (const country of countries) {
      const result = document.createElement("li");
      result.className = "flex items-center gap-3 py-2";
      result.innerHTML = `
          <img
            src="${country.flags.png}"
            alt="${country.name.common}"
            class="h-5 w-7 rounded-sm shadow-sm"
          />
          <span class="text-sm text-gray-800">${country.name.common}</span>
      `;
      results.appendChild(result);
    }
  }
}

const spinner = document.getElementById("spinner");
const searchIconEl = document.getElementById("searchIcon");

function showSpinner() {
  if (spinner && searchIconEl) {
    spinner.style.visibility = "visible";
    searchIconEl.style.visibility = "hidden";
  }
}

function hideSpinner() {
  if (spinner && searchIconEl) {
    spinner.style.visibility = "hidden";
    searchIconEl.style.visibility = "visible";
  }
}
