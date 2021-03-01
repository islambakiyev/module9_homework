/* Задание 5
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

        Заголовок первого input — «номер страницы».
        Заголовок второго input — «лимит».
        Заголовок кнопки — «запрос».

При клике на кнопку происходит следующее:

        Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер
        страницы вне диапазона от 1 до 10»;
        Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст
        «Лимит вне диапазона от 1 до 10»;
        Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и
        лимит вне диапазона от 1 до 10»;
        Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10,
         где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.

Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.

После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса
(использовать localStorage).
*/

let addTime = document.getElementById('button');
const images = document.getElementById('output');
const error = document.getElementById('error');

const storage = localStorage.getItem('localData')

getImages(JSON.parse(storage))

addTime.addEventListener('click', (e) => {
    e.preventDefault();

    let getNum = document.getElementById('get_num').value;
    let getNumSecond = document.getElementById('get_num_second').value;

    if (getNum > 0 || getNum < 10 && getNumSecond > 0 || getNumSecond < 10) {
        fetch(`https://picsum.photos/v2/list?page=${getNum}&limit=${getNumSecond}`)
                .then((response) => {
                    return response.json()
                })
                .then((storage) => {
                    localStorage.setItem('localData', JSON.stringify(storage))
                    getImages(storage)
                })
                .catch((e) => {
                    console.log('Ошибка запроса', e)
            });
    } else if (getNum < 1 || getNum > 10 && getNumSecond < 1 || getNumSecond > 10) {
        let error = "Номер страницы и лимит вне диапазона от 1 до 10";
        console.log(error);
        writeOutput(error);

    } else if (getNumSecond < 1 || getNumSecond > 10) {
        let error = "Лимит вне диапазона от 1 до 10";
        console.log(error);
        writeOutput(error);
    } else if (getNum < 1 || getNum > 10) {
        let error = "Номер страницы вне диапазона от 1 до 10";
        console.log(error);
        writeOutput(error);
    }

});

function writeOutput(message) {
    error.innerText = message;
}

function getImages(storage) {
    if (storage) {
        storage.forEach((obj) => {
            let img = document.createElement('img')
            img.setAttribute('src', obj.download_url)
            img.setAttribute('width', '200px')
            images.appendChild(img)
        })
    }
}
