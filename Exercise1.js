/* Задание 1
Вам дана заготовка и результат, который вы должны получить.
Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
*/


const xmlString = `<list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
</list>`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const listNode = xmlDOM.querySelectorAll("student");

let students = [];

for(let i = 0; i<listNode.length; i++){
    let studentNode = listNode[i];

    let firstNode = studentNode.querySelector("first").textContent;
    let secondNode = studentNode.querySelector("second").textContent;

    let ageNode = studentNode.querySelector("age").textContent;
    let profNode = studentNode.querySelector("prof").textContent;

    let nameAtt1 = studentNode.querySelector("name").getAttribute("lang");

    let student = {};
    student.name = firstNode + " " + secondNode;
    student.age = ageNode;
    student.prof = profNode;
    student.lang = nameAtt1;

    students.push(student);


}

const result = {
    list: students
}
console.log(result);



