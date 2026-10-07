/*
    1. Определить иерархию и композицию классов (в соответствии с вариантом), реализовать классы. 
        Если необходимо расширьте по своему усмотрению иерархию.
    2. Каждый класс должен иметь отражающее смысл название и информативный состав. 
        При кодировании должны быть использованы соглашения об оформлении кода code convention.
    3. Написать демонстрационную программу, в которой создаются объекты различных классов.

    Вариант 5
        Телевизионная программа, Фильм, Новости, Худ. фильм, Мультфильм, Реклама, Режиссер.
*/

// Класс Режиссер (используется для композиции)
class Director {
    #name;
    #experienceYears;

    constructor(name, experienceYears) {
        this.#name = name;
        this.#experienceYears = experienceYears;
    }

    get name() { return this.#name; }
    get experienceYears() { return this.#experienceYears; }

    getDetails() {
        return `Режиссер: ${this.#name} (Опыт: ${this.#experienceYears} лет)`;
    }
}

// Базовый класс: Телевизионная программа
class TvProgram {
    #title;
    #duration; // Длительность в минутах

    constructor(title, duration) {
        this.#title = title;
        this.#duration = duration;
    }

    get title() { return this.#title; }
    get duration() { return this.#duration; }

    getCommonInfo() {
        return `"${this.#title}" | Длительность: ${this.#duration} мин.`;
    }

    get type() {
        return "Программа";
    }

    showInfo() {
        return `[${this.type}] ${this.getCommonInfo()}`;
    }
}

// Подкласс: Новости
class News extends TvProgram {
    #anchor; // Ведущий

    constructor(title, duration, anchor) {
        super(title, duration);
        this.#anchor = anchor;
    }

    get anchor() { return this.#anchor; }

    get type() { return "Новости"; }

    showInfo() {
        return `${super.showInfo()} | Ведущий: ${this.#anchor}`;
    }
}

// Подкласс: Реклама
class Commercial extends TvProgram {
    #brand;

    constructor(title, duration, brand) {
        super(title, duration);
        this.#brand = brand;
    }

    get brand() { return this.#brand; }

    get type() { return "Реклама"; }

    showInfo() {
        return `${super.showInfo()} | Бренд: ${this.#brand}`;
    }
}

// Базовый класс для кинематографа (Композиция с Director)
class Movie extends TvProgram {
    #director; // Объект класса Director
    #genre;

    constructor(title, duration, director, genre) {
        super(title, duration);
        if (!(director instanceof Director)) {
            throw new Error("Параметр director должен быть экземпляром класса Director");
        }
        this.#director = director;
        this.#genre = genre;
    }

    get director() { return this.#director; }
    get genre() { return this.#genre; }

    get type() { return "Фильм"; }

    showInfo() {
        return `${super.showInfo()} | Жанр: ${this.#genre} | ${this.#director.getDetails()}`;
    }
}

// Подкласс: Художественный фильм
class FeatureFilm extends Movie {
    #budget;

    constructor(title, duration, director, genre, budget) {
        super(title, duration, director, genre);
        this.#budget = budget;
    }

    get budget() { return this.#budget; }

    get type() { return "Худ. фильм"; }

    showInfo() {
        return `${super.showInfo()} | Бюджет: $${this.#budget.toLocaleString()}`;
    }
}

// Подкласс: Мультфильм
class Cartoon extends Movie {
    #animationTechnique;

    constructor(title, duration, director, genre, animationTechnique) {
        super(title, duration, director, genre);
        this.#animationTechnique = animationTechnique;
    }

    get animationTechnique() { return this.#animationTechnique; }

    get type() { return "Мультфильм"; }

    showInfo() {
        return `${super.showInfo()} | Анимация: ${this.#animationTechnique}`;
    }
}

///////////////////////////////////////////////////////////////////////////////

// Создание объектов режиссеров (Композиция)
const directorNolan = new Director("Кристофер Нолан", 25);
const directorMiyazaki = new Director("Хайао Миядзаки", 50);

// Создание эфирной сетки телеканала из различных программ
const tvSchedule = [
    new News("Новости Беларуси", 20, "Евгений Пустовой"),
    new Commercial("Рекламный блок", 3, "Лидский квас"),
    new FeatureFilm("Одиссея", 172, directorNolan, "Эпическая фантастика", 250000000),
    new Cartoon("Унесенные призраками", 124, directorMiyazaki, "Аниме / Сказка", "2D Анимация"),
    new News("Панорама", 30, "Игорь Тур")
];

console.log("\n==== ПРОГРАММА ПЕРЕДАЧ НА СЕГОДНЯ ====");
tvSchedule.forEach((program, index) => {
    console.log(`${index + 1}. ${program.showInfo()}`);
});