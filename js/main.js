// - Variables
const categoryFilters = document.querySelectorAll('.nav-icon')
const textInput = document.querySelector('#compendium-search');
const searchForm = document.querySelector('#submit-button');
const container = document.querySelector('#entries-container');

// Creates the template for the data response
const createTemplate = (data) => {
    return `
        <div class="compendium-result">
            <img class="compendium-img" src="${data.image}" data-id="${data.id}">
            <p class="hylia-font">${data.name}</p>
            <p class="hylia-font">${data.id}</p>
        </div>
    `
}

// Opening Screen with all items
const getAllItems = () => {
    axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/all`)
        .then(response => {
            container.innerHTML = "";
            const compendiumArray = response.data.data;

            compendiumArray.forEach(item => {
                // console.log(item);

                const divTag = document.createElement('div');
                divTag.innerHTML = createTemplate(item);
                container.appendChild(divTag);
            });
        });
}

// Modal
// container.addEventListener('click', function (event) {
//     console.log(event.target.dataset.id);
//     axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${item.id}`)

//         .then(response => {



//         })
// });

// Filter using the Nav Icons
categoryFilters.forEach(item => {
    item.addEventListener('click', function (event) {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected')
            getAllItems();
        } else {
            if (document.querySelector('.selected')) {
                document.querySelector('.selected').classList.remove('selected');
            }
            this.classList.add('selected')
            axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${item.id}`)
                .then(response => {

                    const compendiumArray = response.data.data;
                    container.innerHTML = "";

                    compendiumArray.forEach(item => {

                        const divTag = document.createElement('div');
                        divTag.innerHTML = createTemplate(item);
                        container.appendChild(divTag);
                    });

                });
        }


    });
});

// Search
searchForm.addEventListener('click', function (event) {
    event.preventDefault()
    const userSearch = document.querySelector('#compendium-search')
    const userSearchValue = userSearch.value;

    axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${userSearchValue}`)

        .then(response => {

            console.log(response, "its me DAN!");

            const item = response.data.data;
            const container = document.querySelector('#entries-container');
            container.innerHTML = "";

            const divTag = document.createElement('div');
            divTag.innerHTML = createTemplate(item);
            container.appendChild(divTag);

        });
});

// This calls all the items
getAllItems();



/*
Psuedo

- A modal that shows the relevant stats and Image of the entry selected. Will need a button to close it once selected

- The Favourite button is a requirment but I don't know how that works

*/