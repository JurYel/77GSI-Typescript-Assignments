"use strict";
// having errors with import, cant test local storage
// import fs from 'node:fs';
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayCities = void 0;
const FILE_PATH = "./cities.txt";
class City {
    constructor(cityName, country, population) {
        this.toString = () => {
            let cityString = `City: ${this.cityName}
                          Country: ${this.country}
                          Total Population: ${this.population.toLocaleString()}`;
            return cityString;
        };
        this.toFileString = () => {
            let fileString = `${this.cityName},${this.country},${this.population.toLocaleString()}`;
            return fileString;
        };
        this.cityName = cityName;
        this.country = country;
        this.population = population;
    }
    static fromFileString(data) {
        const [cityName, country, population] = data.split(',');
        return new City(cityName, country, Number.parseInt(population));
    }
}
// Function for saving array to text file
// const saveArrayToFile = (cities: CityInterface[]): void => {
//     const cityData = cities.map(city => city.toFileString()).join('\n');
//     fs.writeFileSync(FILE_PATH, cityData, 'utf8');
// }
// Function for loading array from text file
// const loadArrayFromFile = (): CityInterface[] => {
//     try {
//         const cityData = fs.readFileSync(FILE_PATH, 'utf8');
//         const fileLines = cityData.trim().split('\n');
//         return fileLines.map((line: string) => City.fromFileString(line))
//     } catch(error){
//         console.log("Error loading items: ", error);
//         return [];
//     }
// }
const upperCaseFirstLetter = (input) => {
    return input.toLowerCase().charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};
// Array for CityInterfaces
// var cities: CityInterface[] = loadArrayFromFile();
var cities = [];
// Function for handling form submit
const handleFormSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
    // Get the form element
    const form = event.target;
    // Extract form data 
    const formData = new FormData(form);
    // Get individual form field values
    const cityName = upperCaseFirstLetter(formData.get('cityName'));
    const country = upperCaseFirstLetter(formData.get('country'));
    const population = formData.get('population');
    // Log the form data to the console (or handle as needed)
    console.log("Form submitted: ");
    console.log(`City Name: ${cityName}`);
    console.log(`Country: ${country}`);
    console.log(`Population: ${population.toLocaleString()}`);
    // Encapsulate values to City class
    const cityInput = new City(cityName, country, population);
    cities.push(cityInput);
    // saveArrayToFile(cities);
    (0, exports.displayCities)(cities);
    form.reset();
};
// Function to handle search filter
const handleSearch = (event) => {
    // Get the search key from input field
    const input = event.target;
    const searchKey = input.value.toLowerCase();
    // Filter the cities array with the search key
    const filteredCities = cities.filter(city => city.cityName.toLowerCase().includes(searchKey) ||
        city.country.toLowerCase().includes(searchKey) ||
        city.population.toString().includes(searchKey));
    // Rerender the array to the HTML
    (0, exports.displayCities)(filteredCities);
};
// Add event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-input");
    form.addEventListener('submit', handleFormSubmit);
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener('keyup', handleSearch);
    // Re-initialize list
    (0, exports.displayCities)(cities);
});
// Export function for displaying stored cities
const displayCities = (citiesList) => {
    let list = document.getElementById("city-list");
    if (list) {
        list.innerHTML = '';
        citiesList.map((city) => {
            const li = document.createElement('li');
            li.innerText = city.toString();
            list.appendChild(li);
        });
    }
};
exports.displayCities = displayCities;
