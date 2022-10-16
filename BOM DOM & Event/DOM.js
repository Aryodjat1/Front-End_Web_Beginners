// GET ELEMENT ------------------------------------------------------------------------------------------------------------------------

// get element head
const head = document.head;
head;

// get element body
const body = document.body;
body;

//get element by ID
const gambar = document.getElementById('gambarUtama');  

// CREATE ELEMENT ------------------------------------------------------------------------------------------------------------------------

// TEXT
const newElement = document.createElement('p'); //CREATE
newElement.innerText = 'Selamat datang ke HTML kosong ini :)'; //ADD TEXT IN <P>
newElement.innerHTML = '<b>Selamat datang</b> ke HTML kosong ini :)'; // ADD BOLD IN INNER TEXT

// IMAGE

const newImg = document.createElement('img'); //CREATE IMG ELEMENT
newImg.setAttribute('src', 'https://picsum.photos/200/300'); // ADD IMG

// GET ELEMENT ------------------------------------------------------------------------------------------------------------------------

// GET ELEMENT ------------------------------------------------------------------------------------------------------------------------