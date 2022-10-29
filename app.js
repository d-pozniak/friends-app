fetch('https://randomuser.me/api/?results=500')
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
    users.forEach( user => {

    })
}