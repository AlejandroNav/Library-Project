const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const container = document.getElementById('card-grid-section');

const dialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');
const closeDialogBtn = document.getElementById('close-dialog');

const myLibrary = [];

function Book(title, author, genre, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title?.trim() || "Untitled Book";
    this.author = author?.trim() || "John Doe";
    this.genre = genre?.trim() || "Unknown Genre";
    this.pages = Number(pages) > 0 ? Number(pages) : 0;
    this.status = status?.trim() || "To Read";
}

Book.prototype.toggleStatus = function () {
    if (this.status === "To Read") {
        this.status = "Reading";
    } else if (this.status === "Reading") {
        this.status = "Finished";
    } else {
        this.status = "To Read";
    }
};

function addBookToLibrary(title, author, genre, pages, status) {
    const newBook = new Book(title, author, genre, pages, status);
    myLibrary.push(newBook);
}

function displayBooks() {
    container.innerHTML = '';

    myLibrary.forEach(function (book) {
        const newCard = document.createElement('article');
        newCard.classList.add('current-card');

        newCard.innerHTML = `
            <button class="card-close" aria-label="Close card" data-id="${book.id}">&times;</button>
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.status}</p>
            <button class="toggle-status btn card-action" data-id="${book.id}">
                Change Status
            </button>
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

function toggleBookStatus(id) {
    const book = myLibrary.find(function (book) {
        return book.id === id;
    });

    if (book) {
        book.toggleStatus();
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

    if (e.target.classList.contains('toggle-status')) {
        const id = e.target.dataset.id;
        toggleBookStatus(id);
    }
});

/* Starter books */
addBookToLibrary('Dune', 'Frank Herbert', 'Science Fiction', 412, 'Finished');
addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 1178, 'Reading');
addBookToLibrary('Mistborn', 'Brandon Sanderson', 'Fantasy', 541, 'To Read');
addBookToLibrary('The Road', 'Cormac McCarthy', 'Post-Apocalyptic Fiction', 287, 'Finished');
addBookToLibrary('The Little Prince', 'Antoine de Saint-Exupery', 'Fable', 96, 'Finished');
addBookToLibrary('Hyperion', 'Dan Simmons', 'Science Fiction', 482, 'To Read');

displayBooks();