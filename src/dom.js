const choosePokemonSection = document.getElementById('choose-pokemons')
const myTeamSection = document.getElementById('my-team')
const findChampionButton = document.getElementById('find-champions')
const myTeamButton = document.getElementById('team-pokemons')
const findPokemonInput = document.getElementById('search-bar')
const searchButton = document.getElementById('search-button')
const baseUrl = `https://pokeapi.co/api/v2/pokemon`

myTeamButton.addEventListener('click', () => {
	choosePokemonSection.style.visibility = "hidden"
	myTeamSection.style.visibility = "visible"
})
findChampionButton.addEventListener('click', () => {
	choosePokemonSection.style.visibility = "visible"
	myTeamSection.style.visibility = "hidden"
})


//kväll
let pokemonList = []
const pokemonListKey = 'pokemonList';

//ladda listan när sidan laddas, men BARA om det redan finns i localstorage
window.onload = function() {
	fetchPokemonList();
}
//Funktion för att antingen hämta listan via API:N eller ifall det redan finns på localStrorage, ta därifrån. 
async function fetchPokemonList() {
	const pokemonListData = localStorage.getItem(pokemonListKey);
	
	if (pokemonListData) {
		// om datan finns på local storage
		try {
			pokemonList = JSON.parse(pokemonListData);
			console.log('Loaded data from local storage:', pokemonList);
		} catch (error) {
			console.error('Error parsing local storage data:', error);
		}
	} else {
		// ANNARS hämta den från api
		try {
			const response = await fetch(baseUrl);
			const data = await response.json();
			pokemonList = data.results;
			localStorage.setItem(pokemonListKey, JSON.stringify(pokemonList));
			console.log('Fetched data from API:', pokemonList);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}

// funktion för att söka i localstorage 
function findPokemons(searchString) {
	const matchingPokemon = pokemonList.filter(pokemon => {
		const nameOfPokemon = pokemon.name.toLowerCase();
		return nameOfPokemon.includes(searchString);
	});
	console.log(matchingPokemon);
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
	const searchInput = findPokemonInput.value.toLowerCase();
	findPokemons(searchInput);
});
// 	const pokemonListKey = 'pokemonList';

// 	const pokemonListData = localStorage.getItem(pokemonListKey)
	
// 	if (pokemonListData) {
// 		// om datan finns i local storage, använd den
		
// 		try {
// 			pokemonList = JSON.parse(pokemonListData);
// 		} catch (error) {
// 			console.error('Error parsing local storage data:', error);
			
// 		}
		
// 		console.log('Loaded data from local storage:', pokemonList);
// 	} else {
// 		fetch(baseUrl)
// 		.then(resp => resp.json())
// 		.then(data => {
// 			//lägg info i localstorage
// 			pokemonList = data.results;
// 			localStorage.setItem(pokemonListKey, JSON.stringify(data.results));
// 			console.log('Fetched data from API' + data.results)
// 		})
// 		.catch(error => console.log('Error fetching data:', error))
// 	} 
// 	//kalla på funktionen som letar upp sökta pokemon
// 	const searchInput = findPokemonInput.value.toLowerCase();
// 	findPokemons(searchInput)
// })
	
	
// 	//söka i local storage
	
// 	const searchString = findPokemonInput.value.toLowerCase();
	
// 	function findPokemons(searchString) {
// 		let matchingPokemon = pokemonList.filter(pokemon => {
// 			let nameOfPokemon = pokemon.name.toLowerCase();
// 			return nameOfPokemon.includes(searchString)
// 		});
// 		console.log(matchingPokemon)
// 	}
	
	
	
	
	
	
	
	
	
	
	// let searchQuery = findPokemonSearch.value;
	// //apihantering
	// searchButton.addEventListener('click', async() => {
	// 	const baseUrl = `https://pokeapi.co/api/v2/pokemon`
	// 	const response = await fetch(baseUrl)
	// 	const data = await response.json()
	
	// 	data.results.forEach(pokemon => {
	// 		console.log(pokemon.name)
	// 	})
	
	// 	console.log(data)
	
	// })