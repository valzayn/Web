export type tTasks = {
    "question": string;
    "answer": string;
}[]

export type tQuizzes = {
    "id": number,
    "type": "M" | "S" | "C" | "MC",
    "title": string,
    "tasks": tTasks,
}[];

export const quiz: tQuizzes = [
    {
        "id": 1,
        "type": "M",
        "title": "Сопоставьте фильм и режиссёра",
        "tasks": [
            { "question": "Интерстеллар", "answer": "Кристофер Нолан" },
            { "question": "Побег из Шоушенка", "answer": "Фрэнк Дарабонт" },
            { "question": "Леон", "answer": "Люк Бессон" },
            { "question": "Титаник", "answer": "Джеймс Кэмерон" },
        ]
    },
    {
        "id": 2,
        "type": "M",
        "title": "Сопоставьте фильм и год выпуска",
        "tasks": [
            { "question": "Начало", "answer": "2010" },
            { "question": "Джентльмены", "answer": "2019" },
            { "question": "1+1", "answer": "2011" },
            { "question": "Форрест Гамп", "answer": "1994" },
        ]
    },
    {
        "id": 3,
        "type": "S",
        "title": "Расположите фильмы по убыванию рейтинга (от высокого к низкому)",
        "tasks": [
            { "question": "Побег из Шоушенка", "answer": "1" },
            { "question": "Зеленая миля", "answer": "2" },
            { "question": "Интерстеллар", "answer": "3" },
            { "question": "Леон", "answer": "4" },
        ]
    },
    {
        "id": 4,
        "type": "C",
        "title": "Какой фильм снял режиссёр Кристофер Нолан?",
        "tasks": [
            { "question": "Интерстеллар", "answer": "true" },
            { "question": "Джентльмены", "answer": "false" },
            { "question": "Леон", "answer": "false" },
            { "question": "Титаник", "answer": "false" },
        ]
    },
    {
        "id": 5,
        "type": "MC",
        "title": "Выберите фильмы режиссёра Фрэнка Дарабонта",
        "tasks": [
            { "question": "Побег из Шоушенка", "answer": "true" },
            { "question": "Зеленая миля", "answer": "true" },
            { "question": "Форрест Гамп", "answer": "false" },
            { "question": "Криминальное чтиво", "answer": "false" },
        ]
    },
    {
        "id": 6,
        "type": "C",
        "title": "В каком году вышел фильм 'Титаник'?",
        "tasks": [
            { "question": "1994", "answer": "false" },
            { "question": "1997", "answer": "true" },
            { "question": "1999", "answer": "false" },
            { "question": "2010", "answer": "false" },
        ]
    }
];