document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.getElementById('registrationForm');
  const testContainer = document.querySelector('.test-container');
  const resultContainer = document.getElementById('result');
  const userNameElement = document.getElementById('userName');
  const userEmailElement = document.getElementById('userEmail');
  const userGroupElement = document.getElementById('userGroup');
  const scoreElement = document.getElementById('score');
  const finishTestButton = document.getElementById('finishTestButton');

  let userAnswers = {};

  registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userName = document.getElementById('name').value;
    const userGroup = document.getElementById('group').value;
    const userEmail = document.getElementById('email').value;

    userNameElement.textContent = "Ім'я: " + userName;
    userGroupElement.textContent = 'Група: ' + userGroup;
    userEmailElement.textContent = 'Електронна пошта: ' + userEmail;

    registrationForm.style.display = 'none';
    testContainer.style.display = 'block';
  });

  finishTestButton.addEventListener('click', function (e) {
    e.preventDefault();

    userAnswers.q1 = document.querySelector('input[name="q1"]:checked')?.value;
    userAnswers.q2 = [...document.querySelectorAll('input[name="q2"]:checked')].map(input => input.value);
    userAnswers.q3 = document.querySelector('select[name="q3"]').value;
    userAnswers.q4 = getDroppedValues();
    userAnswers.q5 = document.getElementById('q5').value.trim();
    userAnswers.q6 = document.querySelector('input[name="q6"]:checked')?.value;
    userAnswers.q7 = document.querySelector('input[name="q7"]:checked')?.value;
    userAnswers.q8 = document.querySelector('input[name="q8"]:checked')?.value;
    userAnswers.q9 = document.querySelector('input[name="q9"]:checked')?.value;
    userAnswers.q10 = document.querySelector('input[name="q10"]:checked')?.value;

    const correctAnswers = {
      q1: 'a',
      q2: ['a', 'b', 'c'],
      q3: 'b',
      q4: ['b', 'a', 'c'],
      q5: 'Вап-сайт',
      q6: 'b',
      q7: 'a',
      q8: 'c',
      q9: 'c',
      q10: 'b',
    };

    let score = 0;
    for (const question in userAnswers) {
      if (Array.isArray(userAnswers[question])) {
        if (userAnswers[question].length === correctAnswers[question].length && userAnswers[question].every(value => correctAnswers[question].includes(value))) {
          score++;
        }
      } else {
        if (userAnswers[question] === correctAnswers[question]) {
          score++;
        }
      }
    }

    scoreElement.textContent = 'Правильних відповідей: ' + score;
    resultContainer.style.display = 'block';
    testContainer.style.display = 'none';
  });

  function getDroppedValues() {
    const droppedItems = document.querySelectorAll('.dropped-item');
    const values = Array.from(droppedItems).map(item => item.dataset.value);
    return values;
  }

  const draggableItems = document.querySelectorAll('.draggable-item');
  const droppableAreas = document.querySelectorAll('.droppable-area');

  draggableItems.forEach(item => {
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', e.target.dataset.value);
    });
  });

  droppableAreas.forEach(area => {
    area.addEventListener('dragover', function (e) {
      e.preventDefault();
    });

    area.addEventListener('drop', function (e) {
      e.preventDefault();
      const value = e.dataTransfer.getData('text/plain');
      const droppedItem = document.createElement('div');
      droppedItem.textContent = value;
      droppedItem.className = 'dropped-item';
      droppedItem.dataset.value = value;
      area.appendChild(droppedItem);
    });
  });
});
