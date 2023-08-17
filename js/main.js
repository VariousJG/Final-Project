//JavaScript for the Index.html

// - Variables
const categoryFilters = document.querySelectorAll('.nav-icon')
const textInput = document.querySelector('#compendium-search');
const searchForm = document.querySelector('#submit-button');
const container = document.querySelector('#entries-container');

const navigate = (id) => {
    window.location.href = `/compendium.html#${id}`;
}

// Creates the template for the data response
const createTemplate = (data) => {
    return `
        <div class="compendium-result" onclick="navigate(${data.id})">
            <img class="compendium-img" src="${data.image}" data-id="${data.id}">
            <div class="result-body">
                <p class="result-id">#${data.id}</p>
                <hr class="result-divider">
                <h2 class="result-name">${data.name}</h2>
            </div>
        </div>
    `
}

// Opening Screen with all items
const getAllItems = () => {
    axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/all`)
        .then(response => {
            container.innerHTML = "";
            const compendiumArray = response.data.data;

            compendiumArray.sort((a, b) => {
                return a.id - b.id;
            });

            compendiumArray.forEach(item => {
                // console.log(item);

                const divTag = document.createElement('div');
                divTag.innerHTML = createTemplate(item);
                container.appendChild(divTag);
            });
        });
};

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

                    compendiumArray.sort((a, b) => {
                        return a.id - b.id;
                    });

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

            console.log(response);

            const item = response.data.data;
            const container = document.querySelector('#entries-container');
            container.innerHTML = "";

            const divTag = document.createElement('div');
            divTag.innerHTML = createTemplate(item);
            container.appendChild(divTag);

        })
        .catch(response => {
            console.log(response);
            container.innerHTML = "Not Found";
        });
});

// This calls all the items
getAllItems();
