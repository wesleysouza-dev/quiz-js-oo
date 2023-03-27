// #Register

// - field values
const fullName = document.querySelector('#fieldName');
const email = document.querySelector('#fieldMail');
const profission = document.querySelector('#fieldProfession');
const age = document.querySelector('#fieldAge');
const registerButton = document.querySelector('#registerButton')

registerButton.addEventListener('click', () => {
    console.log(getValue(fullName), getValue(email), getValue(profession), getValue(age));
})





// #Aux
const getValue = (field) => {
    return field?.value;
}