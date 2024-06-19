let ballsWeHave = 5;
let pokemonList = [];
let pokemonArray = [];
let currentPokemon;

document.querySelector("#pokeballs").value = ballsWeHave;
document.querySelector("#pokeballsDisplay").innerText = ballsWeHave;

document.querySelector("#findPokemon").addEventListener("click", playGame);
document.querySelector("#catchPokemon").addEventListener("click", catchPokemon);
document.querySelector("#tryAgain").addEventListener("click", function () {
  document.querySelector("#catchPokemon").disabled = false;
  document.querySelector("#tryAgain").style.display = "none";
});
document.querySelector("#addToCollection").addEventListener("click", function () {
  addToCollection(currentPokemon);
  resetGame();
});
document.querySelector("#findAnother").addEventListener("click", function () {
  playGame();
  resetGame();
});


function playGame() {
  document.querySelector("#pokemon-container").innerHTML = "";
  if (ballsWeHave == 0) {
    document.querySelector("#pokemon-container").innerHTML = "<h1>No more Pokeballs, you poor bastard!</h1>";
    document.querySelector("#btn-container").innerHTML = "";
    return;
  }
  document.querySelector("#findPokemon").style.display = "none";

  pokemonArray = [];
  for (let i = 0; i < 5; i++) {
    fetchRandomPokemon();
  }
  document.querySelector("#catchPokemon").style.display = "block";
  document.querySelector("#tryAgain").style.display = "none";
  document.querySelector("#addToCollection").style.display = "none";
  document.querySelector("#findAnother").style.display = "none";
  pokemonCaughtContainer.innerHTML = "";
}

let pokemonContainer = document.getElementById("pokemon-container");

function fetchRandomPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then(response => response.json())
    .then(data => {
      const pokemonList = data.results;
      const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
      const pokemonUrl = randomPokemon.url;
      fetch(pokemonUrl)
        .then(response => response.json())
        .then(pokemonData => {
          pokemonArray.push(pokemonData);
          const pokemonImage = document.createElement("img");
          pokemonImage.src = pokemonData.sprites.front_default;
          pokemonImage.alt = pokemonData.name;

          const pokemonContainerInner = document.createElement("div");
          pokemonContainerInner.className = "pokemon-container-inner";
          pokemonContainerInner.appendChild(pokemonImage);
          pokemonContainer.appendChild(pokemonContainerInner);
        });
    });
}

function displayPokemon(pokemonData) {
  const pokemonContainer = document.querySelector("#pokemon-container");
  pokemonContainer.innerHTML = "";
  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemonData.sprites.front_default;
  pokemonImage.alt = pokemonData.name;
  pokemonContainer.appendChild(pokemonImage);
}

function catchPokemon() {
  if (ballsWeHave == -1) {
    document.querySelector("#pokemon-container").innerHTML = "<h1>No more Pokeballs, you poor bastard!</h1>";
    document.querySelector("#btn-container").innerHTML = "";
  }
  if (Math.random() < 0.9) {
    const randomIndex = Math.floor(Math.random() * pokemonArray.length);
    currentPokemon = pokemonArray[randomIndex];
    displayPokemonCaught(currentPokemon);
    document.querySelector("#catchPokemon").style.display = "none";
    document.querySelector("#addToCollection").style.display = "block";
    document.querySelector("#findAnother").style.display = "block";
  } else {
    document.querySelector("#pokemon-container").innerHTML = "<h1>HA! You missed!</h1>";
    document.querySelector("#catchPokemon").disabled = false;
    document.querySelector("#tryAgain").style.display = "block";
    document.querySelector("#catchPokemon").style.display = "none";
    document.querySelector("#addToCollection").style.display = "none";
    document.querySelector("#findAnother").style.display = "none";

    document.querySelector("#tryAgain").addEventListener("click", tryAgain);
  }
  ballsWeHave--;
  document.querySelector("#pokeballs").value = ballsWeHave;
  document.querySelector("#pokeballsDisplay").innerText = ballsWeHave;

}

function tryAgain() {
  document.querySelector("#tryAgain").style.display = "none";

  for (let i = 0; i < 5; i++) {
    fetchRandomPokemon();
  }
  document.querySelector("#catchPokemon").style.display = "block";
}

function displayPokemonInfo(pokemonData) {
  const pokemonInfoContainer = document.querySelector("#pokemon-container");
  pokemonInfoContainer.innerHTML = `
    <h1>${pokemonData.name}</h1>
    <p>Type: ${pokemonData.types[0].type.name}</p>
    <p>Weight: ${pokemonData.weight}</p>
    <p>Height: ${pokemonData.height}</p>
  `;
}

function displayPokemonCaught(currentPokemon) {
  const pokemonCaughtContainer = document.querySelector("#pokemon-container");
  pokemonCaughtContainer.innerHTML = "";

  const pokemonImage = document.createElement("img");
  pokemonImage.src = currentPokemon.sprites.front_default;
  pokemonImage.alt = currentPokemon.name;

  const pokemonInfo = document.createElement("div");
  pokemonInfo.innerHTML = `
      <h1>${currentPokemon.name}</h1>
      <p>HP: ${currentPokemon.stats[0].base_stat * Math.round(0.7 + Math.random() * (1.3 - 0.7))}</p>
      <p>Attack: ${currentPokemon.stats[1].base_stat * Math.round(0.7 + Math.random() * (1.3 - 0.7))}</p>
      <p>Defense: ${currentPokemon.stats[2].base_stat * Math.round(0.7 + Math.random() * (1.3 - 0.7))}</p>
    `;

  const buttonsContainer = document.createElement("div");

  pokemonCaughtContainer.appendChild(pokemonImage);
  pokemonCaughtContainer.appendChild(pokemonInfo);
  pokemonCaughtContainer.appendChild(buttonsContainer);
}

function addToCollection(pokemon) {
  pokemonList.push(pokemon);
  displayCollection();

  playGame();
  // resetGame();
}

function displayCollection() {
  const collectionContainer = document.querySelector("#collection-container");
  collectionContainer.innerHTML = "<h3>Your Pokemon collection:</h3>";

  pokemonList.forEach(pokemon => {
    const pokemonContainer = document.createElement("div");
    pokemonContainer.className = "pokemon-container-inner";

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;

    const pokemonInfo = document.createElement("div");
    pokemonInfo.innerHTML = `
      <h1>${pokemon.name}</h1>
      <p>HP: ${pokemon.stats[0].base_stat * Math.round(0.7 + Math.random() * (1.3 - 0.7))}</p>
      <p>Attack: ${pokemon.stats[1].base_stat * Math.round(0.7 + Math.random() * (1.3 - 0.7))}</p>
      <p>Defense: ${pokemon.stats[2].base_stat * Math.round(0.7 + Math.random() * (1.3 - 0.7))}</p>
    `;

    pokemonContainer.appendChild(pokemonImage);
    pokemonContainer.appendChild(pokemonInfo);
    collectionContainer.appendChild(pokemonContainer);
  });
}

//   function resetGame() {
//     document.querySelector("#pokemon-container").innerHTML = "";
//     document.querySelector("#btn-container").innerHTML = "";
//     // document.querySelector("#catchPokemon").style.display = "none";
//     document.querySelector("#tryAgain").style.display = "none";
//     document.querySelector("#addToCollection").style.display = "none";
//     document.querySelector("#findAnother").style.display = "none";
//     document.querySelector("#findPokemon").style.display = "block";
// }