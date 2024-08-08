const apiKey="ee57126a9fb433c7b89aeed9ca89aa12";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const weatherContainer = document.querySelector('.weatherContainer');
const body=document.querySelector(".body");
const error=document.querySelector('.error');
const close=document.getElementById('close');
const button = document.getElementById('button');
const search=document.querySelector(".search");
button.addEventListener('click', () => {
    weatherContainer.classList.remove('show');
    checkWeather();
});
close.addEventListener("click", () => { 
//press close the page refreshes
    window.location.reload();
    // weatherContainer.classList.remove('show');
    // error.classList.remove('show');
    // searchInput.value = '';
});

searchInput.addEventListener("keyup", (e) => {
    
    const searchInput = document.querySelector(".search input");
    if (e.key === "Enter"||e.addEventListener) {
        weatherContainer.classList.remove('show');
        checkWeather();
    }
})

async function checkWeather() {
        const city = searchInput.value;
        const response =await fetch(apiUrl + city +`&appid=${apiKey}`);
        var data =await response.json();
        if (data.cod == "404") { 
            
            displayDetails(null, error.message='Invalid location')
        }
        console.log(data);
        displayDetails(data);
}

//to check if the searchInput as any input and if press search button


function displayDetails(data,errorMessage = '') {
    // const detailsBox = document.querySelector('.details-box');
    if (data) {
        document.querySelector("#location").innerHTML=data.name;
        document.querySelector("#temp").innerHTML =Math.round( data.main.temp)+'°C'; 
        // document.querySelector("#condition").innerHTML= data.weather[0].main;
        document.querySelector("#humidity").innerHTML= data.main.humidity+'%';
        document.querySelector("#wind").innerHTML= data.wind.speed+' Km/h';
        weatherContainer.classList.add('show');
        const image = document.querySelector('.weather img');
        const weather=data.weather[0].main;
        switch(weather)
        {
            case 'Clear':
                image.src = './Images/sunny.png';
                break;
            case 'Clouds'||'Scattered clouds'||'Few clouds':
                image.src = './Images/cloudy.png';
                break;
            case 'Rain'||'Shower rain':
                image.src = './Images/rainy.png';
                break;
            case 'Snow':
                image.src = './Images/snow.png';
                break;
            case 'Thunderstorm':
                image.src = './Images/thunderstorm.png';
                break;
            case 'Broken clouds':
                image.src = './Images/brokencloud.png';
                break;
            case 'Mist'||'Haze'||'Fog':
                image.src = './Images/haze.png';
                break;
            default:
                image.src = './Images/sunny.png';
        }
        }
    else{
        // Show error message
        document.querySelector("#errorMessage").innerHTML= errorMessage;
        search.classList.add('hide');
        error.classList.add('show');
    }

}











