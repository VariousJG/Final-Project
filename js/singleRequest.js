//JavaScript for the conpendium.html

const handleArrayItems = (arr) => {
    let template = '';
    console.log(arr);
    if (arr === undefined) return;
    if (arr === null) return '<span>NA</span>';
    if (arr.length == 0) return '<span>NA</span>';

    arr.forEach(item => {
        template = template + `<span>${item} <br></span>`
    });

    return template;
}

const createTemplate = (data) => {
    return `
        <div class="single-compendium-result"> 
            <div class="">
                <h2 class="result-name">#${data.id} ${data.name}</h2>
                <img class="single-compendium-img" src="${data.image}" data-id="${data.id}">
            </div>

            <div class="single-result-body">
                <h3>Decription</h3>
                <hr>
                <p>${data.description}</p>
                <h3>Common Locations</h3>
                <hr>
                <p>${handleArrayItems(data.common_locations)}</p>
                <div class="${data.drops ? '' : 'hide'}"> 
                    <h3>Drops</h3>
                    <hr>
                    <p>${handleArrayItems(data.drops)}</p>
                </div>
            </div>
        </div>
    `
}

console.log(window.location.hash);
let hash = window.location.hash;

axios.get(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${hash.split('#').pop()}`)

    .then(response => {

        console.log(response);

        const item = response.data.data;
        const container = document.querySelector('#entries-container');
        container.innerHTML = "";

        const divTag = document.createElement('div');
        divTag.innerHTML = createTemplate(item);
        container.appendChild(divTag);

    });

    //common_locations
    //description
    //drops


    //name,id,image