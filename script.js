class Book {
    constructor(title, author, genre, pages, status) {
        this.id = crypto.randomUUID();
        this.title = title?.trim() || "Untitled Book";
        this.author = author?.trim() || "John Doe";
        this.genre = genre?.trim() || "Unknown Genre";
        this.pages = Number(pages) > 0 ? Number(pages) : 0;
        this.status = status?.trim() || "To Read";
    }

    toggleStatus() {
        if (this.status === "To Read") {
            this.status = "Reading";
        } else if (this.status === "Reading") {
            this.status = "Finished";
        } else {
            this.status = "To Read";
        }
    }
}

class Library {
    #books = [];

    addBook(title, author, genre, pages, status) {
        this.#books.push(new Book(title, author, genre, pages, status));
    }

    removeBook(id) {
        const index = this.#books.findIndex(function (book) { return book.id === id; });
        if (index !== -1) this.#books.splice(index, 1);
    }

    toggleBookStatus(id) {
        const book = this.#books.find(function (book) { return book.id === id; });
        book?.toggleStatus();
    }

    clear() {
        this.#books.length = 0;
    }

    getBooks() {
        return [...this.#books];
    }
}

const library = new Library();

const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const container = document.getElementById('card-grid-section');
const dialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');
const closeDialogBtn = document.getElementById('close-dialog');

function displayBooks() {
    container.innerHTML = '';
    library.getBooks().forEach(function (book) {
        const newCard = document.createElement('article');
        newCard.classList.add('current-card');

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('card-close');
        closeBtn.setAttribute('aria-label', 'Close card');
        closeBtn.dataset.id = book.id;
        closeBtn.textContent = '\u00D7';

        const title = document.createElement('h3');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.innerHTML = '<strong>Author:</strong> ';
        author.append(book.author);

        const genre = document.createElement('p');
        genre.innerHTML = '<strong>Genre:</strong> ';
        genre.append(book.genre);

        const pages = document.createElement('p');
        pages.innerHTML = '<strong>Pages:</strong> ';
        pages.append(String(book.pages));

        const status = document.createElement('p');
        status.innerHTML = '<strong>Status:</strong> ';
        status.append(book.status);

        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('toggle-status', 'btn', 'card-action');
        toggleBtn.dataset.id = book.id;
        toggleBtn.textContent = 'Change Status';

        newCard.append(closeBtn, title, author, genre, pages, status, toggleBtn);
        container.appendChild(newCard);
    });
}

button1.addEventListener('click', function (e) {
    e.preventDefault();
    dialog.showModal();
});

closeDialogBtn.addEventListener('click', function () { dialog.close(); });

bookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    library.addBook(
        document.getElementById('title').value,
        document.getElementById('author').value,
        document.getElementById('genre').value,
        document.getElementById('pages').value,
        document.getElementById('status').value
    );
    displayBooks();
    bookForm.reset();
    dialog.close();
});

button2.addEventListener('click', function (e) {
    e.preventDefault();
    library.clear();
    displayBooks();
});

container.addEventListener('click', function (e) {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('card-close')) {
        library.removeBook(id);
        displayBooks();
    }
    if (e.target.classList.contains('toggle-status')) {
        library.toggleBookStatus(id);
        displayBooks();
    }
});

/* Starter books */
library.addBook('Dune', 'Frank Herbert', 'Science Fiction', 412, 'Finished');
library.addBook('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 1178, 'Reading');
library.addBook('Mistborn', 'Brandon Sanderson', 'Fantasy', 541, 'To Read');
library.addBook('The Road', 'Cormac McCarthy', 'Post-Apocalyptic Fiction', 287, 'Finished');
library.addBook('The Little Prince', 'Antoine de Saint-Exupery', 'Fable', 96, 'Finished');
library.addBook('Hyperion', 'Dan Simmons', 'Science Fiction', 482, 'To Read');
displayBooks();