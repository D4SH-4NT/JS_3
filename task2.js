/*
    1. Определить класс, указанный в варианте, содержащий:
        a. конструктор;
        b. (опционально) Закрытые поля (#);
        c. свойства get и set;
        d. (опционально) создайте в классе статическое поле, хранящее количество созданных объектов 
            (инкрементируется в конструкторе) и статический метод вывода информации о классе.
    2. Создайте несколько объектов вашего типа. Выполните вызов конструкторов свойств, методов, сравнение объекты, 
        проверьте тип созданного объекта и т.п.
    3. Создайте массив объектов вашего типа. И выполните задание, выделенное курсивом.

    Вариант 5
        Создать класс – SuperString. 
        Методы: 
            1) вывода длины строки
            2) проверки существует ли в строке заданный символ
            3) замены одного символа в строке на другой.
        Создать массив объектов. Вывести:
            a) список строк определенной длины;
            b) список строк, которые содержат заданное слово.
*/

class SuperString {
    #value; // # - private

    static count = 0; 

    constructor(value = "") {
        this.#value = String(value);
        SuperString.count++;
    }

    get value() {
        return this.#value;
    }  
    set value(newValue) { 
        this.#value = String(newValue);
    } 

    static getInfo() {
        return `Информация о классе SuperString: количество созданных объектов = ${SuperString.count}`;
    }

    getLength() {
        return this.#value.length;
    }

    hasChar(char) {
        if (typeof char !== 'string' || char.length !== 1) {
            throw new Error("Переданный аргумент должен быть одиночным символом");
        }
        return this.#value.includes(char);
    }

    replaceChar(oldChar, newChar) {
        if (typeof oldChar !== 'string' || oldChar.length !== 1 || 
            typeof newChar !== 'string' || newChar.length !== 1) {
            throw new Error("Аргументы должны быть одиночными символами");
        }
        this.#value = this.#value.split(oldChar).join(newChar);
        return this.#value;
    }

    static compareObj = (obj1, obj2) => obj1.value === obj2.value;
    
    // а. поиск строк заданной длины
    static printByLength(arr, length) {
        arr.filter(item => item.getLength() === length)
           .forEach(item => console.log(item.value));
    }

    // Вспомогательный метод проверки наличия слова (пункт б)
    hasWord(word) {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(this.#value);
    }

    // б. поиск строк с заданным словом
    static printByWord(arr, word) {
        arr.filter(item => item.hasWord(word))
           .forEach(item => console.log(item.value));
    }
}

///////////////////////////////////////////////////////////////////////////////

const str1 = new SuperString("abcdefghg");
const str2 = new SuperString("JavaScript!");
const str3 = new SuperString("JavaScript!");

console.log(SuperString.getInfo());

console.log(`Длина "${str1.value}":`, str1.getLength());
console.log(`Есть ли символ '!' в "${str1.value}":`, str1.hasChar('!'));
console.log(`Есть ли символ '!' в "${str2.value}":`, str2.hasChar('!'));

console.log(`Сторока "${str1.value}" === "${str2.value}":`,SuperString.compareObj(str1, str2));
console.log(`Сторока "${str2.value}" === "${str3.value}":`,SuperString.compareObj(str2, str3));

console.log(typeof str1);
console.log(typeof str2);

str2.replaceChar('!', '.');
console.log(`После замены '!' на '.':`, str2.value);

///////////////////////////////////////////////////////////////////////////////

const stringsArray = [
    new SuperString("12 33 56 78 54543"),
    new SuperString("123 4567 89 89 93"),
    new SuperString("1111"),
    new SuperString("244 33 334"),
    new SuperString("454 354 35"),
    new SuperString("45 433 435 99 444"),
];

console.log("\n==== список строк определенной длины (17) ====");
SuperString.printByLength(stringsArray, 17);

console.log("\n==== список строк, которые содержат заданное слово (33) ====");
SuperString.printByWord(stringsArray, "33");