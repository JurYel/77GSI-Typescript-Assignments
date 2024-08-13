// Function for handling form submit
const handleFormSubmit = (event: Event): void => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const isbn = formData.get('isbn') as string;

    console.log(`${isbn} = ${isValidISBN(isbn)}`);
    form.reset();
}

const isValidISBN = (isbn: string): boolean => {

    if(isbn.length !== 10){
        return false;
    }

    let sum: number = 0;

    for(let i = 0; i < 10; i++){
        const curNum = isbn[i];

        if(i == 9 && curNum.toUpperCase() === 'X'){
            sum += 10 * (i + 1);
        } else {
            const digit = parseInt(curNum, 10);

            if(isNaN(digit)){
                return false;
            }

            sum += digit * (i + 1);
        }
    }

    return (sum % 11) == 0;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-tag") as HTMLFormElement;
    form.addEventListener('submit', handleFormSubmit);
})