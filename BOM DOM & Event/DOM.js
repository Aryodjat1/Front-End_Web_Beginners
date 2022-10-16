// GET ELEMENT ------------------------------------------------------------------------------------------------------------------------

// get element head
const head = document.head;
head;

// get element body
const body = document.body;
body;

//get element by ID
const gambar1 = document.getElementById('gambarUtama');  

// CREATE ELEMENT ------------------------------------------------------------------------------------------------------------------------

// TEXT
const newElement = document.createElement('p'); //CREATE
newElement.innerText = 'Selamat datang ke HTML kosong ini :)'; //ADD TEXT IN <P>
newElement.innerHTML = '<b>Selamat datang</b> ke HTML kosong ini :)'; // ADD BOLD IN INNER TEXT

// IMAGE

const newImg = document.createElement('img'); //CREATE IMG ELEMENT
newImg.setAttribute('src', 'https://picsum.photos/200/300'); // ADD IMG

// MANIPULATION ELEMENT ------------------------------------------------------------------------------------------------------------------------

element.setAttribute('nama_atribut_sasaran', 'nilai_atribut_sasaran');// format
const gambar = document.getElementById('gambar'); // ubah DOM.HTML
gambar.setAttribute('width', 300);
gambar.setAttribute('height', 215);
const buttons = document.querySelectorAll('.button');
const playButton = buttons[3];
const playButtonElement = playButton.children[0];

// MANIPULATION CONTENT ------------------------------------------------------------------------------------------------------------------------

dicoding.innerHTML = '<i>Belajar Programming di Dicoding</i>';// INNER HTML

const buttons1 = document.getElementsByClassName('button');
// MANIPULATING STYLE
for (const button of buttons) {
    button.children[0].style.borderRadius = '6px';
  }

// INSERT TO HTML ------------------------------------------------------------------------------------------------------------------------

// APPEND CHILD
const newElement = document.createElement('li');
newElement.innerText = 'Selamat menikmati!';
const daftar = document.getElementById('daftar');
daftar.appendChild(newElement);

//INSERT BEFORE
const elementAwal = document.createElement('li');
elementAwal.innerText = 'Hidupkan kompor.';
const itemAwal = document.getElementById('awal');
daftar.insertBefore(elementAwal, itemAwal);