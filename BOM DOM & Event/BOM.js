// ALERT --------------------------------------------------------------------------------------------------------------------------------

let pesan = 'Halo user!';
alert(pesan);

// PROMPT --------------------------------------------------------------------------------------------------------------------------------

let pesanInput = prompt('Silakan masukkan angka...');
console.log(typeof pesanInput); // output -> 'string'

let pesanInput1 = Number(prompt('Masukkan angka sesukamu...')); //Parse ke Number

let nama = prompt('Silakan masukkan nama Anda', 'Lorem Ipsum');//Memberikan Nilai Default, ditandai dengan adanya parameter kedua

// CONSOLE --------------------------------------------------------------------------------------------------------------------------------

console.log('Pesan kamu');

// PEMANGGILAN --------------------------------------------------------------------------------------------------------------------------

// Cara pertama
window.alert('Hello World');
 
// Cara kedua
alert('Hello World');