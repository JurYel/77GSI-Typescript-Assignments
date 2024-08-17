"use strict";
// Function for handling form submit
const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const stringValue = formData.get('string');
    console.log(`string value: ${stringValue}`);
    console.log(`transformed value: ${transformString(stringValue)}`);
    form.reset();
};
const transformString = (input) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const vowels = 'aeiou';
    return input.replace(/[a-zA-Z]/g, char => {
        const isUpperCase = char === char.toUpperCase();
        const lowerChar = char.toLowerCase();
        const nextChar = alphabet[(alphabet.indexOf(lowerChar) + 1) % alphabet.length];
        const transformedChar = vowels.includes(nextChar) ? nextChar.toUpperCase() : nextChar.toLowerCase();
        return (isUpperCase && vowels.includes(nextChar)) ? transformedChar.toUpperCase() : nextChar;
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-tag");
    form.addEventListener('submit', handleFormSubmit);
});
