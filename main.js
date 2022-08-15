const questions = [
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Укажи тэг, который соответствует элементу списка:",
		answers: ["ul", "li", "ol", "td"],
		correct: 2,
	},
	{
		question: "Какие тэги используются для определения заголовков?",
		answers: ["h1-h6", "Header", "Heading", "div"],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
	{
		question: "В каком атрибуте надо написать _blank, чтобы осуществлялся переход на новую страницу?",
		answers: ["target", "type", "class", "id"],
		correct: 1,
	},
	{
		question: "Сколько наименований цветов содержит CSS?",
		answers: ["16777216", "256", "145", "все ответы неверные"],
		correct: 3,
	},
	{
		question: "Сколько весит селектор .class в CSS документе?",
		answers: ["1,0,0,0", "0,1,0,0", "0,0,1,0", "0,0,0,1"],
		correct: 3,
	},
	{
		question: "Что такое bootstrap?",
		answers: ["Ловушка", " HTML тег", "База данных", "Графический фреймворк"],
		correct: 4,
	},
	{
		question: "Что такое HTTP?",
		answers: ["Протокол", "HTML документ", "База данных", "все ответы неверные"],
		correct: 2,
	},
	
];


//Находим элементы 
const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

// Переменные иры 
let score = 0 //кол-во правильных ответов 
let questionIndex = 0 // текущий вопрос 

clearPage();
showQuestion()
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion(){
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

	headerContainer.innerHTML = title


	//Варианты ответов 
	let answerNumber = 1

	for( answerText of questions[questionIndex]['answers']){
		const questionTemplate = `
		<li>
			<label>
				<input value ="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`

	let answerHTML = questionTemplate
								.replace('%answer%',answerText)
								.replace('%number%', answerNumber)

	listContainer.innerHTML += answerHTML;
	
	answerNumber++

	}
}


function checkAnswer(){
	
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	if(!checkedRadio){
		alert('Наилюш, выбери ответ!') // или submitBtn.blur()
		                               //     return 
	}

	const userAnswer = parseInt(checkedRadio.value)

	//Если ответила верно то увеличиваем счет 

	if (userAnswer === questions[questionIndex]['correct']){
		score++;
		
	}
	
	if(questionIndex !== questions.length - 1){
		console.log('это НЕ последний вопрос')
		questionIndex++
		clearPage()
		showQuestion()
		return
	} else {
		console.log('это последний вопрос')
		clearPage()
		showResults()
	}
}

function showResults(){
	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
	`;

	let title
	let message

	if (score === questions.length){
		title = 'Поздравляю! Ты все помнишь!'
		message = 'Любимая, ты ответила верно на все вопросы!'
	}else if ((score * 100) / questions.length >= 50){
		title = 'Пойдет!'
		message = 'Любимая, ты дала более половины правильных ответов!'
	}else{
		title = 'Попробуй еще раз ;)'
		message = 'Любимая, ты дала меньше половины правильных ответов!'
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate
									.replace('%title%',title)
									.replace('%message%', message)
									.replace('%result%', result)
	
	headerContainer.innerHTML = finalMessage

	submitBtn.blur()
	submitBtn.innerText = 'Начать снова'
	submitBtn.onclick = function(){
		history.go()
	}

}





