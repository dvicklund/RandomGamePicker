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
let nameArea = document.getElementById("gameName")
let variantsArea = document.getElementById("variants")
let searchBox = document.getElementById("searchBox")
let searchResults = document.getElementById("searchResults")
let errorArea = document.getElementById("error")
let resettableArea = [nameArea, variantsArea, searchResults, errorArea]

let sessionCache = window["sessionStorage"]

if (storageAvailable("sessionStorage")) {
    sessionCache = window["sessionStorage"]
    console.log(sessionCache)
} else {
    console.log("Error finding local session storage");
}

const bgaID = "O7kSnlOeJK"

function selectRandom() {
    resetMain();
    
    nameArea.innerHTML = games[Math.floor(Math.random() * games.length)]
}

function selectRandom2() {
    // resetMain()
    
    let index = Math.floor(Math.random() * games.length)
    let selected = games[index]
    // nameArea.innerHTML = selected.name
    
    search(selected.name)
    getGame(index)
    
    // nameArea.innerHTML = selected.name
    if (selected.hasOwnProperty("variants")) {
        variantsArea.innerHTML = "Variant: <br>"
        variantsArea.innerHTML += selected.variants[Math.floor(Math.random() * selected.variants.length)]
    } else {variantsArea.innerHTML = ""}
}

searchBox.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        // console.log("enter detected")
        search(searchBox.value)
    }
})

function search(query) {
    resetMain();
    let cachedData
    let storageKey = query + "_search"

    try {
        cachedData = sessionCache.getItem(storageKey)
    } catch (e) {
        console.log("Cached search data not found, searching remotely")
    }
    
    if (cachedData) {
        searchLocal(query)
    } else {
        searchRemotely(query)
    }
}

function searchLocal(query) {
    // resetMain()
    console.log("Getting locally cached data...")
    let cachedData
    let storageKey = query + "_search"

    try {
        cachedData = sessionCache.getItem(storageKey)
        // console.log(cachedData)

        let data;

        try {
            data = JSON.parse(cachedData)
        } catch (e) {
            console.log("Error parsing cached data, repopulating...")
            sessionCache.removeItem(storageKey)
            search(query);   
            data = JSON.parse(cachedData);
        }

        data.games.forEach(elem => {
            let newItemNode = document.createElement("li")
            let image = document.createElement("img")
            let linkNode = document.createElement("a")
            // console.log("Image url: " + elem.image_url)
            if(elem.official_url != "undefined") {
                linkNode.href = elem.official_url
            } else {
                linkNode.href = elem.url
            }
            image.src = elem.image_url
            newItemNode.innerHTML = elem.description
            linkNode.appendChild(image)
            newItemNode.appendChild(linkNode)
            searchResults.appendChild(newItemNode)
        });
    } catch (e) {
        console.error(e);
        console.log(e.message)
    }
}

function searchRemotely(query) {
    // resetMain()
    console.log("Searching...")
    
    let storageKey = query + "_search"
    
    const reqPromise = fetch(`https://api.boardgameatlas.com/api/search?name=${query}&order_by=rank&client_id=${bgaID}&limit=10&fields=name,image_url,description,official_url,url`)
    // const reqPromise = fetch(`https://noresponse`) //error handling test
    .then(res => {
        return res.json()
    })
    .then((data) => {
        data.games.forEach(elem => {
            // console.log(elem);
            let newItemNode = document.createElement("li")
            let image = document.createElement("img")
            let linkNode = document.createElement("a")

            if(elem.official_url) {
                linkNode.href = elem.official_url
            } else {
                linkNode.href = elem.url
            }

            image.src = elem.image_url
            newItemNode.innerHTML = elem.description
            linkNode.appendChild(image)
            newItemNode.appendChild(linkNode)
            searchResults.appendChild(newItemNode)
        })

        try {
            sessionCache.setItem(storageKey, JSON.stringify(data))
        } catch (e) {
            console.log("Error setting item")
            console.error(e)
        }
    }).catch(e => {
        console.log(e.message)
        console.error(e);
        
        errorArea.innerHTML = "Error getting extra data"
    })
    console.log("fetching something...")
}

function getGame(index) {
    let id = games[index].id
    let name = games[index].name

    let cachedData
    let storageKey = name

    try {
        cachedData = sessionCache.getItem(storageKey)
    } catch (e) {
        console.log("Cached search data not found, searching remotely")
    }
    
    if (cachedData) {
        getGameLocally(index)
    } else {
        getGameRemotely(index)
    }
}

function getGameRemotely(index) {
    // resetMain()
    console.log("Getting game data...")
    
    let id = games[index].id
    let storageKey = games[index].name
    
    const reqPromise = fetch(`https://api.boardgameatlas.com/api/search?ids=${id}&order_by=rank&client_id=${bgaID}&limit=1`)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        let gameData = data.games[0]
        
        let newItemNode = document.createElement("aside")
        let linkNode = document.createElement("a")
        let image = document.createElement("img")
        let title = document.createElement("h1")
        
        image.src = gameData.image_url
        title.innerHTML = games[index].name
        if(gameData.official_url) {
            linkNode.href = gameData.official_url
        } else {
            linkNode.href = gameData.url
        }
        newItemNode.appendChild(title)
        linkNode.appendChild(image)
        newItemNode.appendChild(linkNode)
        nameArea.appendChild(newItemNode)
        
        let selected = games[index]
        
        nameArea.innerHTML = selected.name
        
        if (selected.hasOwnProperty("variants")) {
            variantsArea.innerHTML = "Variant: <br>"
            variantsArea.innerHTML += selected.variants[Math.floor(Math.random() * selected.variants.length)]
        } else {variantsArea.innerHTML = ""}
        
        try {
            sessionCache.setItem(storageKey, JSON.stringify(data))
        } catch (e) {
            console.log("Error setting item")
            console.error(e)
        }
        
        // return data;
    }).catch(e => {
        console.log("Error fetching data, displaying barebones data")
    })
}

function getGameLocally(index) {
    console.log("Getting locally cached data...")
    let cachedData
    let storageKey = games[index].name

    try {
        cachedData = sessionCache.getItem(storageKey)
        // console.log(cachedData)

        let data;

        try {
            data = JSON.parse(cachedData)
        } catch (e) {
            console.log("Error parsing cached data, repopulating...")
            sessionCache.removeItem(storageKey)
            search(query);   
            data = JSON.parse(cachedData);
        }

        console.log(data)
        let gameData = data.games[0]
        
        let newItemNode = document.createElement("aside")
        let linkNode = document.createElement("a")
        let image = document.createElement("img")
        let title = document.createElement("h1")
        
        image.src = gameData.image_url
        title.innerHTML = games[index].name
        if(gameData.official_url) {
            linkNode.href = gameData.official_url
        } else {
            linkNode.href = gameData.url
        }
        newItemNode.appendChild(title)
        linkNode.appendChild(image)
        newItemNode.appendChild(linkNode)
        nameArea.appendChild(newItemNode)
        
        let selected = games[index]
        
        nameArea.innerHTML = selected.name
        
        if (selected.hasOwnProperty("variants")) {
            variantsArea.innerHTML = "Variant: <br>"
            variantsArea.innerHTML += selected.variants[Math.floor(Math.random() * selected.variants.length)]
        } else {variantsArea.innerHTML = ""}

    } catch (e) {
        console.error(e);
        console.log(e.message)
    }
}

function resetMain() {
    console.log("resetting main view...")
    // console.trace()
    for (var a in resettableArea) {
        resettableArea[a].innerHTML = ""
    }
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
            
            
            
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
