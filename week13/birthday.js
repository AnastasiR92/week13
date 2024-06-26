document.addEventListener('DOMContentLoaded', (event) => {
  let button = document.querySelector('button[type="submit"]');
  let result = document.getElementById('result');
  let mistake = document.getElementById('mistake');

  // Обработчик события 'click' для кнопки.
  button.addEventListener('click', function() {
    let bdayValue = document.getElementById('bday').value;
    // Вызов функции bdayInput с передачей значения из поля ввода.
    bdayInput(bdayValue);
  });

  // Функция для расчета количества дней до дня рождения.
  function bdayInput(bday){
    let currentDate = new Date();
    let birthday = new Date(bday);
    birthday.setFullYear(currentDate.getFullYear());
    let differenceOfTime = birthday - currentDate;

    // Проверка на корректность введенной даты.
    if(isNaN(birthday.getTime())){
      mistake.innerHTML = 'Пожалуйста, введите корректную дату рождения.';
      return;
    }

    // Если день рождения уже прошел в этом году, добавляем 1 год.
    if(differenceOfTime < 0 ){
      birthday.setFullYear(currentDate.getFullYear() + 1);
      differenceOfTime = birthday - currentDate;
    }

    // Расчет количества дней и вывод результата.
    let days = Math.ceil(differenceOfTime / (1000 * 60 * 60 * 24));
    result.innerHTML = `До вашего дня рождения осталось ${days} ${getDayGrammar(days)}`;
  }

  // Функция для определения правильной формы слова "день".
  function getDayGrammar(number){
    let titles = ['день', 'дня', 'дней'];
    let caseIndex;

    if (number % 100 > 4 && number % 100 < 20) {
      caseIndex = 2;
    } else {
      let lastDigit = number % 10;
      
      if (lastDigit === 1) {
        caseIndex = 0;
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        caseIndex = 1;
      } else {
        caseIndex = 2;
      }
    }
    return titles[caseIndex];
  }
});