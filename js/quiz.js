const pageUrl = window.location.href.split('/')
// console.log(pageUrl)
const quizId = pageUrl[pageUrl.length - 1],
url = 'https://opentdb.com/api.php?amount=5&category=' + quizId + '&difficulty=easy&type=multiple'
var t, flag = 0, obj = {
    "quiz_id": quizId,
    "mappings": []
}

fetch(url)
.then((resp) => resp.json())
.then(async function(data) {
    console.log(data);
    data = data.results
    document.getElementById("app-title").innerHTML = `${data[0].category} Quiz`;
    var questions = []
    for(var i = 0; i < data.length; i++) {
        document.getElementById("question").innerHTML = `<h3>${data[i].question}</h3>`
        document.getElementById("options").innerHTML = ""
        questions = [...questions, data[i].question]
        var options = [data[i].correct_answer, ...data[i].incorrect_answers]
        for(var j = 0; j < options.length; j++) {
            document.getElementById("options").innerHTML += 
            `<div class="answer-value answer-value-${j + 1}">
                <div class="radio-btn-container" id="radio-btn-container">
                    <input type="radio" class="radio-btn radio-btn-${j + 1}" id="radio-btn-${j + 1}" name="radio-btn-${i + 1}" value="options[j]" onclick='flag = 1; obj.mappings = [...obj.mappings, ...[{"question_title": "${questions[i]}", "submitted_option": "${options[j]}", "correct_answer": "${data[i].correct_answer}"}]]' />
                </div>
                <div class="radio-label-container radio-label-container-${j + 1}" id="radio-label-container-${j + 1}">
                    <label class="label" for="radio-btn-${j + 1}">${options[j]}</label>
                </div>
            </div>`
        }
        document.getElementById("progress-bar-container").innerHTML = ""
        for(t = 15; t > 0; t--)
            document.getElementById("progress-bar-container").innerHTML += `<div class="progress-bar progress-bar-${15 - t}" id="progress-bar-${15 - t}"></div>`
        for(t = 15; t > 0; t--) {
            document.getElementById("time-remaining").innerHTML = `Time Remaining: 0:${t >= 10? t : '0' + t} / 0:15 seconds`
            await new Promise((res, rej) => setTimeout(() => res(), 1000))
            document.getElementById(`progress-bar-${15 - t}`).style.display = "grid"
            if(flag) break
        }
        if(!flag)
            obj.mappings = [...obj.mappings, ...[{question_title: questions[i], 'submitted_option': ' - ', 'correct_answer': data[i].correct_answer}]]
        flag = 0
    }

    document.getElementById("content").style.display = "none"
    document.getElementById("result").style.display = "grid"
    calculateResult(obj)
})
.catch(function(error) {
    console.log(error);
})

// func(${questions}, ${options}, ${data}, ${i}, ${j})
// function func(questions, options, data, i, j) {
//     obj.mappings = [...obj.mappings, ...[{"question_title": questions[i], "submitted_option": options[j], "correct_answer": data[i].correct_answer}]]
// }

async function calculateResult(obj) {
    var answerSheet = obj.mappings, score = 0
    for(var i = 0; i < answerSheet.length; i++) {
        document.getElementById("answer-body-container").innerHTML += 
        `<div class="answer-body" id="answer-body">
            <div class="question question-${i + 1}" id="question-${i + 1}">Question: ${answerSheet[i].question_title}</div>
            <div class="submitted-answer submitted-answer-${i + 1}" id="submitted-answer-${i + 1}">Your Answer: ${answerSheet[i].submitted_option}</div>
            <div class="correct-answer correct-answer-${i + 1}" id="correct-answer-${i + 1}">Correct Answer: ${answerSheet[i].correct_answer}</div>
        </div>`
        if(answerSheet[i].submitted_option == answerSheet[i].correct_answer)
            score++
    }
    document.getElementById("score").innerHTML = `<h1 class="score">Your score is: ${score}</h1>`
}