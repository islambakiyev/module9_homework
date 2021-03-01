/* Задание 4
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число.
При клике на кнопку происходит следующее:

        Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел
        вне диапазона от 100 до 300»;
        Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL
        https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.

Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.

Подсказка: получение данных из input. const value = document.querySelector('input').value;
*/

let addTime = document.getElementById('button');
const images = document.getElementById('output');
const error = document.getElementById('error');

addTime.addEventListener('click', getN);

function getN() {
    let getNum = addTime.getElementById('get_num').value;
    let getNumSecond = document.getElementById('get_num_second').value;
    if(getNum > 99 && getNum < 300 && getNumSecond > 99 && getNumSecond < 300){
        fetch(`https://picsum.photos/${getNum}/${getNumSecond}`)
            .then((response) => {
                let img = document.createElement('img');
                img.setAttribute('src', response.url);
                img.setAttribute('width', '200px');
                images.appendChild(img);
            });
    }
    else {
        let error = "Число вне диапазона от 100 до 300";
        writeOutput(error);
    }
}


function writeOutput(message) {
    error.innerText = message;
}
