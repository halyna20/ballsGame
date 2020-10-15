//отримати випадкове число
function random(max){
	//випадкове число від 0 до максимум
	var rand = 1 + Math.random() * (max + 1);
	//округлення до цілого числа
	rand = Math.floor(rand);
	//return - повернути результат
	return rand;
}

/*==================================
Функції для створення елементів гри
====================================*/

/*<div id="start-block">
	<!-- Створення кнопки -->
	<button id = "start-knopka">Почати</button>
</div>*/
//створення стартового блока
function creationStartBlock(){
	//створюємо блок div <div id="start-block">
	startBlock = document.createElement("div");
	startBlock.id = "start-block";
	//створюємо кнопку <button id = "start-knopka">Почати</button>
	startKnopka = document.createElement("button");
	startKnopka.id = "start-knopka";
	startKnopka.innerText = "Почати";
	//додаємо кнопку в стартовий блок
	startBlock.appendChild(startKnopka);

	//додаємо стартовий блок в ігрове поле
	igraPole.appendChild(startBlock);
}

/*<div id="stars">0</div>*/
//створюємо очки і добавляєм їх в ігрове поле
function creationStarsBlock(){
	//створюємо блок очків div
	stars = document.createElement("div");
	//добавляєм тегу div => id="stars"
	stars.id = "stars";
	//додаємо текст в елемент очки
	stars.innerText = 0;
	//додаємо елемент очки в ігрове поле <div id="igra"></div>
	igraPole.appendChild(stars);
}

/*<div id="lifes">
	<span></span>
	<span></span>
	<span></span>
</div>*/
//створюємо життя і добавляєм його в ігрове поле
function creationLifes(){
	//створюємо блок div
	lifes = document.createElement("div");
	//добавляєм тегу div => id="lifes"
	lifes.id = "lifes";
	//змінна в якій зберігаємо поточну кількість відображенних життів
	var currentQuantityLifes = 0;
	//перевірка чи поточна кількість життів менша за бажану кількість
	while(currentQuantityLifes < quantityLifes){
		//створюєм тег span
		var span = document.createElement("span");
		//добавляємо в блок div тег span
		lifes.appendChild(span);
		//збільшуємо поточну кількість відображенних життів
		currentQuantityLifes = currentQuantityLifes + 1;
	}

	//добавляємо в ігрове поле блок життя 
	igraPole.appendChild(lifes);
}

//<h2>Час: <span id = "timer">10</span></h2>
//функція для створення блока таймера
function creationTimerBlock(){
	//створюємо заголовок h2 з текстом "Час:"
	var h2 = document.createElement("h2");
		h2.innerText = "Час:";
		
	//в коробочку timerBlock добавляємо тег span
	timerBlock = document.createElement("span");
	//прописуємо span id="timer" і текст 10
	timerBlock.id = "timer";
	timerBlock.innerText = "20";
	//добавляємо в заголовок h2 тег span
	h2.appendChild(timerBlock);
	//добавляємо в інформаційний блок заголовок з таймером
	infoBlock.appendChild(h2);
}

//<div id="ball"></div>
//створюємо кульку і добавляєм її в ігрове поле
function creationBall(){
	//створюємо блок div
	var ball = document.createElement("div");
	//створення змінної 
	var route = random(2);//1 - left, 2 - right
	//якщо направлення 1 то вилітає зліва
	if(route == 1) {
		ball.className = "ball left";
	}else{ //в іншому випадку вилітає зправа
		ball.className = "ball right";
	}

	/*при наведенні на м'яч виконання функції*/
	ball.onmousemove = function(){

		if(ball.className != "ball await-delete"){

			//збільшення рахунку гри
			score = score + random(4);
			/*змінення значення очків,
			 текст очків буде з змінної score*/
			stars.innerText = score;

			//прозорість м'яча
			ball.style.opacity = "0";
			//видаляємо кульку
			setTimeout(function() {
				//видаляємо кульку
				ball.remove();

				var existBall = document.querySelector(".ball"); //element | null
				if(existBall == null){
					//скільки кульок хочу зробити
					var quantityBall = random(5);
					//поточна кількість кульок
					var currentQuantityBall = 0;
					//перевірка чи поточна кількість кульок менша за бажану кількість
					while(currentQuantityBall < quantityBall){
						//створюємо кульку
						creationBall();
						//збільшення поточної кількості кульок на 1
						currentQuantityBall = currentQuantityBall + 1;
					}
				}
			}, 200); //кінець таймера
		}

		ball.className = "ball await-delete";
	}; //кінець події onclik
	

	//зміна розташування м'яча після створення через 0.2 секунди
	setTimeout(function(){
		//надання відступу зверху випадкового значення в межах від 0 до 350
		ball.style.top = random(350) + "px";
		//надання відступу зліва випадкового значення в межах від 0 до 550
		ball.style.left = random(550) + "px";
	}, 200);

	//запустити переміщення шаріка вниз через 1 секунду і видаляти його якщо вийшов за межу + віднімати життя
	setTimeout(function(){
		//забираємо властивість з затримкою змінення стилів
		ball.style.transition = "all 0s";
		//створення таймеру, який кожні 10 мілісекунд опускає шарік нижче
		var timerBall = setInterval(function(){
			//зміна розташування кульки на 1 піксель вниз
			ball.style.top = ball.offsetTop + 1 + "px";
			//якщо кулька вийшла за межі поля
			if(ball.offsetTop > 400){
				//видаляємо кульку
				ball.remove();
				//створюємо нову кульку
				creationBall();
				//зменшуємо кількість життя
				quantityLifes = quantityLifes - 1;
				//якщо життя не залишилось завершити гру
				if(quantityLifes == 0){
					//завершити гру
					finishGame();
				}
				//видаляємо блок життя
				deleteLifesBlock();
				//створюємо новий блок життя
				creationLifes();
				//видаляємо таймер
				clearInterval(timerBall);
			}
		},10)
	},1000);

	//перевірка чи статус гри не кінець, якщо так створення м'яча
	if (status != "finish") {
		//додаємо елемент м'яч в ігрове поле <div id="igra"></div>
		igraPole.appendChild(ball);
	}
}

/*	<div id="finish">
		<h2>Гра закінчена!</h2>
		<h3>Ви набрали: 100 очків</h3>
	</div>*/
function creationFinishGame(){
	//створюємо блок div <div id="finish">
	var div = document.createElement("div");
		div.id = "finish";

	//створюємо блок <h2>Гра закінчена!</h2>
	var h2 = document.createElement("h2");
		h2.innerText = "Гра закінчена!";

	//створюємо блок <h3>Ви набрали: 100 очків</h3>
	var h3 = document.createElement("h2");
		h3.innerText = "Ви набрали: " + score +" очків";

	//додаємо заголовок h2
	div.appendChild(h2);
	//додаємо заголовок h3
	div.appendChild(h3);

	//додаємо в ігрове поле блок завершення гри
	igraPole.appendChild(div);
}

/*=================
Видалення елементів
===================*/
//Видаляти стартовий блок
function deleteStartBlock(){
	//видалити вибраний блок
	startBlock.remove();
}

//видаляємо блок життя
function deleteLifesBlock(){
	lifes.remove();
}

//видаляємо блок очків
function deleteStarsBlock(){
	stars.remove();
}

//видаляємо блок таймера
function deleteTimerBlock(){
	timerBlock.remove();
}

function clearIgraPole(){
	igraPole.innerText = "";
}