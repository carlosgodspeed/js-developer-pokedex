const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // Adiciona o evento diretamente nos elementos do último lote
        pokemons.forEach((pokemon) => {
            const item = document.querySelector(`.pokemon[data-number='${pokemon.number}']`);
            item.addEventListener('click', () => abrirCard(pokemon));
        });
    });
}


loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

const pokemonCard = document.getElementById('pokemonCard');
const cardName = document.getElementById('cardName');
const cardImage = document.getElementById('cardImage');
const cardNumber = document.getElementById('cardNumber');
const cardTypes = document.getElementById('cardTypes');
const closeCard = document.getElementById('closeCard');

function abrirCard(pokemon) {
  cardName.textContent = pokemon.name;
  cardImage.src = pokemon.photo;
  cardImage.alt = pokemon.name;
  cardNumber.textContent = `#${pokemon.number}`;
  cardTypes.textContent = pokemon.types.join(', ');
  pokemonCard.classList.remove('hidden');
}

closeCard.addEventListener('click', () => {
  pokemonCard.classList.add('hidden');
});

pokemonCard.addEventListener('click', (e) => {
  if (e.target === pokemonCard) {
    pokemonCard.classList.add('hidden');
  }
});

function adicionarEventosPokemons(pokemons) {
    const items = document.querySelectorAll('.pokemon')
    items.forEach((item) => {
        item.addEventListener('click', () => {
            const numero = item.getAttribute('data-number')
            const pokemon = pokemons.find(p => p.number == numero)
            if (pokemon) abrirCard(pokemon)
        })
    })
}
