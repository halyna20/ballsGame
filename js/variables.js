/*отримання елементу stars - очки на ігровому полі */
var stars = null;

/*отримання елементу lifes - життя на ігровому полі*/
var lifes = null;

//бажана кількість життя
var quantityLifes = 3;

/*отримання елементу start-block - початковий блок*/
var startBlock = null;
/*отримання елемнту startKnopka - кнопка старту*/
var startKnopka = null;

/*створення змінної score - рахунок гри*/
var score = 0;

//створення змінної status - статус гри*/
var status = "open";

//отримання елементу timer - відлік часу
var timerBlock = null;

//отримання елементу igra - ігрове поле
var igraPole = document.querySelector("#igra");

//вибираємо інформаційний блок
var infoBlock = document.querySelector("#info-block");