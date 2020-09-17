document.addEventListener('DOMContentLoaded', () => searchAPI())

const searchAPI = async () => {
    const API_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150"
    let require = new Request(`${API_URL}`)

    const response = await fetch(API_URL)
    const data = await response.json()
    cardData(data)
}

const cardData = async (data) => {

    for(let i = 0; i < data.results.length; i++){
        fetch(data.results[i].url)
            .then(response => response.json())
            .then(pokemon => {
                return dataPokemon(pokemon)
            })
            .catch(err => console.log(err))
    }

    const dataPokemon = (pokemon) => {

        const hability = pokemon.abilities
        //console.log(hability)
        let arrayHability = []

        for(let i in hability) {
            arrayHability.push(' ' + hability[i].ability.name)
            //console.log(arrayHability[i])
        }

        const name = pokemon.name[0].toUpperCase() +pokemon.name.slice(1)

        //Aqui estoy indicandole que me pegue en el HTMl los valores de id y el name del repo
        repos.innerHTML += `
        <div class="pokemon-Card">
            <div class="img-container">
                <img class="imgPokemon" src="${pokemon.sprites.front_default}" alt="${name}" loading="lazy">
            </div>

            <div class="textPokemon">
                <p class="idPokemon"><span>#${pokemon.id.toString().padStart(3, '0')}</span></p>
                <p>Nombre: <span>${name}</span></p>
                <p>Habilidad:<span>${arrayHability}</span></p>
                <p>Experiencia: <span>${pokemon.base_experience}</span></p>
                <p>Peso: <span>${pokemon.weight} kg</span></p>
            </div>
        </div>
        `
    }
}