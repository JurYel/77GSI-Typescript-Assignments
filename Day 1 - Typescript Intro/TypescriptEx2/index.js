"use strict";
// Function for handling form submit
const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const isbn = formData.get('isbn');
    console.log(`${isbn} = ${isValidISBN(isbn)}`);
    form.reset();
};
const isValidISBN = (isbn) => {
    if (isbn.length !== 10) {
        return false;
    }
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        const curNum = isbn[i];
        if (i == 9 && curNum.toUpperCase() === 'X') {
            sum += 10 * (i + 1);
        }
        else {
            const digit = parseInt(curNum, 10);
            if (isNaN(digit)) {
                return false;
            }
            sum += digit * (i + 1);
        }
    }
    return (sum % 11) == 0;
};
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-tag");
    form.addEventListener('submit', handleFormSubmit);
});
