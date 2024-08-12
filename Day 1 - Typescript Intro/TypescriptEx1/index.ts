// having errors with import, cant test local storage
// import fs from 'node:fs';

const FILE_PATH = "./cities.txt";

interface CityInterface {
    cityName: string;
    country: string;
    population: number;
    toString: () => string;
    toFileString: () => string;
    // fromFileString: (data: string) => CityInterface;
}

class City implements CityInterface {

    cityName: string;
    country: string;
    population: number;

    constructor(cityName: string, country: string, population: number){
        this.cityName = cityName;
        this.country = country;
        this.population = population;
    }

    toString = () => {
        let cityString = `City: ${this.cityName}
                          Country: ${this.country}
                          Total Population: ${this.population.toLocaleString()}`;

        return cityString;
    }

    toFileString = () => {
        let fileString = `${this.cityName},${this.country},${this.population.toLocaleString()}`;
        
        return fileString;
    }

    static fromFileString(data: string): CityInterface {
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

const upperCaseFirstLetter = (input: string) => {
    return input.toLowerCase().charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

// Array for CityInterfaces
// var cities: CityInterface[] = loadArrayFromFile();
var cities: CityInterface[] = [];
// Function for handling form submit
const handleFormSubmit = (event: Event): void  => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get the form element
    const form = event.target as HTMLFormElement;

    // Extract form data 
    const formData = new FormData(form);

    // Get individual form field values
    const cityName = upperCaseFirstLetter(formData.get('cityName') as string) as string;
    const country = upperCaseFirstLetter(formData.get('country') as string) as string;
    const population: number = formData.get('population') as unknown as number;

    // Log the form data to the console (or handle as needed)
    console.log("Form submitted: ");
    console.log(`City Name: ${cityName}`);
    console.log(`Country: ${country}`);
    console.log(`Population: ${population.toLocaleString()}`);

    // Encapsulate values to City class
    const cityInput: CityInterface = new City(cityName, country, population);
    cities.push(cityInput);

    // saveArrayToFile(cities);
    displayCities(cities);
    form.reset();
}

// Function to handle search filter
const handleSearch = (event: Event) => {
    // Get the search key from input field
    const input = event.target as HTMLInputElement;
    const searchKey = input.value.toLowerCase();

    // Filter the cities array with the search key
    const filteredCities = cities.filter(city => city.cityName.toLowerCase().includes(searchKey) || 
                                                 city.country.toLowerCase().includes(searchKey)  ||
                                                 city.population.toString().includes(searchKey));
    
    // Rerender the array to the HTML
    displayCities(filteredCities);
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-input") as HTMLFormElement;
    form.addEventListener('submit', handleFormSubmit);

    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    searchInput.addEventListener('keyup', handleSearch);

    // Re-initialize list
    displayCities(cities);
});

// Export function for displaying stored cities
export const displayCities = (citiesList: CityInterface[]) => {
    let list = document.getElementById("city-list");

    if(list) {
        list.innerHTML = '';

        citiesList.map((city) => {
            const li = document.createElement('li');
            li.innerText = city.toString() as string;
            list.appendChild(li);
        });
    }
};

