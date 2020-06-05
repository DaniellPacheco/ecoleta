function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    apiIbge("https://servicodados.ibge.gov.br/api/v1/localidades/estados", ufSelect)
}


populateUfs();

function apiIbge(url, select) {

    if (url == "https://servicodados.ibge.gov.br/api/v1/localidades/estados") {
        fetch(url)
            .then( res => res.json() )
            .then( itens => {
                for (const item of itens ) {
                    select.innerHTML += `<option value="${item.id}">${item.nome}</option>`
                }
            })
    } else {
        fetch(url)
            .then( res => res.json() )
            .then( itens => {
                for (const item of itens ) {
                    select.innerHTML += `<option value="${item.id}">${item.nome}</option>`
                }
            })
    }
}


function getCities (event) {
    const citySelect = document.querySelector("select[name=city]")
    const inputState = document.querySelector("input[name=state]")

    ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    inputState.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    apiIbge(url, citySelect)

    citySelect.disabled = false
}

// Ativando function ao mudar o valor do select

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)