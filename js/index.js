document.addEventListener("DOMContentLoaded", function() {

    fetchBooks() 

});

// data  or event handler stuff 
function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(books => {
        books.forEach(book => loadBooks(book))
    })
}

function likeBook(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",  
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            users: [...book.users, {"id":1, "username":"pouros"}]
        })
    })
    .then(resp => resp.json())
    .then(book => renderBook(book))
}

//dom stuff 
function loadBooks(book) {
    let bookUl = document.getElementById('list')
    let bookLi = document.createElement('li') 
    bookLi.id = "book-list"
    bookLi.innerText = book.title
    bookUl.append(bookLi)
    bookLi.addEventListener('click', () => renderBook(book))
}


function renderBook(book) {

    let showPanel = document.getElementById('show-panel')
    showPanel.innerHTML = ""

    let bookImage = document.createElement('img')
    bookImage.src = book.img_url 

    let bookTitle = document.createElement('h2')
    bookTitle.innerText = book.title 

    let subTitle = document.createElement('h3')
    subTitle.innerText = book.subtitle 

    let author = document.createElement("h4")
    author.innerText = book.author

    let description = document.createElement("p")
    description.innerText = book.description

    let userUl = document.createElement("ul")
    book.users.forEach(function (user){
        let userLi = document.createElement("li")
        userLi.innerText = user["username"]
        userUl.appendChild(userLi)
    })

    let likeButton = document.createElement('button') 
    likeButton.innerText = "LIKE"
    
    showPanel.append(bookImage, bookTitle, subTitle, author, description, userUl, likeButton)

    likeButton.addEventListener('click', () => likeBook(book))
}