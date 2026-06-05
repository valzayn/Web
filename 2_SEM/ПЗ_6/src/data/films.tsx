export interface Film {
    id: number;
    title: string;
    description: string;
    image: string;
    borderColor?: 'pink' | 'brown' | 'blue' | 'yellow';
    imagePosition?: 'top' | 'bottom';
}

export const catalogFilms: Film[] = [
    {
        id: 1,
        title: "Интерстеллар",
        description: "Наше время на Земле подошло к концу, команда исследователей берет на себя самую важную миссию в истории человечества; путешествуя за пределами нашей галактики, чтобы узнать есть ли у человечества будущее среди звезд.",
        image: "/images/Interstellar_2014.jpg",
        borderColor: "pink",
        imagePosition: "top"
    },
    {
        id: 2,
        title: "Джентльмены",
        description: "Талантливый ум выпускник Оксфорда, применив свой уникальный ум и невиданную дерзость, придумал нелегальную схему обогащения с использованием поместья обедневшей английской аристократии.",
        image: "/images/Джентльмены.jpg",
        borderColor: "brown",
        imagePosition: "bottom"
    },
    {
        id: 3,
        title: "Синистер. Пожиратель душ",
        description: "Следователь Элизабет Гардиано и капитан национальной жандармерии Франк де Ролан прибывают в городок. Она — чтобы расследовать смерть пары, он — чтобы найти зацепки в безнадёжном деле о пропаже нескольких детей.",
        image: "/images/sinester.jpg",
        borderColor: "blue",
        imagePosition: "top"
    },
    {
        id: 4,
        title: "Разрушение",
        description: "Когда банкир Дэвис узнал, что его жена мертва, он захотел купить шоколадный батончик в торговом автомате, но тот оказался сломан. Переживая горе, Дэвис начинает крушить дом.",
        image: "/images/Разрушение_(фильм).jpg",
        borderColor: "yellow",
        imagePosition: "bottom"
    }
];

export const newsFilms: Film[] = [
    {
        id: 5,
        title: "Начало",
        description: "Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна, когда человеческий разум наиболее уязвим.",
        image: "/images/Начало.jpg",
        imagePosition: "top"
    },
    {
        id: 6,
        title: "Титаник",
        description: "В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты",
        image: "/images/Титаник.png",
        imagePosition: "top"
    },
    {
        id: 7,
        title: "Леон",
        description: "Профессиональный убийца Леон неожиданно для себя самого решает помочь 12-летней соседке Матильде, семью которой убили коррумпированные полицейские.",
        image: "/images/Léon_poster.jfif",
        imagePosition: "top"
    },
    {
        id: 8,
        title: "1+1",
        description: "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы",
        image: "/images/Intouchables.jpg",
        imagePosition: "top"
    }
];

export const galleryImages = [
    "/images/Interstellar_2014.jpg",
    "/images/Intouchables.jpg",
    "/images/Джентльмены.jpg",
    "/images/Разрушение_(фильм).jpg",
    "/images/sinester.jpg"
];