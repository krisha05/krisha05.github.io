const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'standard ttl circuit operate with a ___ volt power supply?',
        choice1: '2',
        choice2: '4',
        choice3: '5',
        choice4: '3',
        answer: 3,
    },
    {
        question:
            "WHAT IS TTL?",
        choice1: "Current sinking",
        choice2: "current sourcing",
        choice3: "voltage sinking",
        choice4: "voltage sourcing",
        answer: 1,
    },
    {
        question: "CMOS technology is used for?",
        choice1: "microprocessor",
        choice2: "memory chip",
        choice3: "microcontroller",
        choice4: "all of above",
        answer: 4,
    },
    {
        question: "Fan-out for a typical TTL gate is?",
        choice1: "10",
        choice2: "4",
        choice3: "54",
        choice4: "1",
        answer: 4,
    
    

    },
    
    {
        question: "In TTL,voltage range 2V-VCC creates logic level?",
        choice1: "0",
        choice2: "1",
        choice3: "infinite",
        choice4: "default",
        answer: 2,
    
    

    },
    {
        question: "what is the standard TTL noise margin?",
        choice1: "5.0V",
        choice2: "0.0V",
        choice3: "0.8V",
        choice4: "0.4V",
        answer: 4,
    
    

    },
    {
        question: "A TTL gate may operate inadertently as an ?",
        choice1: "Digital amplifier",
        choice2: "Analog amplifier",
        choice3: "Inverter",
        choice4: "regulator",
        answer: 2,
    
    

    },
    {
        question: "CMOS behaves like a/an ?",
        choice1: "Subtractor",
        choice2: "Inverter",
        choice3: "Adder",
        choice4: "comparator",
        answer: 2,
    
    

    },
    {
        question: "CMOS invertor has ____ region of operation ?",
        choice1: "3",
        choice2: "4",
        choice3: "2",
        choice4: "5",
        answer: 4,
    
    

    },
    {
        question: "In TTL logic, the input transistor has a number of ___ equal to the desired fan-in of the circuit ?",
        choice1: "base",
        choice2: "collector",
        choice3: "emitter",
        choice4: "gate",
        answer: 3,
    
    

    },
    {
        question: "which of the following output levels would not be a valid LOW for a TTL gate ?",
        choice1: "0.3V",
        choice2: "0.5V",
        choice3: "0.2V",
        choice4: "All are valid",
        answer: 4,
    
    

    },
    {
        question: "which of the following output levels would not be a valid LOW for a TTL gate ?",
        choice1: "0.3V",
        choice2: "0.5V",
        choice3: "0.2V",
        choice4: "All are valid",
        answer: 4,
    
    

    }
    
    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 12

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()