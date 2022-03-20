'use strict'
const btncountry = document.querySelector('.btn-country');
const countrydata = document.querySelector('.countries');

//---------------- 
const rootcountry = (data) =>{
    const field =`
    <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population /1000000).toFixed(1)}people</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
     
    </div>
    </article>`;
    countrydata.insertAdjacentHTML('beforeend',field);
    countrydata.style.opacity =1;
}                                                                                                                                     




const  neighbourcountry = function(country){
const callcountry1= new XMLHttpRequest();
callcountry1.open('GET',`https://restcountries.com/v2/name/${country}`);
callcountry1.send();
console.log(callcountry1);

callcountry1.addEventListener('load',function()
{
    // console.log(this.responseText)
    //ajax call country 1
   
    const data = JSON.parse(this.responseText)[1];
    console.log(data);

    
    rootcountry(data);
    //call neighbour country
    const neighbournation= data.borders[4];
    if (!neighbournation) return;
    const callcountry2= new XMLHttpRequest();
    callcountry2.open('GET',`https://restcountries.com/v2/alpha/${neighbournation}`);
    callcountry2.send();
    callcountry2.addEventListener('load',function()
  {
   const  neighbourdata = JSON.parse(this.responseText);
   console.log(neighbourdata)
   rootcountry(neighbourdata);
  })
   
})
}
// neighbourcountry('nepal');
neighbourcountry('india');