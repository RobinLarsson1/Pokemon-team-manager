const choosePokemonSection = document.getElementById('choose-pokemons')
const myTeamSection = document.getElementById('my-team')
const findChampionButton = document.getElementById('find-champions')
const myTeamButton = document.getElementById('team-pokemons')
const searchButton = document.getElementById('search-button')
const championDiv = document.getElementById('champion')
const pokeOl = document.getElementById('pokeol')
const findPokemonInput = document.getElementById('search-bar')
const pokemonContainer = document.getElementById('main-container');

window.addEventListener('load', function() {
	displayPokemon();
  });

myTeamButton.addEventListener('click', () => {
	choosePokemonSection.style.visibility = "hidden"
	myTeamSection.style.visibility = "visible"

	displayMyTeam();
})
findChampionButton.addEventListener('click', () => {
	choosePokemonSection.style.visibility = "visible"
	myTeamSection.style.visibility = "hidden"
	displayPokemon();
})


//skapar dynamiskt divvar med all info

  const displayPokemon = () => {
	const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));

	pokemonList.forEach(pokemon => {
		const pokemonDiv = document.createElement('div');
		pokemonDiv.classList.add('pokemoncard')

		const pokemonName = document.createElement('h2')
		pokemonName.textContent = pokemon.name;

		const pokemonType = document.createElement('p')
		pokemonType.textContent = 'Type: ' + pokemon.type;

		const pokemonImg = document.createElement('img')
		pokemonImg.src = pokemon.image;

		const pokeAbility = document.createElement('p')
		pokeAbility.textContent = 'Abilities: ' + pokemon.abilities;

		const pokeAdd = document.createElement('button')
		pokeAdd.classList.add('addpokemon')
		pokeAdd.textContent = 'Add pokemon to team'
		pokeAdd.addEventListener('click', () => {
			addPokemonToTeam(pokemon);
		});
		
		pokemonDiv.append(pokemonImg)
		pokemonDiv.append(pokemonName)
		pokemonDiv.append(pokemonType)
		pokemonDiv.append(pokeAbility)
		pokemonDiv.append(pokeAdd)

		pokemonContainer.append(pokemonDiv)
	})
}


let pokemonList = []
// const LS_KEY = 'pokemon';
//hämtar info 

const fetchPokemon = () => {
	const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
	const pokemonList = [];
  
	for (let i = 1; i <= 151; i++) {
	  const url = `${baseUrl}${i}`;
	  fetch(url)
		.then(response => response.json())
		.then(data => {
		  const pokemon = {
			name: data.name,
			image: data.sprites['front_default'],
			type: data.types.map(type => type.type.name).join(', '),
			abilities: data.abilities.map(ability => ability.ability.name).join(', ')
		  };
		  pokemonList.push(pokemon);
  
		  // Save the list to local storage
		  localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
		})
		.catch(error => console.error(error));
	}
	console.log(pokemonList)
  };
  // Call the function to fetch and save the data
  fetchPokemon();


  findPokemonInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const searchString = findPokemonInput.value;
        pokemonList = JSON.parse(localStorage.getItem('pokemonList'));

        const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(searchString));

        // Rensar diven som de ligger i
        pokemonContainer.innerHTML = '';

        // Skapar ny div och appendar resultatet av sökningen
        matchingPokemon.forEach(pokemon => {
            const pokemonDiv = document.createElement('div');
            pokemonDiv.setAttribute('class', 'pokemoncard')
            pokemonDiv.innerHTML = 
            `<h2>${pokemon.name}</h2>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p>Type: ${pokemon.type}</p>
            <p>Ability: ${pokemon.abilities}</p> 
			<button class="addpokemon"> Add pokemon to team </button>`;

            pokemonContainer.append(pokemonDiv);

			const addButton = pokemonDiv.querySelector('.addpokemon');
            addButton.addEventListener('click', () => {
            addPokemonToTeam(pokemon);
    });
        });
    }
});

//lägger till pokemons i separat LS
const addPokemonToTeam = (pokemon) => {
	let myTeam = JSON.parse(localStorage.getItem('myTeam')) || [];

	// Kollar om pokemonen redan finns i laget
	if (Object.keys(myTeam).length < 3) {
		if (!myTeam[pokemon.name]) {
			console.log('You already have 3 champions in your team!')
		  // Add the pokemon object to myTeamList object using the pokemon name as the key
		  myTeam[pokemon.name] = pokemon;
		}
	
	// Add the selected Pokemon to the team array
	myTeam.push(pokemon);

	// Save the team array to local storage
	localStorage.setItem('myTeam', JSON.stringify(myTeam));
	console.log('Pokemon added to team!');
}};




const displayMyTeam = () => {
	// Get the "myTeam" array from local storage
	const myTeam = JSON.parse(localStorage.getItem("myTeam")) || [];

	// Clear the contents of the "main-container" div
	pokemonContainer.innerHTML = "";

	// Loop through the Pokemon in the "myTeam" array and display them
	myTeam.forEach((pokemon, index) => {
	const pokemonDiv = document.createElement("div");
	pokemonDiv.classList.add("pokemoncard");

	const pokemonName = document.createElement("h2");
	pokemonName.textContent = pokemon.name;

	const pokemonType = document.createElement("p");
	pokemonType.textContent = "Type: " + pokemon.type;

	const pokemonImg = document.createElement("img");
	pokemonImg.src = pokemon.image;

	const pokeAbility = document.createElement("p");
	pokeAbility.textContent = "Abilities: " + pokemon.abilities;

	const removeFromTeam = document.createElement("button");
	removeFromTeam.textContent = "Remove from team";
	removeFromTeam.classList.add = ("removefromteam")

	removeFromTeam.addEventListener("click", () => {
		for (let i = myTeam.length - 1; i >= 0; i--) {
			if (myTeam[i].name === pokemon.name) {
			  myTeam.splice(i, 1);
			  break;
			}
		}
		pokemonContainer.removeChild(pokemonDiv);
		localStorage.setItem("myTeam", JSON.stringify(myTeam));
	});
	
	pokemonDiv.append(pokemonImg);
	pokemonDiv.append(pokemonName);
	pokemonDiv.append(pokemonType);
	pokemonDiv.append(pokeAbility);
	pokemonDiv.append(removeFromTeam);

	pokemonContainer.append(pokemonDiv);
	});
};





//displaya infon
