var games = [
    {"name": "Pokemon TCG", "playTime": 20},
    {"name": "Carcassonne: The Castle", "playTime": 30},
    {"name": "Calico", "playTime": 45},
    {"name": "Cascadia", "playTime": 45},
    {"name": "Big Carcassonne", "playTime": 60, "variants": ["Base", "Fantasy", "Traders", "Goofy Expansions"]},
    {"name": "Root", "playTime": 45},
    {"name": "Everdell", "playTime": 90, "variants": ["Base", "Pearlbrook", "Spirecrest"]},
    {"name": "Parks", "playTime": 60},
    {"name": "Wingspan", "playTime": 70},
    {"name": "Viticulture", "playTime": 60},
    {"name": "Morels", "playTime": 30},
    {"name": "Welcome To...", "playTime": 30, "variants": ["The Neighborhood", "Las Vegas"]},
    {"name": "Azul", "playTime": 30},
    {"name": "Marrakesh", "playTime": 30},
    {"name": "Ticket to Ride", "playTime": 45},
    {"name": "Ticket to Ride: New York", "playTime": 25},
    {"name": "Tsuro", "playTime": 30},
    {"name": "Forbidden Island", "playTime": 30},
    {"name": "Isle of Cats", "playTime": 60},
    {"name": "Splendor", "playTime": 45},
    {"name": "Cribbage", "playTime": 45},
    {"name": "Chess", "playTime": 60},
    {"name": "Set", "playTime": 15},
    {"name": "Blink", "playTime": 5},
    {"name": "Qwirkle", "playTime": 45},
    {"name": "Dominoes", "playTime": 30},
    {"name": "Boggle", "playTime": 30},
    {"name": "Blokus", "playTime": 30},
    {"name": "Kingdomino", "playTime": 30},
    {"name": "Mancala", "playTime": 15},
    {"name": "Puzzle", "playTime": 120},
    {"name": "Arkham Horror", "playTime": 60},
    {"name": "Gloom", "playTime": 30},
    {"name": "Bunny Kingdom", "playTime": 60}
]

let genBtn = document.getElementById("pickButton")
let nameArea = document.getElementById("game")
let variantsArea = document.getElementById("variants")
const bgaID = "O7kSnlOeJK"


function selectRandom() {
    nameArea.innerHTML = games[Math.floor(Math.random() * games.length)]
}

function selectRandom2() {
    let selected = games[Math.floor(Math.random() * games.length)]
    nameArea.innerHTML = selected.name;

    if (selected.hasOwnProperty("variants")) {
        variantsArea.innerHTML = "Variant: <br>"
        variantsArea.innerHTML += selected.variants[Math.floor(Math.random() * selected.variants.length)]
    } else {variantsArea.innerHTML = ""}
}

// function getResource() {
//     const reqPromise = fetch("https://api.boardgameatlas.com/api/search?name=Carcassonne&order_by=rank&client_id=" + bgaID)
//         .then(function (res) {
//             console.log("Got something!")
//             console.log(res);
//             return res.blob();
//         })
//         .then(function (res) {
//             console.log("Blobbing it")
//             console.log(res)
//         })
//     console.log("fetching something...")
// }

// getResource();