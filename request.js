var httpRequest
let cityTyped
let btn = document.getElementById("ajaxButton")
let userInput = document.querySelector("#input")
let languageChangeBtn = document.getElementById("language_change_btn")
let local = "pl"

let cityField = document.querySelector("#city")
let weatherTypeField = document.querySelector("#weather_type")
let temperatureField = document.querySelector("#temperature")
let pressureField = document.querySelector("#pressure")
let visibilityField = document.querySelector("#visibility")
let windSpeedField = document.querySelector("#wind_speed")
let windHeadingField = document.querySelector("#wind_heading")


var requestFull
var requestMain = "https://api.openweathermap.org/data/2.5/weather?country=pl&appid=d5191dd8d94fb095413154a73038ce7d&units=metric&q="
var weatherFull = {
    city: "",
    weatherType: "",
    temperature: "",
    pressure: "",
    visibility: "",
    windSpeed: "",
    windHeading: ""
}

//////////////
// import local from './languages.js';
import { settings } from './languages.js'

console.log(settings.en.city)
console.log(settings[local]["temperature"])

function languageSet() {
    document.getElementById("header").textContent = settings[local]["header"]
    document.getElementById("input").setAttribute("placeholder", settings[local][`input`])
    document.getElementById("ajaxButton").textContent = settings[local]["button"]
    document.getElementById("language_change_btn").textContent = local.toUpperCase()
    document.getElementById("cityL").textContent = settings[local]["city"]
    document.getElementById("weather_typeL").textContent = settings[local]["weather_type"]
    document.getElementById("temperatureL").textContent = settings[local]["temperature"]
    document.getElementById("pressureL").textContent = settings[local]["pressure"]
    document.getElementById("visibilityL").textContent = settings[local]["visibility"]
    document.getElementById("wind_speedL").textContent = settings[local]["wind_speed"]
    document.getElementById("wind_headingL").textContent = settings[local]["wind_heading"]
}
function languageChange() {
    if (local == "en") {
        local = "pl"
    }
    else {
        local = "en"
    }
    languageSet()
    if (cityTyped == undefined) {
        return false
    }
    getCityNameLanguageSwitch()
}
////////////

const getCityName = () => {
    if (userInput.value == "") {
        return
    }
    requestFull = requestMain.concat(userInput.value, "&lang=", local)
    cityTyped = userInput.value
    makeRequest()
}

const getCityNameLanguageSwitch = () => {
    requestFull = requestMain.concat(cityTyped, "&lang=", local)
    makeRequest()
}


function makeRequest() {
    httpRequest = new XMLHttpRequest()
    if (httpRequest == !0) {
        alert("cannot create an XMLHTTP instance")
        return
    }
    httpRequest.onreadystatechange = showRequest
    httpRequest.open("GET", requestFull)
    httpRequest.send()
}

function showRequest() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log(httpRequest)
            let weatherResponse = JSON.parse(httpRequest.response)
            console.log(weatherResponse)
            console.log("weather: ", weatherResponse.name, weatherResponse.visibility);


            weatherFull.city = weatherResponse.name
            cityField.textContent = weatherFull.city

            weatherFull.weatherType = weatherResponse.weather[0].description
            weatherTypeField.textContent = weatherFull.weatherType

            weatherFull.temperature = weatherResponse.main.temp
            temperatureField.innerHTML = weatherFull.temperature + " &#176;C"

            weatherFull.pressure = weatherResponse.main.pressure
            pressureField.textContent = weatherFull.pressure + " hPa"

            weatherFull.visibility = weatherResponse.visibility
            visibilityField.textContent = weatherFull.visibility + " m"

            weatherFull.windSpeed = weatherResponse.wind.speed
            windSpeedField.textContent = weatherFull.windSpeed + " m/s"

            weatherFull.windHeading = weatherResponse.wind.deg
            windHeadingField.innerHTML = weatherFull.windHeading + " &#176;"
        }
        else {
            alert("problem: httpRequest status: " + httpRequest.status + ", probably wrong city name")
            return false
        }
    }
    userInput.value = ""
}
languageSet()
btn.addEventListener("click", getCityName)
languageChangeBtn.addEventListener("click", languageChange)



