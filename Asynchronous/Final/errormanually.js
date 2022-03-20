'use strict'
const btncountry = document.querySelector('.btn-country')
const countrydata = document.querySelector('.countries')

// const request= fetch ('GET',`https://restcountries.com/v2/name/india`)
// console.log(request);
const rootcountry = (data, nation) => {
  const field = `
    <article class="country ${nation}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <h4 class="country__capital">${data.capital}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}people</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>`
  countrydata.insertAdjacentHTML('beforeend', field)
  //   countrydata.style.opacity = 1
}
//error catch and show in UI
const renderror = function (msg) {
  countrydata.insertAdjacentText('beforeend', msg)
  //   countrydata.style.opacity = 1
}

const getjson = function (url, err = 'SOMETHING WENT WRONG') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${err}(${response.status})`)
    console.log(response)
    return response.json()
  })
}

// call country 1
const countryrequest = function (country) {
  getjson(`https://restcountries.com/v2/name/${country}`, 'country not found')
    .then((data) => {
      console.log(data)
      rootcountry(data[0])

      //call neighbour country
      const nation = data[0].borders?.[0]
      //   const nation = 'counter'
      if (!nation) {
        throw new Error('NO NEIGHBOUR COUNTRY FOUND')
        
      }
      return getjson(
        `https://restcountries.com/v2/alpha/${nation}`,
        'country not found',
      )
    })
    .then((data) => rootcountry(data, 'neighbour'))
    .catch((err) => {
      console.error(`${err} ❌ ❌ try again!`)
      renderror(`something went wrong ❌ ❌${err.message},try again`)
    })
    .finally(() => {
      countrydata.style.opacity = 1
    })
}
btncountry.addEventListener('click', function (e) {
  //   countryrequest('usa')
})
countryrequest('australia')
