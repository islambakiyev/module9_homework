/* Задание 3
Напишите код приложения, интерфейс которого представляет собой input и кнопку.
В input можно ввести любое число. При клике на кнопку происходит следующее:

        Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
        Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL
        https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.
Подсказка: получение данных из input. const value = document.querySelector('input').value;

*/

let addTime = document.getElementById('button');
const images = document.getElementById('output');
const error = document.getElementById('error');

addTime.addEventListener('click', getN);

function getN() {
    let getNum = document.getElementById('get_num').value;
    if(getNum < 11 && getNum > 0){
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log(`Статус: ${xhr.status}`)
            let data = JSON.parse(xhr.response)

            data.forEach((image) => {
                let img = document.createElement('img')
                img.setAttribute('src', image.download_url)
                img.setAttribute('width', '200px')
                images.appendChild(img)
            })
        }
        xhr.open("GET",`https://picsum.photos/v2/list?limit=${getNum}`);
        xhr.send();
    }
    else {
        let error = "Число вне диапазона от 1 до 10";
        writeOutput(error);
    }
}


function writeOutput(message) {
    error.innerText = message;
}