


//objeto de manipulacoes da pokeapi


const pokeApi = {}
function convertPokeDetailtoPokemon (pokemonDetails){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.numero = pokemonDetails.order
    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default
}

pokeApi.getPokemonDetail= (pokemon) =>{
    fetch(pokemon.url).then((response) => response.json())
}


// vai retornar toda a manipulação do fetch
pokeApi.getPokemons =  (offset = 0 , limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

   return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => 
    {
     return pokemons.map(
            (pokemon) => {
               
            return fetch(pokemon.url).then(response => response.json())
                .then((pokemonDetails) => {
                    const pokemon = new Pokemon()
                    pokemon.name = pokemonDetails.name
                    pokemon.numero = pokemonDetails.id
                    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
                    const [type] = types
                    pokemon.types = types
                    pokemon.type = type
                    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default
                    return pokemon
                }).then((pokemonD) => pokemonD)
                
            })
            
    })
    .then((detailsRequest) =>Promise.all(detailsRequest))
    .then((pokemonDetails) => (pokemonDetails))
        
}








