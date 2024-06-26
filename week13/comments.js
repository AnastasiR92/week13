let taskName = document.getElementById('taskName');
let taskPic = document.getElementById('taskPic');
let taskComment = document.getElementById('taskComment');
let toSend = document.getElementById('toSend');
let comments = document.getElementById('comments');


//Пишем функцию, которая будет преобразовывать имя с учётом всех нюансов - лишние пробелы, отсутствие больших букв в имени и прочее. Например, было введено пользователем : иВаН . Стало: Иван .


//.trim - удаляем пробелы в начале и конце строки
//.replace - заменяем один или несколько пробелов между словами на один пробел
//.split(" ") разделяеv строку на массив слов
//.map() применяем к каждому слову, чтобы менял первую букву на заглавную, а со второного символа слова был применен регистр уменьшения на строчные
//.join(" ") - собираем все символы в одну строку
function nameChecker(name) {
    let strName = name.trim().replace(/\s/g, " ").split(" ").map(
        (word) => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(" ");
        return strName;
}

// Массив URL стандартных аватарок
const defaultAvatars = [
    '/assets/pictures/avatar1.jpg', '/assets/pictures/avatar2.jpg', '/assets/pictures/avatar3.jpg',
    '/assets/pictures/avatar4.jpg', '/assets/pictures/avatar5.jpg', '/assets/pictures/avatar6.jpg'
];

//Функция для добавления комментария
function submitComment() {
    const taskName = document.getElementById('taskName');
    const taskPic = document.getElementById('taskPic');
    const taskComment = document.getElementById('taskComment');
    const comments = document.getElementById('comments');

    const checkedName = nameChecker(taskName.value);
    const picUrl = taskPic.value;
    const message = checkSpam(taskComment.value);

    // Получаем текущую дату и время
const now = new Date();
const dateString = now.toLocaleString('ru-RU');

    // Проверяем, указал ли пользователь имя
    const displayName = checkedName || 'username';

    // Проверяем, указал ли пользователь аватар
    const avatarUrl = picUrl || getRandomAvatar();

    // Создаем элемент комментария
    const commentElement = document.createElement("div");
    commentElement.innerHTML = `
<img src="${avatarUrl}" alt="Аватар пользователя">
<p><b>${displayName}</b> ${dateString}</p>
<p>${message}</p>
    `;

    // Проверяем состояние чекбокса
    const showName = document.getElementById('showName').checked;
    if (!showName) {
    commentElement.querySelector('b').textContent = 'Аноним';
    }


comments.appendChild(commentElement);

//чистим поле после ввода
taskName.value = "";
taskPic.value = "";
taskComment.value = "";
}

// Функция для получения случайного аватара
function getRandomAvatar() {
    const index = Math.floor(Math.random() * defaultAvatars.length);
    return defaultAvatars[index];
}

submitComment();

//Функция для проверки и замены спам-слов

function checkSpam(str){
    let strSpam = str.replace(/viagra|XXX/gi, "***");
    return strSpam;
}

//преобразование и проверка данных
const checkedName = taskName(taskName.value);
const picUrl = taskPic(taskPic.value);
const message = taskComment(taskComment.value);