let currentQuestion = 0;
let score = 0;
let questions = [];

async function loadQuestions() {
  const res = await fetch("/api/questions");
  questions = await res.json();
  showQuestion();
}

function showQuestion() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");

  nextBtn.disabled = true;
  optionsEl.innerHTML = "";

  if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];
    questionEl.textContent = q.question;

    q.options.forEach(option => {
      let btn = document.createElement("button");
      btn.textContent = option;
      btn.classList.add("option");
      btn.onclick = () => selectAnswer(option, q.answer);
      optionsEl.appendChild(btn);
    });
  } else {
    document.getElementById("quiz-container").innerHTML =
      `<h2>Quiz terminé 🎉</h2><p>Votre score : ${score}/${questions.length}</p>`;
  }
}

function selectAnswer(selected, correct) {
  if (selected === correct) {
    score++;
    alert("✅ Correct !");
  } else {
    alert("❌ Mauvaise réponse !");
  }
  document.getElementById("next-btn").disabled = false;
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestion++;
  showQuestion();
  document.getElementById("score").textContent = `Score: ${score}`;
});

loadQuestions();
