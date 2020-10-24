// GLOBAL VARIABLES
    let employees = [];
    const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
    email, location, phone, dob &noinfo &nat=US`
    const gridContainer = document.querySelector(".grid-container");
    const overlay = document.querySelector(".overlay");
    const modalContainer = document.querySelector(".modal-content");
    const modalClose = document.querySelector(".modal-close");

// FETCH DATA FROM API
    fetch(urlAPI)
        .then(res => res.json())
        .then(res => res.results)
        .then(displayEmployees)
        .catch(err => console.log(err));

// HELPER FUNCTIONS
    function displayEmployees (employeeData) {
        employees = employeeData;

        // store employee HTML as it's created
        let employeeHTML = '';

        // loop through each employee and create HTML markup
        employees.forEach(( employee, index ) => {
            let name = employee.name;
            let email = employee.email;
            let city = employee.location.city;
            let picture = employee.picture;

            employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
            `
        });

        gridContainer.innerHTML = employeeHTML;
    }

    function displayModal(index) {
        // use object destructuring make the template literal cleaner
        let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];

        let date = new Date(dob.date);

        // create HTML markup for modal overlay
        const modalHTML = `
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p>${phone}</p>
                <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        `;

        overlay.classList.remove("hidden");
        modalContainer.innerHTML = modalHTML;
    }

// EVENT LISTENERS
    // activates modal overlay when user clicks on an employee card element
    gridContainer.addEventListener('click', (e) => {

        // make sure the event target is not the gridContainer itself
        if ( e.target !== gridContainer ) {

            // select the card element based on its proximity to the element clicked
            const card = e.target.closest('.card');
            const index = card.getAttribute('data-index');

            displayModal(index);
        }
    });

    // hides modal overlay when user clicks X button
    modalClose.addEventListener('click', () => {
        overlay.classList.add("hidden");
    });