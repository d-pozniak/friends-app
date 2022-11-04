const searchBar = document.querySelector('#search-bar'),
    resultField = document.querySelector('.user-library'),
    usersToFetch = 100;
    usersPerPage = 9;
    pagesAmount = Math.ceil(usersToFetch/usersPerPage);

fetch('https://randomuser.me/api/?results=100&inc=gender,name,location,email,dob,picture')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
            initialize(
                Object.values(data['results'])
            );
        }
    )
    .catch((error) => console.error(`Could not fetch users: ${error.message}`));

function initialize(users) { //gets array of objects-users
    const allCards = users.map(user => createUserCard(user));
    console.log(users);
    const cardsByPage = [];
    for (let i=0; i<pagesAmount; i++){
        cardsByPage.push(allCards.slice(i*usersPerPage, (i+1)*usersPerPage));
    }
    updateResult(cardsByPage[0]);

    function searchByName(e){
        console.log(e.target.value);
        const stringToMatch = e.target.value.toLowerCase();
        const cardsToShow = allCards.filter( card =>
                card.querySelector('.card-name').innerText.toLowerCase().includes(stringToMatch)
        )
        updateResult(cardsToShow);
    }
    function sortByAge(e){
        document.getElementsByName('Name').forEach(input => input.checked = false);
        let cardsToShow;
        if (e.target.id === 'age-inc'){
            cardsToShow = allCards.sort((a,b) => +a.querySelector('.card-age').innerText - (+b.querySelector('.card-age').innerText));
        } else {
            cardsToShow = allCards.sort((a,b) => -(+a.querySelector('.card-age').innerText) + (+b.querySelector('.card-age').innerText));
        }
        updateResult(cardsToShow);
    }
    function sortByName(e){
        document.getElementsByName('Age').forEach(input => input.checked = false);
        let cardsToShow;
        if (e.target.id === 'name-inc'){
            cardsToShow = allCards.sort((a,b) => a.querySelector('.card-name').innerText.localeCompare(b.querySelector('.card-name').innerText));
        } else {
            cardsToShow = allCards.sort((a,b) => b.querySelector('.card-name').innerText.localeCompare(a.querySelector('.card-name').innerText));
        }
        updateResult(cardsToShow);
    }
    function resetFilters(e){
        document.getElementsByName('Name').forEach(input => input.checked = false);
        document.getElementsByName('Age').forEach(input => input.checked = false);
        searchBar.value = '';
        searchBar.ariaPlaceholder = 'Enter name..'
        updateResult(cardsByPage[0]);
    }
    searchBar.addEventListener('input', searchByName);
    document.querySelector('.name-sort').addEventListener('input',sortByName);
    document.querySelector('.age-sort').addEventListener('input',sortByAge);
    document.getElementById('reset-btn').addEventListener('click', resetFilters);
}
function updateResult(dataToShow) {
    resultField.replaceChildren();
    dataToShow.forEach(item => {
        resultField.appendChild(item);
    });
}
function createUserCard(userData){
    const userName = userData['name']['first']+' '+userData['name']['last'], //span
        userImg = userData['picture']['large'], //img
        userAge = userData['dob']['age'], //span
        userGender = userData['gender'], //span
        userEmail = userData['email'], //span
        userCountry = userData['location']['country']; //span
    const card = document.createElement('div');
    card.classList.add('user-card');

    const tempCardElems = [
        createTempElem('card-name', userName),
        createTempElem('card-img', userImg, 'img'),
        createTempElem('card-age', userAge),
        createTempElem('card-gender', userGender),
        createTempElem('card-email', userEmail),
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

