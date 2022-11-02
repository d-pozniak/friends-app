const searchBar = document.querySelector('#search-bar'),
    searchBtn = document.querySelector('#search-btn'),
    resultField = document.querySelector('.user-library');

fetch('https://randomuser.me/api/?results=500&inc=gender,name,location,email,dob,picture,phone')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
            console.log(data);
            initialize(data['results']);
        }
    )
    .catch((error) => console.error(`Could not fetch users: ${error.message}`));

function initialize(users) {
    let usersToShow = users;
    updateResult(usersToShow);

}
function updateResult(dataToShow) {
    const resultElement = document.querySelector('.user-library');
    console.log(typeof dataToShow)
    Object.values(dataToShow).forEach(item => {
        resultElement.appendChild(createUserCard(item));
    })
}
function createUserCard(userData){
    const userName = userData['name']['first']+' '+userData['name']['last'], //span
        userImg = userData['picture']['large'], //img
        userAge = userData['dob']['age'], //span
        userGender = userData['gender'], //span
        userEmail = userData['email'], //span
        //userPhone = userData['phone'], //span
        userCountry = userData['location']['country']; //span
    const card = document.createElement('div');
    card.classList.add('user-card');

    const tempCardElems = [
        createTempElem('card-name', userName),
        createTempElem('card-img', userImg, 'img'),
        createTempElem('card-age', userAge),
        createTempElem('card-gender', userGender),
        createTempElem('card-email', userEmail),
        //createTempElem('card-phone', userPhone),
        createTempElem('card-country', userCountry)
    ]
    tempCardElems.forEach(elem => card.appendChild(elem));
    return card;
}
function createTempElem(className, inner, type='span'){
    const tempElem = document.createElement(type);
    tempElem.classList.add(className);
    if (type === 'img'){
        tempElem.setAttribute('src', inner);
    } else {
        tempElem.innerText = inner;
    }
    return tempElem;
}