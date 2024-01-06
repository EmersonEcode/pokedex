console.log("Sucesso")


const limit = 10;
let offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
const btn = document.getElementById('btn')
const pokemonOl = document.getElementById("pokemons");
//concatenar um filho
//pokemonOl.appendChild() quer dizer aplicar mais um li  mais um filho dentro do elemento pai o OL


// O ELEMENTO NO FORMATO DE TEXTO
//pokemonOl.innerHTML += '<li class="pokemon">Teste</li>'



const maxRecords  = 151

///cada call back dentro de call back ja cria um processor maior  entao usando mais um then se encadiando resposta do primeiro o segundo já acessa 
// transformando uma lista em html

 function loadPokemonItens(ofset, limit){ 
    pokeApi.getPokemons(ofset,limit).then( (PokemonList = []) => {
        // transformando uma lista em html
        // codigo reduzido sem verbose
        newHtml = PokemonList.map(
            (pokemon) => 
                `
                <li  class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.numero}
                </span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
        
                    <ol class="types">
                        ${pokemon.types.map((typeSlot) => `<li class="type ${typeSlot}">${typeSlot}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
        
                </div>
            </li>
            `
            
        ).join('')
       pokemonOl.innerHTML += newHtml
     })
    };
   

    
    loadPokemonItens(offset, limit)

    btn.addEventListener('click',() => {
        offset += limit
        const qtdRecordNextPage = offset + limit
        if(qtdRecordNextPage >= maxRecords){
            const newLimit  = maxRecords - offset;
            loadPokemonItens(offset,newLimit)

            btn.parentElement.removeChild(btn)  
    
        }else{
             loadPokemonItens(offset,limit)
        }
       
       
    })