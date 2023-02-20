const choosePokemonSection = document.getElementById('choose-pokemons')
const myTeamSection = document.getElementById('my-team')
const findChampionButton = document.getElementById('find-champions')
const myTeamButton = document.getElementById('team-pokemons')
const findPokemonSearch = document.getElementById('search-bar')
const searchButton = document.getElementById('search-button')

myTeamButton.addEventListener('click', () => {
	choosePokemonSection.style.visibility = "hidden"
	myTeamSection.style.visibility = "visible"
})
findChampionButton.addEventListener('click', () => {
	choosePokemonSection.style.visibility = "visible"
	myTeamSection.style.visibility = "hidden"
})
searchButton.addEventListener('click', async() => {
	const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
	const response = await fetch(baseUrl)
	const data = await response.json()

	data.results.forEach(pokemon => {
		console.log(pokemon.name)
	})

	console.log(data)

})
