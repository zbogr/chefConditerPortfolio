window.ChefData = {
  categories: [
    {
      id: "cakes",
      emoji: "🎂",
      name: { uk: "Торти", en: "Cakes" },
      description: {
        uk: "Авторські торти для свят, весіль і особливих подій.",
        en: "Custom cakes for celebrations, weddings and special occasions.",
      },
    },
    {
      id: "cupcakes",
      emoji: "🧁",
      name: { uk: "Капкейки", en: "Cupcakes" },
      description: {
        uk: "Порційні десерти з виразним дизайном.",
        en: "Portion desserts with expressive design.",
      },
    },
    {
      id: "macarons",
      emoji: "🍬",
      name: { uk: "Макаронс", en: "Macarons" },
      description: {
        uk: "Французька класика в авторській палітрі.",
        en: "French classics in a signature palette.",
      },
    },
    {
      id: "cakesicles",
      emoji: "🍭",
      name: { uk: "Кейк-попси", en: "Cakesicles" },
      description: {
        uk: "Десерти на паличці — яскрава деталь свята.",
        en: "Desserts on a stick — a bright party detail.",
      },
    },
    {
      id: "meringue",
      emoji: "🍮",
      name: { uk: "Меренгові десерти", en: "Meringue desserts" },
      description: {
        uk: "Легкі десерти з акцентом на текстуру та подачу.",
        en: "Light desserts with a focus on texture and presentation.",
      },
    },
  ],

  dishes: [
    {
      id: "berry-cake",
      categoryId: "cakes",
      emoji: "🍰",
      image: null,
      name: { uk: "Торт «Ягідний»", en: "Berry Cake" },
      description: {
        uk: "Ніжне оформлення в пастельній палітрі та святковий настрій.",
        en: "Delicate pastel styling and a festive mood.",
      },
      weight: "2.5 кг",
    },
    {
      id: "chocolate-cake",
      categoryId: "cakes",
      emoji: "🍫",
      image: null,
      name: { uk: "Торт «Шоколадний трюфель»", en: "Chocolate Truffle Cake" },
      description: {
        uk: "Стримана елегантність і глибокий характер — для поціновувачів класики.",
        en: "Restrained elegance and deep character for lovers of the classics.",
      },
      weight: "2.8 кг",
    },
    {
      id: "honey-cake",
      categoryId: "cakes",
      emoji: "🍯",
      image: null,
      name: { uk: "Медовик", en: "Honey Cake" },
      description: {
        uk: "Тепла домашня класика в сучасному авторському виконанні.",
        en: "Warm home classics in a modern signature take.",
      },
      weight: "2.2 кг",
    },
    {
      id: "vanilla-cupcake",
      categoryId: "cupcakes",
      emoji: "🧁",
      image: null,
      name: { uk: "Ванільний капкейк", en: "Vanilla Cupcake" },
      description: {
        uk: "Порційний десерт із чистим мінімалістичним декором.",
        en: "A portion dessert with clean minimalist decor.",
      },
      weight: "120 г",
    },
    {
      id: "red-velvet-cupcake",
      categoryId: "cupcakes",
      emoji: "❤️",
      image: null,
      name: { uk: "Капкейк «Червоний оксамит»", en: "Red Velvet Cupcake" },
      description: {
        uk: "Яскравий акцент для святкового столу та фотозон.",
        en: "A vivid accent for festive tables and photo zones.",
      },
      weight: "130 г",
    },
    {
      id: "macaron-set",
      categoryId: "macarons",
      emoji: "🎁",
      image: null,
      name: { uk: "Набір макаронс (12 шт)", en: "Macaron set (12 pcs)" },
      description: {
        uk: "Асорті у подарунковій коробці — стильний комплімент.",
        en: "An assortment in a gift box — a stylish compliment.",
      },
      weight: "240 г",
    },
    {
      id: "pistachio-macaron",
      categoryId: "macarons",
      emoji: "🥜",
      image: null,
      name: { uk: "Макаронс фісташка", en: "Pistachio Macaron" },
      description: {
        uk: "Делікатний міні-десерт у фірмовій палітрі.",
        en: "A delicate mini dessert in the signature palette.",
      },
      weight: "20 г",
    },
    {
      id: "cakesicle-set",
      categoryId: "cakesicles",
      emoji: "🍭",
      image: null,
      name: { uk: "Кейк-попси (6 шт)", en: "Cakesicles (6 pcs)" },
      description: {
        uk: "Десерти на паличці — зручний формат для фуршетів.",
        en: "Desserts on a stick — a convenient format for buffets.",
      },
      weight: "300 г",
    },
    {
      id: "cakesicle-bear",
      categoryId: "cakesicles",
      emoji: "🐻",
      image: null,
      name: { uk: "Кейк-поп «Ведмедик»", en: "Bear Cakesicle" },
      description: {
        uk: "Фігурне оформлення для дитячих свят.",
        en: "Shaped styling for kids' parties.",
      },
      weight: "60 г",
    },
    {
      id: "meringue-roll",
      categoryId: "meringue",
      emoji: "🍥",
      image: null,
      name: { uk: "Меренговий рулет", en: "Meringue Roll" },
      description: {
        uk: "Легка текстура та виразний святковий декор.",
        en: "Light texture with expressive festive decor.",
      },
      weight: "700 г",
    },
    {
      id: "meringue-kisses",
      categoryId: "meringue",
      emoji: "💗",
      image: null,
      name: { uk: "Меренгові «поцілунки»", en: "Meringue Kisses" },
      description: {
        uk: "Акуратна подача у подарунковій упаковці.",
        en: "Neat presentation in gift packaging.",
      },
      weight: "250 г",
    },
    {
      id: "pavlova",
      categoryId: "meringue",
      emoji: "🍓",
      image: null,
      name: { uk: "Павлова", en: "Pavlova" },
      description: {
        uk: "Ефектна подача з акцентом на контраст текстур.",
        en: "A striking presentation focused on contrasting textures.",
      },
      weight: "800 г",
    },
  ],

  certificates: [
    {
      id: "cert-1",
      emoji: "🏅",
      image: null,
      title: { uk: "Базовий курс кондитера", en: "Basic Pastry Course" },
      organization: { uk: "Школа кондитерів «Sweet Art»", en: "«Sweet Art» Pastry School" },
      year: 2021,
      description: {
        uk: "Основи кондитерської справи та професійна база.",
        en: "Fundamentals of pastry and a professional foundation.",
      },
    },
    {
      id: "cert-2",
      emoji: "🎨",
      image: null,
      title: { uk: "Сучасне оздоблення тортів", en: "Modern Cake Decorating" },
      organization: { uk: "Кулінарна студія «Sugar Lab»", en: "«Sugar Lab» Culinary Studio" },
      year: 2022,
      description: {
        uk: "Тренди декору, квіти з крему та велюрове покриття.",
        en: "Decor trends, cream flowers and velvet coating.",
      },
    },
    {
      id: "cert-3",
      emoji: "🇫🇷",
      image: null,
      title: { uk: "Французька кондитерська", en: "French Pastry" },
      organization: { uk: "Le Cordon Bleu (онлайн)", en: "Le Cordon Bleu (online)" },
      year: 2023,
      description: {
        uk: "Класичні французькі техніки та десерти.",
        en: "Classic French techniques and desserts.",
      },
    },
    {
      id: "cert-4",
      emoji: "✅",
      image: null,
      title: { uk: "Харчова безпека та гігієна", en: "Food Safety & Hygiene" },
      organization: { uk: "HACCP Ukraine", en: "HACCP Ukraine" },
      year: 2024,
      description: {
        uk: "Стандарти безпеки харчової продукції на виробництві.",
        en: "Food safety standards in production.",
      },
    },
  ],

  contactInfo: {
    name: "Олена Ковальчук",
    role: { uk: "Шеф-кондитер", en: "Pastry Chef" },
    phone: "+380 67 123 45 67",
    email: "hello@chef-portfolio.ua",
    city: { uk: "Київ, Україна", en: "Kyiv, Ukraine" },
    workHours: { uk: "Пн–Сб, 9:00–18:00", en: "Mon–Sat, 9:00–18:00" },
    socials: [
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "Telegram", url: "https://t.me/" },
      { label: "Facebook", url: "https://facebook.com/" },
      { label: "WhatsApp", url: "https://wa.me/380671234567" },
    ],
  },
};

window.ChefData.getCategoryById = function (id) {
  return window.ChefData.categories.find(function (category) {
    return category.id === id;
  });
};

window.ChefData.getDishesByCategory = function (categoryId) {
  return window.ChefData.dishes.filter(function (dish) {
    return dish.categoryId === categoryId;
  });
};
