//Variablar
const choosePokemonSection = document.getElementById('choose-pokemons')
const myTeamSection = document.getElementById('my-team')
const findChampionButton = document.getElementById('find-champions')
const myTeamButton = document.getElementById('team-pokemons')
const searchButton = document.getElementById('search-button')
const championDiv = document.getElementById('champion')
const pokeOl = document.getElementById('pokeol')
const findPokemonInput = document.getElementById('search-bar')
const pokemonContainer = document.getElementById('main-container');


//Gör så att det laddas in vid load
window.addEventListener('load', function() {
	displayPokemon();
  });


//Olika "sidor"
myTeamButton.addEventListener('click', () => {
	findPokemonInput.style.visibility = "hidden"
	myTeamSection.style.visibility = "visible"

	displayMyTeam();
})
findChampionButton.addEventListener('click', () => {
	findPokemonInput.style.visibility = "visible"
	myTeamSection.style.visibility = "hidden"
	displayPokemon();
})


//skapar dynamiskt divvar med all info

const displayPokemon = () => {
    const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
    const myTeam = JSON.parse(localStorage.getItem('myTeam')) || [];
    pokemonContainer.innerHTML = '';

    pokemonList.forEach((pokemon) => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemoncard');

        const pokemonName = document.createElement('h2');
        pokemonName.textContent = pokemon.name;

        const pokemonTypeText = document.createElement('span');
        pokemonTypeText.innerHTML = '<b>Type: </b>' + pokemon.type;

        const pokemonImg = document.createElement('img');
        pokemonImg.src = pokemon.image;

        const abilitiesText = document.createElement('span');
        abilitiesText.innerHTML = '<b>Abilities:</b> ' + pokemon.abilities;

        const pokeAdd = document.createElement('button');
        pokeAdd.classList.add('addpokemon');
        pokeAdd.textContent = 'Add to team';
        pokeAdd.addEventListener('click', () => {
            if (myTeam.length < 3) {
                addPokemonToTeam(pokemon);
                myTeam.push(pokemon);
                localStorage.setItem('myTeam', JSON.stringify(myTeam));
                let addedToTeam = document.createElement('p');
                addedToTeam.classList.add('added-text');
                addedToTeam.textContent = 'Added to team!';
				addedToTeam.style.color = 'Green'
                pokemonDiv.append(addedToTeam);
                setTimeout(() => {
                    addedToTeam.remove();
                }, 1000);
            } else {
                let teamFull = document.createElement('p');
                teamFull.classList.add('added-text');
                teamFull.textContent = 'Your team is full!';
				teamFull.style.color = 'red'
                pokemonDiv.append(teamFull);
                setTimeout(() => {
                    teamFull.remove();
                }, 1000);
            }
        });

        pokemonDiv.append(pokemonImg);
        pokemonDiv.append(pokemonName);
        pokemonDiv.append(pokemonTypeText);
        pokemonDiv.append(abilitiesText);
        pokemonDiv.append(pokeAdd);

        pokemonContainer.append(pokemonDiv);
    });
};



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

				// Sparar data till localStorage
				localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
			})
			.catch(error => console.error(error));
	}
};

// Kallar på funktionen för att hämta samt spara data
fetchPokemon();


