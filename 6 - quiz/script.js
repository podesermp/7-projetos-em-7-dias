//Initial data
let currentQuestion = 0;
let correctAnswer = 0;
showQuestion()

//events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

//function
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHTML = '';

        for (let i in q.options) {
            optionsHTML += `<div class="option" data-op="${i}"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let optionSelected = parseInt(e.target.getAttribute('data-op'))
    if (questions[currentQuestion].answer === optionSelected) {
        correctAnswer++;
    }
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100)

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}.`

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Ta ruim em?!'
        document.querySelector('.scorePct').style.color = '#FF0000' //vermelho
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!'
        document.querySelector('.scorePct').style.color = '#ffff00' //amarelo
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns'
        document.querySelector('.scorePct').style.color = '#0d630d' //verde
    }
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`
}

function resetEvent() {
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
}