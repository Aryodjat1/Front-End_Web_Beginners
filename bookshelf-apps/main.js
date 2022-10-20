const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function(){
    const submitForm = document.getElementById('book-form');
    submitForm.addEventListener('submit', function(event){
        event.preventDefault();
        addBook();
    });

    // LOCAL STORAGE    

});

function addBook(){
    const titleBook = document.getElementById('title').value;
    const authorBook = document.getElementById('author').value;
    const yearBook = document.getElementById('year').value;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, titleBook, authorBook, yearBook, false)    
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));

    //lOCAL STORAGE
}

function generateId(){
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted){
    return{
        id,
        title,
        author,
        year,
        isCompleted
    }
}

document.addEventListener(RENDER_EVENT, function(){
    console.log(books);
});

function maekBook(bookObject){
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('h4');
    textAuthor.innerText = bookObject.author;

    const textYear = document.createElement('h4');
    textYear.innerText =bookObject.year;

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

        undoButton.addEventListener('click', function(){
            undoTaskFromCompleted(bookObject.id);
        });

        container.append(undoButton, trashButton)
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', function (){
            addTaskToCompleted(bookObject.id);
        });

        container.append(checkButton);
    }

    return container;
}

document.addEventListener(RENDER_EVENT, function(){
    const uncompletedBookList = document.getElementById('books');
    uncompletedBookList.innerHTML = '';

    const completedBookList = document.getElementById('completed-books');
    completedBookList.innerHTML = '';

    for(const bookItem of books){
        const bookElement = maekBook(bookItem);
        if (!bookItem.isCompleted) {
            uncompletedBookList.append(bookElement);
        }else {
            completedBookList.append(bookElement);
        }
    }
});

function addTaskToCompleted(bookId){
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));

    // LOCAL STORAGE
}

function findBook(todoId){
    for (const bookItem of books){
        if (bookItem.id === bookId){
            return bookItem;
        }
    }
    return null;
}

function removeTaskFromCompleted(bookId){
    const bookTarget =findBookIndex(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));

    // LOCAL STORAGE
}

function findBookIndex(bookId){
    for (const index in books){
        if(books[index].id === bookId){
            return index;
        }
    }

    return -1;
}




