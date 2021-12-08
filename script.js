var games = [
    {"name": "Pokemon TCG", "playTime": 20, "id": "XuNKi7LGom"},
    {"name": "Carcassonne: The Castle", "playTime": 30, "id": "P6qMdm3GIK"},
    {"name": "Calico", "playTime": 45, "id": "XUeYK7XZwb"},
    {"name": "Cascadia", "playTime": 45, "id": "DcqF6LNGCi"},
    {"name": "Carcassonne", "playTime": 60, "id": "oGVgRSAKwX", "variants": ["Base", "Fantasy", "Traders", "Goofy Expansions"]},
    {"name": "Root", "playTime": 45, "id": "TAAifFP590"},
    {"name": "Everdell", "playTime": 90, "id": "8xos44jY7Q", "variants": ["Base", "Pearlbrook", "Spirecrest"]},
    {"name": "Parks", "playTime": 60, "id": "ApSXoXA1Gs"},
    {"name": "Wingspan", "playTime": 70, "id": "5H5JS0KLzK"},
    {"name": "Viticulture", "playTime": 60, "id": "7NYbgH2Z2I"},
    {"name": "Morels", "playTime": 30, "id": "XVYVL4fQcm"},
    {"name": "Welcome To...", "playTime": 30, "id": "I77I9HybTm", "variants": ["The Neighborhood", "Las Vegas"]},
    {"name": "Azul", "playTime": 30, "id": "i5Oqu5VZgP"},
    {"name": "Marrakesh", "playTime": 30, "id": "19Cw2JYpwg"},
    {"name": "Ticket to Ride", "playTime": 45, "id": "AuBvbISHR6"},
    {"name": "Ticket to Ride: New York", "playTime": 25, "id": "EiVU77dgUm"},
    {"name": "Tsuro", "playTime": 30, "id": "6jdckjvp5Y"},
    {"name": "Forbidden Island", "playTime": 30, "id": "4rn2FX1Eon"},
    {"name": "Isle of Cats", "playTime": 60, "id": "y1Umv3Jc3w"},
    {"name": "Splendor", "playTime": 45, "id": "O0G8z5Wgz1"},
    {"name": "Cribbage", "playTime": 45, "id": "Uasov6wsiM"},
    {"name": "Chess", "playTime": 60, "id": "3hnL2wtWnM"},
    {"name": "Set", "playTime": 15, "id": "fw0uqUGuUK"},
    {"name": "Blink", "playTime": 5, "id": "FB2i5zINFD"},
    {"name": "Qwirkle", "playTime": 45, "id": "M9xcYNHOGp"},
    {"name": "Dominoes", "playTime": 30, "id": "IRKe6MEM9F"},
    {"name": "Boggle", "playTime": 30, "id": "uOhZRZa3xN"},
    {"name": "Blokus", "playTime": 30, "id": "d7vHFjxM6M"},
    {"name": "Kingdomino", "playTime": 30, "id": "BBg2uXXdB8"},
    {"name": "Mancala", "playTime": 15, "id": "jqer4AvMyC"},
    {"name": "Arkham Horror", "playTime": 60, "id": "4G32qGJZWs"},
    {"name": "Gloom", "playTime": 30, "id": "iaIWG98SIG"},
    {"name": "Bunny Kingdom", "playTime": 60, "id": "esVg9eV5Ue"}
]

let genBtn = document.getElementById("pickButton")
let nameArea = document.getElementById("game")
let variantsArea = document.getElementById("variants")
let searchBox = document.getElementById("searchBox")
const bgaID = "O7kSnlOeJK"

function selectRandom() {
    let index = Math.floor(Math.random() * games.length)
    let selected = games[index]
    
    getGame(games[index].id, index)
    
    // nameArea.innerHTML = selected.name
    if (selected.hasOwnProperty("variants")) {
        variantsArea.innerHTML = "Variant: <br>"
        variantsArea.innerHTML += selected.variants[Math.floor(Math.random() * selected.variants.length)]
    } else {variantsArea.innerHTML = ""}
}

searchBox.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        console.log("enter detected");
        search(searchBox.value);
    }
})

let searchResults = document.getElementById("searchResults");

function search(query) {
    console.log("Searching...")
    searchResults.innerHTML = ""
    // let result

    const reqPromise = fetch(`https://api.boardgameatlas.com/api/search?name=${query}&order_by=rank&client_id=${bgaID}&limit=10&fields=name,image_url,description`)
        .then(res => res.json())
        .then((data) => {
            // console.log(searchResults);
            data.games.forEach(elem => {
                console.log(elem);
                let newItemNode = document.createElement("li")
                let image = document.createElement("img")
                image.src = elem.image_url
                newItemNode.innerHTML = elem.description
                newItemNode.appendChild(image);
                searchResults.appendChild(newItemNode)
            });
        })
    console.log("fetching something...")
}

function getGame(id, index) {
    console.log("Getting game data...")
    searchResults.innerHTML = ""
    nameArea.innerHTML = ""
    const reqPromise = fetch(`https://api.boardgameatlas.com/api/search?ids=${id}&order_by=rank&client_id=${bgaID}&limit=1`)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            let gameData = data.games[0]

            let newItemNode = document.createElement("p")
            let image = document.createElement("img")
            let title = document.createElement("h1")

            image.src = gameData.image_url
            title.innerHTML = games[index].name
            newItemNode.appendChild(title)
            newItemNode.appendChild(image)
            nameArea.appendChild(newItemNode)

            return data;
        }).catch(e => {
            console.log("Error fetching data, displaying barebones data")
            
            let selected = games[index]
            
            nameArea.innerHTML = selected.name

            if (selected.hasOwnProperty("variants")) {
                variantsArea.innerHTML = "Variant: <br>"
                variantsArea.innerHTML += selected.variants[Math.floor(Math.random() * selected.variants.length)]
            } else {variantsArea.innerHTML = ""}
        })
    
    console.log("reqPromise: " + reqPromise);
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