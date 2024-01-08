const limit = 10;
let offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
const btn = document.getElementById('btn')
const pokemonOl = document.getElementById("pokemons");
const pokemonPage = document.getElementById("card");
const pokeContent = document.getElementById("content");
const title = document.getElementById('title');

console.log(pokemonPage)
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
                
                <li data-pokemon='${JSON.stringify(pokemon)}'  class="pokemon ${pokemon.type}">
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
     
        document.querySelectorAll('.pokemon').forEach(pokemonElement => {
           
                pokemonElement.addEventListener('click', () => {
                    pokemonOl.style.display = 'none';
                    title.style.display = 'none';
                    btn.style.display = 'none';
                    pokeContent.classList.replace('content', 'pokemonPokemonPage');
                    pokemonPage.style.display = 'flex';
                    const pokemonData = JSON.parse(pokemonElement.getAttribute('data-pokemon'));
                    infoPoke(pokemonData, pokemonPage);
                });
        });
      
    })
    function infoPoke(pokemon, Pkp){
        const newDetailsPokemon = `
            <div class="card ${pokemon.type}">
            <img id="close" src="./assets/imgs/close.png" class="close" alt="close"/>
            <span class="cp">0 CP</span>
            <img src="${pokemon.photo}" class="photo" alt="Pokemon">
            <div class="Abilities">
                <p class="card-nome">${pokemon.name}</p>
                <ol class="pokelist">
                    <li>
                        <span>${pokemon.height} M</span>
                            HEIGHT
                    </li>
                    <li>
                        <div class="abilitie ${pokemon.type}"></div>
                        ${pokemon.type}
                    </li>
                    <li>
                        <span>${pokemon.weight} KG</span>
                             WHEIGHT
                    </li>
    
                </ol>
                <ol class="list-1">
                    <ol class="column-status">
                        <li>${pokemon.namestat1}</li>
                        <li>${pokemon.namestat2}</li>
                        <li>${pokemon.namestat3}</li>

                    </ol>
                    
    
                    <ol class="state">
                        
                            <li><div id = "barra${pokemon.namestat1}"class="barra"></div></li>
                            <li><div id = "barra${pokemon.namestat2}" class="barra"></div></li>
                            <li><div id = "barra${pokemon.namestat3}" class="barra"></div></li>
                    
                    </ol>
                    
                    <ol class="column-status">
                        <li>${pokemon.hp}</li>
                        <li>${pokemon.attack}</li>
                        <li>${pokemon.defense}</li>
                    </ol>
                    
                </ol>
                <ol class="list-2">
                    <li><div class="power"></div></li>
                    <li><div class="power"></div></li>  
                    
                </ol>
            </div>
            </div>`
            
        console.log(Pkp)
        Pkp.innerHTML = newDetailsPokemon
        function barraDeNivel(stat,type){
            
                if(stat < 50){
                    document.getElementById(`barra${type}`).style.backgroundColor = 'red'
                    document.getElementById(`barra${type}`).style.width = `${stat}%`
                }else if (stat < 90){
                    document.getElementById(`barra${type}`).style.backgroundColor = 'yellow'
                    document.getElementById(`barra${type}`).style.width = `${stat}%`
                }else{
                    document.getElementById(`barra${type}`).style.backgroundColor = 'green'
                    document.getElementById(`barra${type}`).style.width = `${stat}%`
                }
            }
        barraDeNivel(pokemon.hp,pokemon.namestat1)
        barraDeNivel(pokemon.attack,pokemon.namestat2)
        barraDeNivel(pokemon.defense,pokemon.namestat3)
        const close = document.getElementById("close");
        close.addEventListener('click',() =>{
                    pokemonOl.style.display = '';
                    title.style.display = 'flex';
                    btn.style.display = 'flex';
                    pokeContent.classList.replace('pokemonPokemonPage','content');
                    pokemonPage.style.display = 'none';
                    close.style.display = 'none';
        })
    }
     
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
    


