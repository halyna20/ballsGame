//Головний файл в якому я буду викликати необхідні функції і дії гри

//запускаємо функцію при загрузці сторінки
function start(){
	//створюємо стартовий блок
	creationStartBlock();
	//створюємо блок таймера
	creationTimerBlock();
	//при кліку на кнопку почати запускаємо гру
	startKnopka.onclick = play;
}

//при початку гри виконуємо цю функцію
function play(){
	status = "play";
	//видалити стартовий блок
	deleteStartBlock();
	//створюємо блок очків
	creationStarsBlock();
	//створюємо блок життя
	creationLifes();
	//створюємо м'яч
	creationBall();

	//запускаємо таймер зворотнього відліку
	timerGame();
}
//виклик функції для запуску початкової сторінки
start();

//функція, яку ми викликаємо при завершенні гри
function finishGame(){
	//надаємо змінній status значення кінець гри
	status = "finish";
	//видаляємо блок життя
	deleteLifesBlock();
	//видаляємо блок очки
	deleteStarsBlock();
	//видаляємо таймер
	deleteTimerBlock();
	//очищаємо ігрове поле від всіх елементів
	clearIgraPole();
	//створюємо блок кінця гри
	creationFinishGame();
}

//функція для відліку часу
function timerGame(){
	//відображення через час, яке викликається декілька разів
	var chasy = setInterval(function(){
		//отримання елементу timer
		var timerBlock = document.querySelector("#timer");
		//від'ємний відлік
		timerBlock.innerText = timerBlock.innerText - 1;
		//перевірка чи значення часу є 0
		if(timerBlock.innerText == 0){
			//зупинка часу
			clearInterval(chasy);
			//вивід повідомлення в консоль
			console.log("Кінець");
			//виклик функції завершення гри
			finishGame();
		}
	//задання часу за який змінюється значення в змінній
	}, 1000);
}


