// - Variables
const creatureButton = document.querySelector('#creatures');
const monsterButton = document.querySelector('#monsters');
const materialButton = document.querySelector('#materials');
const equipmentButton = document.querySelector('#equipment');
const treasureButton = document.querySelector('#treasure');

const categoryFilters = document.querySelectorAll('.nav-icon')

const textInput = document.querySelector('#compendium-search');
const searchForm = document.querySelector('.searchFunction');



categoryFilters.forEach(item => {
    item.addEventListener('click', function (event) {
        console.log(item.id);

        axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${item.id}`)
            .then(response => {

                const compendiumArray = response.data.data;
                const container = document.querySelector('#filler');
                container.innerHTML = "";

                compendiumArray.forEach(item => {
                    console.log(item);

                    const divTag = document.createElement('div');
                    divTag.innerHTML = `
                        <img class="compendium-img" src="${item.image}">
                        <p class="hylia-font">${item.name}</p>
                        <p class="hylia-font">${item.id}</p>
                `
                    container.appendChild(divTag);
                });

            });

    });
});

axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/all`)
    .then(response => {

        const compendiumArray = response.data.data;

        compendiumArray.forEach(item => {
            console.log(item);

            const divTag = document.createElement('div');
            divTag.innerHTML = `

                        <img class="compendium-img" src="${item.image}">
                        <p class="hylia-font">${item.name}</p>
                        <p class="hylia-font">${item.id}</p>
                `

            const container = document.querySelector('#filler');
            container.appendChild(divTag);
        });

    });



searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const userSearch = textInput.value;

    axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${userSearch}`)

        .then(response => {

            console.log(response);

            const item = response.data.data;
            const container = document.querySelector('#filler');
            container.innerHTML = "";

            const divTag = document.createElement('div');
            divTag.innerHTML = `
                <img class="compendium-img" src="${item.image}">
                <p class="hylia-font">${item.name}</p>
                <p class="hylia-font">${item.id}</p>
        `
            container.appendChild(divTag);

        });
});

/*
Psuedo
- I need a function that works on the Icons and loads a full list off all item in that class

- A modal that shows the relevant stats and Image of the entry selected. Will need a button to close it once selected

- A search Function

- The Favourite button is a requirment but I don't know how that works

*/