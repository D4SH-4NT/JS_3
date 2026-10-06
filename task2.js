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

    // Вспомогательный метод проверки наличия слова (пункт б)
    hasWord(word) {
        // Ищем слово как отдельное совпадение, без учета регистра
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(this.#value);
    }
}

///////////////////////////////////////////////////////////////////////////////

const str1 = new SuperString("abcdefghg");
const str2 = new SuperString("JavaScript!");

console.log(SuperString.getInfo());

console.log(`Длина "${str1.value}":`, str1.getLength());
console.log(`Есть ли символ '!' в "${str1.value}":`, str1.hasChar('!'));
console.log(`Есть ли символ '!' в "${str2.value}":`, str2.hasChar('!'));

console.log(`Сторока ${str1.value} === ${str2.value} :`,str1 === str2);
console.log(typeof str1);
console.log(typeof str2);

str2.replaceChar('!', '.');
console.log(`После замены '!' на '.':`, str2.value);