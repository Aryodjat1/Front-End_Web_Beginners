const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'savet-books'
const STORAGE_KEY = 'BOOKSHELF_APPS'

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('book-form');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function addBook() {
    const titleBook = document.getElementById('title').value;
    const authorBook = document.getElementById('author').value;
    const yearBook = document.getElementById('year').value;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, titleBook, authorBook, yearBook, false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
});

function makeBook(bookObject) {
    const textTitle = document.createElement('h3');
    // textTitle.classList.add('search-list');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('h4');
    // textAuthor.classList.add('search-list');
    textAuthor.innerText = bookObject.author;

    const textYear = document.createElement('h4');
    // textYear.classList.add('search-list');
    textYear.innerText = bookObject.year;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', 'book-${bookObject.id}');

    if (bookObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', function () {
            undoTaskFromCompleted(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');

        trashButton.addEventListener('click', function () {
            deleteTaskFromCompleted(bookObject.id);
        });

        container.append(undoButton, trashButton)
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', function () {
            addTaskToCompleted(bookObject.id);
        });

        container.append(checkButton);
    }
    return container;
}

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById('books');
    uncompletedBookList.innerHTML = '';

    const completedBookList = document.getElementById('completed-books');
    completedBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted) {
            uncompletedBookList.append(bookElement);
        } else {
            completedBookList.append(bookElement);
        }
    }
});

function addTaskToCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}

function undoTaskFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function deleteTaskFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }

    return -1;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function isStorageExist() {
    if (typeof (storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false
    }
    return true
}

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book)
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.querySelector('#search').addEventListener('input', filterList);

function filterList() {
    const searchInput = document.querySelector('#search');
    const filter = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll('.item');

    listItems.forEach((item) => {
        let text = item.textContent;
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}