findPokemonInput.addEventListener('input', async (event) => {

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
            <p><b>Type:</b> ${pokemon.type}</p>
            <p><b>Ability:</b> ${pokemon.abilities}</p> 
			<button class="addpokemon"> Add pokemon to team </button>`;

            pokemonContainer.append(pokemonDiv);

			const addButton = pokemonDiv.querySelector('.addpokemon');
            addButton.addEventListener('click', () => {
            addPokemonToTeam(pokemon);
    });
        });
    }
);

//lägger till pokemons i separat LS
const addPokemonToTeam = (pokemon) => {
	let myTeam = JSON.parse(localStorage.getItem('myTeam')) || [];

	// Kollar om pokemonen redan finns i laget
	if (Object.keys(myTeam).length < 3) {
		console.log('You already have 3 champions in your team!')
		if (!myTeam[pokemon.name]) {
		  // Add the pokemon object to myTeamList object using the pokemon name as the key
		    myTeam[pokemon.name] = pokemon;
		}
	
	// Lägger till pokemon till lagArrayen
	myTeam.push(pokemon);

	// Sparar lagarrayen i LS
	localStorage.setItem('myTeam', JSON.stringify(myTeam));

	
}};




const displayMyTeam = () => {
  // Hämta lagarrayen från
const myTeam = JSON.parse(localStorage.getItem("myTeam")) || [];

  // Rensar content som ligger i diven innan
pokemonContainer.innerHTML = "";

const teamHeader = document.createElement('h1')
teamHeader.classList.add('team-header')
teamHeader.textContent = 'My team'

pokemonContainer.append(teamHeader)

  // Loopar genom de pokemon i myteam och displayar dom
myTeam.forEach((pokemon, index) => {

    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemoncard");

    const pokemonName = document.createElement("h2");
    pokemonName.textContent = pokemon.name;

    const pokemonTypeText = document.createElement('span')
    pokemonTypeText.innerHTML = "<b>Type: </b>" + pokemon.type;

    const pokemonImg = document.createElement('img')
    pokemonImg.src = pokemon.image;


    const abilitiesText = document.createElement('span');
    abilitiesText.innerHTML = "<b>Abilities:</b> " + pokemon.abilities;

    const removeFromTeam = document.createElement("button");
    removeFromTeam.classList.add('addpokemon')
    removeFromTeam.textContent = "Remove from team";

    removeFromTeam.addEventListener("click", () => {
    for (let i = myTeam.length - 1; i >= 0; i--) {
        if (myTeam[i].name === pokemon.name) {
        myTeam.splice(i, 1);
        break;
        }
    }
    pokemonContainer.removeChild(pokemonDiv);
    localStorage.setItem("myTeam", JSON.stringify(myTeam));
      // Kontrollera om vi nu har ett tomt lag och lägg till meddelandet om det är fallet
    if (myTeam.length === 0) {
        displayEmptyTeamText();
    }
    });

    pokemonDiv.append(pokemonImg);
    pokemonDiv.append(pokemonName);
    pokemonDiv.append(pokemonTypeText);
    pokemonDiv.append(abilitiesText);
    pokemonDiv.append(removeFromTeam);

    pokemonContainer.append(pokemonDiv);
});

  // Kontrollera om vi har mindre än tre pokemon i laget och lägg till meddelandet om det är fallet
  
  // Kontrollera om laget är tomt och lägg till meddelandet om det är fallet
  if (myTeam.length === 0) {
	  displayEmptyTeamText();
	  
	}
	if (myTeam.length > 0 && myTeam.length < 3) {
		displayIncompleteTeamText();
	}
};

// Hjälpfunktioner för att lägga till meddelanden till DOM

const displayEmptyTeamText = () => {
  let emptyTeamText = document.createElement('h2')
  emptyTeamText.innerHTML = 'Your team is empty! Go to <span style="color: #FFCB05">Find Champions</span> to choose your Pokémons';
  emptyTeamText.classList.add('empty-team-text')
  pokemonContainer.append(emptyTeamText)
}

const displayIncompleteTeamText = () => {
  let incompleteTeamText = document.createElement('h2')
  incompleteTeamText.innerHTML = 'Please choose 3 pokemons to complete your team!';
  incompleteTeamText.classList.add('incomplete-team-text')
  pokemonContainer.append(incompleteTeamText)
}





//ee
const pokeBall = document.getElementById('pokeball')
const easterEgg = document.getElementById('easteregg')



pokeBall.addEventListener('click', function() {
	pokeBall.style.visibility = "hidden";
	easterEgg.style.visibility = "visible";
  });
easterEgg.addEventListener('click', function() {
	easterEgg.style.visibility = "hidden";
	pokeBall.style.visibility = "visible";
  });


//om display pokemon körs, 