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

    showInfo() {
        return `[Программа] "${this.#title}" | Длительность: ${this.#duration} мин.`;
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

    showInfo() {
        return `${super.showInfo()} | Категория: Новости | Ведущий: ${this.#anchor}`;
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

    showInfo() {
        return `${super.showInfo()} | Категория: Реклама | Бренд: ${this.#brand}`;
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

    showInfo() {
        return `[Худ. фильм] ${super.showInfo()} | Бюджет: $${this.#budget.toLocaleString()}`;
    }
}

// Подкласс: Мультфильм
class Cartoon extends Movie {
    #animationTechnique; // Например: 2D, 3D, Пластилиновый

    constructor(title, duration, director, genre, animationTechnique) {
        super(title, duration, director, genre);
        this.#animationTechnique = animationTechnique;
    }

    get animationTechnique() { return this.#animationTechnique; }

    showInfo() {
        return `[Мультфильм] ${super.showInfo()} | Анимация: ${this.#animationTechnique}`;
    }
}

// ==================== Демонстрационная программа ====================

// Создание объектов режиссеров (Композиция)
const directorNolan = new Director("Кристофер Нолан", 25);
const directorMiyazaki = new Director("Хайао Миядзаки", 50);

// Создание эфирной сетки телеканала из различных программ
const tvSchedule = [
    new News("Утреннее вещание", 20, "Екатерина Андреева"),
    new Commercial("Рекламный блок", 3, "Coca-Cola"),
    new FeatureFilm("Начало", 148, directorNolan, "Научная фантастика", 160000000),
    new Cartoon("Унесенные призраками", 125, directorMiyazaki, "Аниме / Сказка", "2D Анимация"),
    new News("Вечерний выпуск", 30, "Алексей Пивоваров")
];

console.log("=== ПРОГРАММА ПЕРЕДАЧ НА СЕГОДНЯ ===\n");
tvSchedule.forEach((program, index) => {
    console.log(`${index + 1}. ${program.showInfo()}`);
});