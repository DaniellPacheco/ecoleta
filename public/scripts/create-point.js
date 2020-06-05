

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {

            for ( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }


        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    // Mostra qual o indice selecionado
    const indexOfSelectedState = event.target.selectedIndex
    // Pegando o texto do option selecionado - option é parecido com array começa do 0 e termina no valor determinado
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // Limpa o conteúdo e desabilita o input para seleção
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {            
            // Insere o conteúdo
            for ( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>"`
            }

            // Habilita o input para seleção
            citySelect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Pegandos os Li's
const itemsToCollect = document.querySelectorAll(".items-grid li")


for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    console.log(itemLi)

    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    // Verifica se o item já está no array selectedItems e se tiver adicionária o index do mesmo no array alreadySelected
    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId
        return itemFound
    })

    // Se tiver algo dentro do array
    if( alreadySelected >= 0 ) {
        // vai tirar os items dele e salvar em filteredItems
        const filteredItems = selectedItems.filter( (item) => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {
        selectedItems.push(itemId)
    }

    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}