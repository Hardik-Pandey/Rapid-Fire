const data = [{
    id: '9',
    name: 'General Knowledge Quiz',
    description: 'This quiz will help to polish your unawareness about General Knowledge.'
}, {
    id: '21',
    name: 'Sports Quiz',
    description: 'This quiz tests knowledge in various on and off field sporting events.'
}, {
    id: '22',
    name: 'Geography Quiz',
    description: 'This test contains various questions that are useful for every candidate to face multiple competitive exams.'
}]

for(var i = 0; i < data.length; i++) {
    document.getElementById("all-quizzes").innerHTML += 
    `<div class='quiz-list-container quiz-list-container-${data[i].id}' id='quiz-list-container'>
        <div class='upper-part'>
            <div class='quiz-list-heading-container'>
                <h3 class='quiz-list quiz-list-${data[i].id}'>${data[i].name}</h3>
            </div>
            <div class='quiz-list-button-container'>
                <button type='submit' class='start-quiz start-quiz-${data[i].id}' onclick='func(${i})'>Start</button>
            </div>
        </div>
        <div class='lower-part'>
            ${data[i].description}
        </div>
    </div>`
}

function func(i) {
    window.location.href = `/quiz/${data[i].id}`
}