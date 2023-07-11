const pokemonName = document.querySelector('.pokemon_name'); //Pegando todas as variáveis que eu precisaria
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const buttonPrev = document.querySelector('.byn-prev');
const buttonNext = document.querySelector('.byn-next');

let searchPokemon = 1; //para quando carregar o site ele começe com o primeiro pokemon

const form = document.querySelector('.form');

const input = document.querySelector('.input_search');


const fetchPokemon = async (pokemon) => { //função para pegar dados da API do pokemon e guardalas em uma constante

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) { // validação para saber se o existe o pokemon de acordo com a busca
        const data = await APIResponse.json(); // aqui criamos a variavel data com o .json para termos acessos a parametros especificos do pokemon

        return data;
    }

}

// como .json é assincrono usamos o async na função e o await 


const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data) {//aqui é a validação para aparecer o pokemon se o data estiver correto
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;//aqui podemos usar o id do .json disponibilizado ao especionar a página e verificar o API
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // aqui foi um jeito para acessarmos um estilo de imagem, uma forma de entrar por pastas
        searchPokemon = data.id;
        input.value = '';
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = ' ';
    }
}

form.addEventListener('submit', (evento) => { // função do form para ser obrigatoria o submit para a busca
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());


});


buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);// função de click, ao apertar o botão incrementamos +1 ao searchPokemon e renderizamos com a função renderPokemon o pokemon seguinte


});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) { //validação de ser impossivel diminuir o primeiro pokemon
        searchPokemon -= 1;
        renderPokemon(searchPokemon); // aqui a mesma coisa porem para tras
    }
});

renderPokemon(searchPokemon);



