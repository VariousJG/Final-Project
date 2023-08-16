// - Variables
const creatureButton = document.querySelector('#creatures');
const monsterButton = document.querySelector('#monsters');
const materialButton = document.querySelector('#materials');
const equipmentButton = document.querySelector('#equipment');
const treasureButton = document.querySelector('#treasure');

const categoryFilters = document.querySelectorAll('.nav-icon')

const textInput = document.querySelector('#compendium-search');
const searchForm = document.querySelector('.searchFunction');
const container = document.querySelector('#entries-container');

// Opening Screen with all items
axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/all`)
    .then(response => {

        const compendiumArray = response.data.data;

        compendiumArray.forEach(item => {
            // console.log(item);

            const divTag = document.createElement('div');
            divTag.innerHTML = `

            <div class="compendium-result">
                <img class="compendium-img" src="${item.image}" data-id="${item.id}">
                <p class="hylia-font">${item.name}</p>
                <p class="hylia-font">${item.id}</p>
            </div>
                `


            container.appendChild(divTag);
        });

    });

// Modal
container.addEventListener('click', function (event) {
    console.log(event.target.dataset.id);
    axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${item.id}`)

        .then(response => {



        })
});

// Filter using the Nav Icons
categoryFilters.forEach(item => {
    item.addEventListener('click', function (event) {
        console.log(item.id);

        axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${item.id}`)
            .then(response => {

                const compendiumArray = response.data.data;
                container.innerHTML = "";

                compendiumArray.forEach(item => {

                    const divTag = document.createElement('div');
                    divTag.innerHTML = `
                    <div class="compendium-result">
                        <img class="compendium-img" src="${item.image}" data-id="${item.id}">
                        <p class="hylia-font">${item.name}</p>
                        <p class="hylia-font">${item.id}</p>
                    </div>
                    `;
                    container.appendChild(divTag);
                });

            });

    });
});

// Search
searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const userSearch = textInput.value;

    axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${userSearch}`)

        .then(response => {

            console.log(response);

            const item = response.data.data;
            const container = document.querySelector('#entries-container');
            container.innerHTML = "";

            const divTag = document.createElement('div');
            divTag.innerHTML = `

            <div class="compendium-result">
                <img class="compendium-img" src="${item.image}" data-id="${item.id}">
                <p class="hylia-font">${item.name}</p>
                <p class="hylia-font">${item.id}</p>
            </div>
            `
            container.appendChild(divTag);

        });
});



/*
Psuedo

- A modal that shows the relevant stats and Image of the entry selected. Will need a button to close it once selected

- The Favourite button is a requirment but I don't know how that works

*/