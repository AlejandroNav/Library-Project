const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const container = document.getElementById('card-grid-section');

const dialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');
const closeDialogBtn = document.getElementById('close-dialog');

const myLibrary = [
    {
        id: crypto.randomUUID(),
        title: 'Dune',
        author: 'Frank Herbert',
        genre: 'Science Fiction',
        status: 'Finished'
    },
    {
        id: crypto.randomUUID(),
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        status: 'Reading'
    },
    {
        id: crypto.randomUUID(),
        title: 'Mistborn',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        status: 'To Read'
    },
    {
        id: crypto.randomUUID(),
        title: 'The Road',
        author: 'Cormac McCarthy',
        genre: 'Post-Apocalyptic Fiction',
        status: 'Finished'
    },
    {
        id: crypto.randomUUID(),
        title: 'The Little Prince',
        author: 'Antoine de Saint-Exupery',
        genre: 'Fable',
        status: 'Finished'
    },
    {
        id: crypto.randomUUID(),
        title: 'Hyperion',
        author: 'Dan Simmons',
        genre: 'Science Fiction',
        status: 'To Read'
    }
];

function Book(title, author, genre, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title?.trim() || "Untitled Book";
    this.author = author?.trim() || "John Doe";
    this.genre = genre?.trim() || "Unknown Genre";
    this.pages = Number(pages) > 0 ? Number(pages) : 0;
    this.status = status?.trim() || "To Read";
}

function addBookToLibrary(title, author, genre, pages, status) {
    const newBook = new Book(title, author, genre, pages, status);
    myLibrary.push(newBook);
}

function displayBooks() {
    container.innerHTML = '';

    myLibrary.forEach(function (book) {
        const newCard = document.createElement("article");
        newCard.classList.add("current-card");

        newCard.innerHTML = `
            <button class="card-close" aria-label="Close card" data-id="${book.id}">&times;</button>
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Status:</strong> ${book.status}</p>
        `;

        container.appendChild(newCard);
    });
}

function removeBook(id) {
    const index = myLibrary.findIndex(function (book) {
        return book.id === id;
    });

    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

button1.addEventListener('click', function (e) {
    e.preventDefault();
    dialog.showModal();
});

closeDialogBtn.addEventListener('click', function () {
    dialog.close();
});

bookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').value;

    addBookToLibrary(title, author, genre, pages, status);
    displayBooks();

    bookForm.reset();
    dialog.close();
});

button2.addEventListener('click', function (e) {
    e.preventDefault();
    myLibrary.length = 0;
    displayBooks();
});

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-close')) {
        const id = e.target.dataset.id;
        removeBook(id);
    }
});

displayBooks();