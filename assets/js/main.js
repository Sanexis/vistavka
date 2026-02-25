const DESIGN_WIDTH_REM = 67.5;
const DESIGN_HEIGHT_REM = 120;
const BASE_FONT_SIZE_PX = 16;
const MAX_BG_SHIFT_PERCENT = 14;
const CONTENT_FADE_MS = 670;
const CONTENT_FADE_CLOSE_MS = 335;
const BUTTON_SOUND_SRC = "assets/sound/sound.mp3";
const DETAIL_CORNER_LOGO_SRC = "assets/images/company-logo.svg";
const SWIPER_SLIDES_PER_VIEW = 1.34;
const SWIPER_SPACE_BETWEEN = 56;
const SWIPER_COVERFLOW_ROTATE = 24;
const SWIPER_COVERFLOW_DEPTH = 96;
const SWIPER_EXPANDED_SLIDES_PER_VIEW = 1;
const SWIPER_EXPANDED_SPACE_BETWEEN = 0;
const SWIPER_EXPANDED_COVERFLOW_ROTATE = 0;
const SWIPER_EXPANDED_COVERFLOW_DEPTH = 0;
const BROVAR_SLIDE_ID = "4";
const cardMarkupCache = new Map();

let isBrovarAgeConfirmed = false;
let openBrovarAgeModal = null;

function syncModalBodyState() {
  const hasOpenModal = Boolean(
    document.querySelector(".contact-modal.is-open, .age-modal.is-open"),
  );
  document.body.classList.toggle("is-contact-modal-open", hasOpenModal);
}

const BROVAR_PRODUCTS_BY_CATEGORY = {
  beer: [
    {
      title: "Николаевское",
      image: "assets/images/brovar/Пиво Бровар/Николаевское.jpg",
      meta: "Алкоголь 4,5% | Плотность 11%",
      description:
        "Светлое пиво соломенного цвета, во вкусе небольшая солодовая сладость и хмелевая горчинка. Аромат мягкий, цветочный, пряный от благородного европейского хмеля. Пена белая стойкая. Сроки хранения: 365 д - 0,5 л ст/бут; 120 д - 1,5 л ПЭТ; 30 д - 30 л кег мет и ПЭТ; 30 д - 50 л кег мет.",
    },
    {
      title: "Губернское",
      image: "assets/images/brovar/Пиво Бровар/Губернское.jpg",
      meta: "Алкоголь 4,8% | Плотность 12%",
      description:
        "Светлое пиво с мягким солодовым вкусом, деликатной горчинкой и пряным ароматом благородного хмеля Хеллертау. Цвет янтарный, опалесцентный. Пена густая, белая. Сроки хранения: 365 д - 0,5 л ст/бут; 120 д - 1,5 л ПЭТ; 30 д - 30 л кег мет и ПЭТ; 30 д - 50 л кег мет.",
    },
    {
      title: "Темное золото",
      image: "assets/images/brovar/Пиво Бровар/Темное золото.jpg",
      meta: "Алкоголь 4,8% | Плотность 12%",
      description:
        "Темный лагер с насыщенным вкусом карамельного и мюнхенского солода, с заметной хмелевой горечью. В аромате присутствуют нотки шоколада и ириса. Пена плотная, кремовая. Сроки хранения: 365 д - 0,5 л ст/бут; 120 д - 1,5 л ПЭТ; 30 д - 30 л кег мет и ПЭТ; 30 д - 50 л кег мет.",
    },
    {
      title: "Жигулевское",
      image: "assets/images/brovar/Пиво Бровар/Жигулевское.jpg",
      meta: "Алкоголь 4,5% | Плотность 11%",
      description:
        "Светлое пиво с освежающим вкусом, легким ароматом хмеля и приятной горечью, переходящей в продолжительное мягкое послевкусие. Сроки хранения: 365 д - 0,5 л ст/бут; 120 д - 1,5 л ПЭТ; 30 д - 30 л кег мет и ПЭТ; 30 д - 50 л кег мет.",
    },
    {
      title: "Urstein Premium",
      image: "assets/images/brovar/Пиво Бровар/Urstine Premium.jpg",
      meta: "Алкоголь 4,8% | Плотность 12%",
      description:
        "Светлый немецкий лагер желто-соломенного цвета. Вкус солодовый с заметной горечью хмеля Магнум. Аромат пряный, хмелевой, солодовый. Пена плотная, стойкая, белая. Сроки хранения: 365 д - 0,5 л ст/бут; 120 д - 1,5 л ПЭТ; 30 д - 30 л кег мет и ПЭТ; 30 д - 50 л кег мет.",
    },
    {
      title: "Urstein Dunkel",
      image: "assets/images/brovar/Пиво Бровар/Urstine Dunkel.jpg",
      meta: "Алкоголь 4,8% | Плотность 12%",
      description:
        "Темный лагер с насыщенным солодовым вкусом карамельного и мюнхенского солода, с хмелевой горечью. В аромате заметна солодовая составляющая, нотки шоколада и ириски. Пена плотная, кремовая. Сроки хранения: 365 д - 0,5 л ст/бут; 120 д - 1,5 л ПЭТ; 30 д - 30 л кег мет и ПЭТ; 30 д - 50 л кег мет.",
    },
  ],
  "craft-beer": [
    {
      title: "RED IPA",
      image: "assets/images/brovar/пиво квадрат/red IPA.jpg",
      meta: "Алкоголь 6,5% | Плотность 14.5% | IBU 50",
      description:
        "Горький американский эль характерного бронзового цвета. Нефильтрованная версия чуть опалесцентная. Пена плотная, белая. Карбонизация умеренная. Вкус солодовый, карамельный, с заметной хмелевой горчинкой. Аромат хмелевой, хвойный, напоминает молодые побеги лиственницы. Послевкусие терпкое, чуть карамельное, хмелевое.",
    },
    {
      title: "SAISON",
      image: "assets/images/brovar/пиво квадрат/saiason.jpg",
      meta: "Алкоголь 4.7% | Плотность 13% | IBU 20",
      description:
        "Американский светлый эль, легкий и питкий, с ярким ароматом тропических фруктов и приятной горчинкой. Цвет янтарный, опалесцентный. Сварен на солоде пейл. Пиво охмелено американскими сортами хмеля.",
    },
    {
      title: "BALTIC PORTER",
      image: "assets/images/brovar/пиво квадрат/baltic porter.jpg",
      meta: "Алкоголь 6.9% | Плотность 19.5% | IBU 50",
      description:
        "Темное плотное пиво со стойкой кремовой пеной. Цвет темно-коричневый, густой, непрозрачный. Аромат чуть спиртовой, солодовый, карамельный. Вкус мощный солодовый, сладковатый. Тело округлое, плотное. Послевкусие терпкое, хмелевое, согревающее.",
    },
    {
      title: "Kellerbier",
      image: "assets/images/brovar/пиво квадрат/kellerbier.jpg",
      meta: "Алкоголь 4.8% | Плотность 12% | IBU 20",
      description:
        "Баварское подвальное пиво с мягким солодовым вкусом, деликатной горчинкой и пряным ароматом благородного хмеля Магнум и Хеллертау. В аромате и вкусе есть нотки дуба от добавленной на брожение щепы. Цвет янтарный, опалесцентный. Пена густая, белая. Карбонизация умеренная.",
    },
    {
      title: "BARLEYWINE",
      image: "assets/images/brovar/пиво квадрат/barleywine.jpg",
      meta: "Алкоголь 8% | Плотность 22% | IBU 40",
      description:
        "Американское ячменное вино - это плотное, солодовое, алкогольное пиво с преобладанием светлых сортов солода и заметной долей карамельных. Вкус насыщенный, с ощутимой горечью. Аромат винный, солодовый. Цвет глубокий, бронзовый.",
    },
    {
      title: "MILK IPA",
      image: "assets/images/brovar/пиво квадрат/milk ipa.jpg",
      meta: "Алкоголь 6% | Плотность 17% | IBU 40",
      description:
        "Американский светлый эль характерного бронзового цвета. Пена плотная, белая. Вкус карамельный с лактозной сладостью и заметной хмелевой горчинкой. Аромат спелых тропических фруктов.",
    },
    {
      title: "ХАБ 17",
      image: "assets/images/brovar/пиво квадрат/ХАБ 17.jpg",
      meta: "Алкоголь 5,2% | Плотность 16% | IBU 40",
      description:
        "Американский янтарный эль с гречишным солодом, солод карамельный, солод пшеничный, хмель. Коллаборация 18-ти пивоварен России, Украины и Белоруссии в рамках акции \"Пивовары вне политики\".",
    },
  ],
  "craft-distillate": [
    {
      title: "BORTNIK Пшеничный",
      image: "assets/images/brovar/BORTNIK/пшеничный.jpg",
      meta: "Виски",
      description:
        "Натуральный напиток с ароматом хлеба, богатым бархатным вкусом с зерновыми нотками и тонким послевкусием.",
    },
    {
      title: "BORTNIK Ржаной",
      image: "assets/images/brovar/BORTNIK/Ржаной.jpg",
      meta: "Виски",
      description:
        "Натуральный напиток с ароматом корочки ржаного хлеба, пряностей и карамели, богатым бархатным вкусом с зерновыми нотками и тонким послевкусием.",
    },
    {
      title: "BORTNIK Ячменный",
      image: "assets/images/brovar/BORTNIK/ячменный.jpg",
      meta: "Виски",
      description:
        "Напиток, произведенный из отборного ячменя и солода с деликатным хлебным вкусом и многогранным послевкусием.",
    },
    {
      title: "BORTNIK WHITE WHISKEY",
      image: "assets/images/brovar/BORTNIK/Виски.jpg",
      meta: "Виски",
      description:
        "Дистиллят, произведенный по традиционной технологии методом тройной перегонки в медном кубе с добавлением натурального меда. Обладает нежным, богатым, насыщенным хлебным вкусом с приятным медовым послевкусием.",
    },
  ],
};

const GATOR_PRODUCTS_BY_CATEGORY = {
  boots: [
    {
      title: "GATOR Ranger",
      image: "assets/images/gator-tactical.jpg",
      meta: "Ботинки",
      description:
        "Демонстрационная карточка: высокие ботинки для полевых и охотничьих условий.",
    },
    {
      title: "GATOR Hunter Pro",
      image: "assets/images/gator.png",
      meta: "Ботинки",
      description:
        "Демонстрационная карточка: усиленная модель для длительных выходов.",
    },
  ],
  "low-boots": [
    {
      title: "GATOR Trail Low",
      image: "assets/images/gator-tactical.jpg",
      meta: "Полуботинки",
      description:
        "Демонстрационная карточка: облегченные полуботинки для активного движения.",
    },
  ],
  eva: [
    {
      title: "GATOR EVA Classic",
      image: "assets/images/gator.png",
      meta: "Обувь из ЭВА",
      description:
        "Демонстрационная карточка: легкая EVA-модель для сырой местности.",
    },
    {
      title: "GATOR EVA Thermo",
      image: "assets/images/gator-tactical.jpg",
      meta: "Обувь из ЭВА",
      description:
        "Демонстрационная карточка: утепленная EVA-обувь для холодной погоды.",
    },
  ],
  clothing: [
    {
      title: "GATOR Softshell",
      image: "assets/images/gator-tactical.jpg",
      meta: "Одежда",
      description:
        "Демонстрационная карточка: функциональная одежда для активного отдыха.",
    },
  ],
  gear: [
    {
      title: "GATOR Field Kit",
      image: "assets/images/gator.png",
      meta: "Снаряжение",
      description:
        "Демонстрационная карточка: набор базового снаряжения для выезда.",
    },
    {
      title: "GATOR Outdoor Set",
      image: "assets/images/gator-tactical.jpg",
      meta: "Снаряжение",
      description:
        "Демонстрационная карточка: комплект аксессуаров для охоты и рыбалки.",
    },
  ],
  bags: [
    {
      title: "GATOR Utility Bag",
      image: "assets/images/gator.png",
      meta: "Сумки и аксессуары",
      description:
        "Демонстрационная карточка: сумка для хранения снаряжения.",
    },
  ],
};

const OHOTA_PRODUCTS_BY_CATEGORY = {
  services: [
    {
      title: "Организация Коллективной охоты",
      image: "assets/images/palyunichy-photo.jpg",
      meta: "Услуги",
      description:
        "Возможность почувствовать настоящий азарт охоты без лишних хлопот. Наше хозяйство берет на себя всю организацию: подбор угодий, подготовку маршрутов, работу егерей, расстановку номеров и обеспечение безопасности. Вам остается только наслаждаться процессом и атмосферой единства, а каждый трофей становится общей победой. Коллективная охота - идеальный формат для тех, кто ценит комфорт, профессиональный подход и яркие эмоции, которые остаются в памяти надолго.",
    },
    {
      title: "Организация Индивидуальной охоты",
      image: "assets/images/lake-douhae-in-belarus.webp",
      meta: "Услуги",
      description:
        "Формат для тех, кто ищет не просто трофей, а личное переживание, где каждый шаг продуман под ваши цели. Егерь подбирает маршрут с учетом поведения зверя, времени суток и особенностей местности, чтобы вы оказались в самой перспективной точке. Тишина леса, возможность двигаться своим темпом и полное погружение в природный ритм делают такую охоту особенно насыщенной. Это выбор охотника, который ценит свободу, точность и ощущение, что весь лес работает именно на его результат.",
    },
    {
      title: "Активный отдых",
      image: "assets/images/ohota.png",
      meta: "Услуги",
      description:
        "Активный отдых в охотхозяйстве - это возможность почувствовать Беларусь по-настоящему живой. Квадроциклы для тех, кто любит скорость и бездорожье. Катера и гидроциклы - для тех, кто выбирает свободу воды и ветер в лицо. Велосипеды и лыжи открывают спокойные маршруты через леса и поля, где можно раствориться в природе. А джипы позволяют пройти самые сложные трассы и увидеть угодья с нового ракурса. Здесь каждый найдет свой формат приключения - от тихого созерцания до настоящего адреналина.",
    },
    {
      title: "Рыбалка",
      image: "assets/images/lake-douhae-in-belarus.webp",
      meta: "Услуги",
      description:
        "Это возможность провести время в гармонии с природой и почувствовать настоящий вкус отдыха. Кроме обычных видов рыбалки мы предлагаем для гостей собственный водоем, где водятся крупный карп и мощный толстолобик - идеальные трофеи для тех, кто любит уверенную борьбу на удочке. Чистые берега, удобные места для ловли и помощь егерей создают комфортные условия для всех. Здесь каждый улов становится не просто результатом, а частью спокойного, размеренного удовольствия, за которым хочется возвращаться.",
    },
    {
      title: "Домик охотника и Баня",
      image: "assets/images/palyunichy-photo.jpg",
      meta: "Услуги",
      description:
        "Пространство, где отдых становится полноценным. После активного дня можно погрузиться в жар бани, довериться профессиональным банщикам и снять напряжение с помощью массажа от профессиональных мастеров. На территории есть все для спокойного и веселого досуга. Уютный домик создает атмосферу тепла и уединения, где приятно провести вечер в компании друзей или семьи. Здесь заботятся о том, чтобы каждый гость чувствовал себя по-настоящему восстановленным.",
    },
  ],
};

const OHHO_PRODUCTS_BY_CATEGORY = {
  modules: [
    {
      title: "Объекты и территории",
      image: "assets/images/ohho/1.png",
      meta: "Модуль системы",
      description:
        "Этот раздел превращает карту охотхозяйства в живую, постоянно обновляемую цифровую модель. Все ключевые объекты: солончаки, кормушки, вышки, охотничьи домики, камеры, а также участки егерей, зоны охоты и запретные территории собраны в единой системе и доступны в удобном списке и на интерактивной карте.",
    },
    {
      title: "Учет добычи и мясной продукции",
      image: "assets/images/ohho/2.png",
      meta: "Модуль системы",
      description:
        "Данный раздел позволяет сделать процесс учета добычи четким, структурированным и полностью цифровым в системе. Каждая единица добытой продукции фиксируется с детализацией по видам, категориям мяса и объемам, что создает полную картину движения ресурсов внутри хозяйства.",
    },
    {
      title: "Складской учет ТМЦ",
      image: "assets/images/ohho/3.png",
      meta: "Модуль системы",
      description:
        "Складской учет создает прозрачную и удобную систему учета всех товарно материальных ценностей, используемых в охотхозяйстве. От топлива и инструментов до строительных материалов, кормов и оборудования — все фиксируется, хранится и отслеживается в одном месте.",
    },
    {
      title: "Задачи и уведомления",
      image: "assets/images/ohho/4.png",
      meta: "Модуль системы",
      description:
        "Раздел превращает планирование работ в охотхозяйстве в четкий, прозрачный и управляемый процесс. Все задачи распределяются между сотрудниками через удобный планировщик, а система уведомлений гарантирует, что ни одно важное действие не будет пропущено.",
    },
    {
      title: "Учет клиентов охотхозяйства",
      image: "assets/images/ohho/5.png",
      meta: "Модуль системы",
      description:
        "Этот раздел превращает работу с клиентами охотхозяйства в удобную, структурированную и полностью прозрачную систему. Все данные о каждом охотнике собраны в одном месте, начиная от документов и разрешений до истории его охот и добычи. Единая база всех клиентов и их история в одном месте вместе с их добычей, оружием и разрешениями.",
    },
    {
      title: "Фото - Видео контроль животных",
      image: "assets/images/ohho/6.png",
      meta: "Модуль системы",
      description:
        "Функционал сервиса превращает фото, потоковое видео с камер и фотоловушек в полноценный инструмент мониторинга животных дикой природы. Все материалы автоматически попадают в систему и привязываются к конкретным объектам охотхозяйства, создавая живую картину происходящего на территории. А искусственный интеллект определяет виды животных и подсчитывает поголовье.",
    },
    {
      title: "Борьба с браконьерами",
      image: "assets/images/ohho/7.png",
      meta: "Модуль системы",
      description:
          "Инструменты искусственного интеллекта, позволяют по фото и видео определить автомобиль и его государственный номер, сверить его с существующей базой и определить потенциального нарушителя и его маршрут передвижений, а также вести историю учета нарушений по данному автомобилю.",
    },
    {
      title: "Мобильное приложение с оффлайн режимом",
      image: "assets/images/ohho/8.jpg",
      meta: "Модуль системы",
      description:
        "Отдельное мобильное приложение превращает смартфон егеря или сотрудника в полноценный рабочий инструмент, который не зависит от наличия интернета. Все ключевые функции системы доступны в лесу, на маршруте и в самых удаленных уголках охотхозяйства с автоматической синхронизацией при появлении интернета.",
    },
  ],
};

function buildBrovarItemMarkup(item) {
  const imageSrc = encodeURI(item.image);

  return `
    <div class="item">
      <img src="${imageSrc}" alt="${item.title}">
      <div class="item-content">
        <div class="title-block">
          <div class="title">${item.title}</div>
          <div class="more-info">${item.meta}</div>
        </div>
        <div class="description-block">${item.description}</div>
        <button class="call-button" type="button">Связаться с поставщиком</button>
      </div>
    </div>
  `;
}

function initContactModal() {
  const contactModal = document.querySelector("#contact-modal");
  if (!contactModal) return;

  const setContactOpen = (open) => {
    contactModal.classList.toggle("is-open", open);
    contactModal.setAttribute("aria-hidden", String(!open));
    syncModalBodyState();
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest("[data-modal-close='contact']")) {
      setContactOpen(false);
      return;
    }

    const supplierButton = target.closest(".items-list .call-button");
    if (!supplierButton) return;

    setContactOpen(true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!contactModal.classList.contains("is-open")) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    setContactOpen(false);
  });
}

function initAgeModal() {
  const ageModal = document.querySelector("#age-modal");
  if (!ageModal) return;

  let onConfirm = null;

  const setAgeOpen = (open) => {
    ageModal.classList.toggle("is-open", open);
    ageModal.setAttribute("aria-hidden", String(!open));
    if (!open) {
      onConfirm = null;
    }
    syncModalBodyState();
  };

  openBrovarAgeModal = (confirmHandler) => {
    onConfirm = typeof confirmHandler === "function" ? confirmHandler : null;
    setAgeOpen(true);
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest("[data-modal-close='age']")) {
      setAgeOpen(false);
      return;
    }

    if (target.closest("[data-age-confirm]")) {
      isBrovarAgeConfirmed = true;
      const confirmHandler = onConfirm;
      setAgeOpen(false);
      confirmHandler?.();
      return;
    }

    if (target.closest("[data-age-decline]")) {
      setAgeOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!ageModal.classList.contains("is-open")) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    setAgeOpen(false);
  });
}

function createBrovarScrollbarSync(list, track, thumb) {
  if (!list || !track || !thumb) {
    return () => {};
  }

  let frameId = 0;

  const update = () => {
    const viewportHeight = list.clientHeight;
    const contentHeight = list.scrollHeight;
    const maxScrollTop = Math.max(contentHeight - viewportHeight, 0);

    if (maxScrollTop <= 0 || viewportHeight <= 0) {
      track.classList.add("is-hidden");
      thumb.style.height = "0px";
      thumb.style.transform = "translateY(0px)";
      return;
    }

    track.classList.remove("is-hidden");

    const minThumbHeight = 42;
    const thumbHeight = Math.max(
      (viewportHeight * viewportHeight) / contentHeight,
      minThumbHeight,
    );
    const available = Math.max(viewportHeight - thumbHeight, 0);
    const progress = list.scrollTop / maxScrollTop;
    const offset = available * progress;

    thumb.style.height = `${thumbHeight.toFixed(2)}px`;
    thumb.style.transform = `translateY(${offset.toFixed(2)}px)`;
  };

  const schedule = () => {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(update);
  };

  return schedule;
}

function initItemsListScrollbar(detail) {
  const list = detail?.querySelector(".items-list");
  const scrollbarTrack = detail?.querySelector(".items-scrollbar");
  const scrollbarThumb = detail?.querySelector(".items-scrollbar__thumb");

  if (!list || !scrollbarTrack || !scrollbarThumb) return null;

  const scheduleScrollbarUpdate = createBrovarScrollbarSync(
    list,
    scrollbarTrack,
    scrollbarThumb,
  );

  list.addEventListener("scroll", scheduleScrollbarUpdate, { passive: true });

  return {
    list,
    scheduleScrollbarUpdate,
  };
}

function initSelectableCatalog(detail, productsByCategory, choiceSelector) {
  if (!detail) return;

  const choices = Array.from(detail.querySelectorAll(choiceSelector));
  const scrollbarState = initItemsListScrollbar(detail);

  if (!scrollbarState || !choices.length) return;

  const { list, scheduleScrollbarUpdate } = scrollbarState;
  const fallbackCategory = Object.keys(productsByCategory)[0];
  if (!fallbackCategory) return;

  const renderCategory = (rawCategory) => {
    const category = productsByCategory[rawCategory]
      ? rawCategory
      : fallbackCategory;
    const items = productsByCategory[category];

    choices.forEach((choice) => {
      choice.classList.toggle("is-active", choice.dataset.category === category);
    });

    list.innerHTML = items.map((item) => buildBrovarItemMarkup(item)).join("");
    list.scrollTop = 0;
    scheduleScrollbarUpdate();
  };

  const onChoiceSelect = (choice) => {
    if (!choice) return;
    renderCategory(choice.dataset.category);
  };

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      onChoiceSelect(choice);
    });

    choice.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      onChoiceSelect(choice);
    });
  });

  const initiallyActive =
    detail.querySelector(`${choiceSelector}.is-active`)?.dataset.category ||
    fallbackCategory;

  renderCategory(initiallyActive);
  scheduleScrollbarUpdate();
}

function initBrovarCatalog(slide) {
  const detail = slide?.querySelector(".card-detail--brovar");
  if (!detail) return;

  initSelectableCatalog(
    detail,
    BROVAR_PRODUCTS_BY_CATEGORY,
    ".triple-select .choice[data-category]",
  );
}

function initStaticCategoryCatalog(
  slide,
  selector,
  productsByCategory = BROVAR_PRODUCTS_BY_CATEGORY,
) {
  const detail = slide?.querySelector(selector);
  if (!detail) return;

  const scrollbarState = initItemsListScrollbar(detail);
  if (!scrollbarState) return;

  const { list, scheduleScrollbarUpdate } = scrollbarState;
  const fallbackCategory = Object.keys(productsByCategory)[0];
  if (!fallbackCategory) return;

  const requestedCategory = list.dataset.staticCategory || fallbackCategory;
  const category = productsByCategory[requestedCategory]
    ? requestedCategory
    : fallbackCategory;
  const items = productsByCategory[category];

  list.innerHTML = items.map((item) => buildBrovarItemMarkup(item)).join("");
  list.scrollTop = 0;
  scheduleScrollbarUpdate();
}

function initOhotaCatalog(slide) {
  initStaticCategoryCatalog(slide, ".card-detail--ohota", OHOTA_PRODUCTS_BY_CATEGORY);
}

function initOhhoCatalog(slide) {
  initStaticCategoryCatalog(slide, ".card-detail--ohho", OHHO_PRODUCTS_BY_CATEGORY);
}

function initGatorCatalog(slide) {
  const detail = slide?.querySelector(".card-detail--gator");
  if (!detail) return;

  initSelectableCatalog(
    detail,
    GATOR_PRODUCTS_BY_CATEGORY,
    ".gator-select .choice[data-category]",
  );
}

function initButtonSound() {
  const baseAudio = new Audio(BUTTON_SOUND_SRC);
  baseAudio.preload = "auto";

  const isButtonTarget = (target) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest("button, [role='button']"));
  };

  const playSound = () => {
    const audio = baseAudio.cloneNode();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  document.addEventListener("click", (event) => {
    if (!isButtonTarget(event.target)) return;
    playSound();
  });

  document.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!isButtonTarget(event.target)) return;
    playSound();
  });
}

function muteBackgroundVideos() {
  document.querySelectorAll(".viewport-video, .stage-bg").forEach((video) => {
    if (!(video instanceof HTMLMediaElement)) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
  });
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function injectDetailCornerLogo(slide, id) {
  if (!slide || !id) return;

  const existing = slide.querySelector(".slide-corner-logo");
  if (existing) {
    existing.setAttribute("src", DETAIL_CORNER_LOGO_SRC);
    return;
  }

  const logo = document.createElement("img");
  logo.className = "slide-corner-logo";
  logo.src = DETAIL_CORNER_LOGO_SRC;
  logo.alt = "Логотип компании";
  slide.append(logo);
}

function ensureSlideCornerBack(slide) {
  if (!slide) return;
  if (slide.querySelector(".slide-corner-back")) return;

  const back = document.createElement("button");
  back.className = "slide-corner-back";
  back.type = "button";
  back.setAttribute("aria-label", "Назад");
  slide.append(back);
}

function removeSlideCornerControls(slide) {
  if (!slide) return;
  slide.querySelector(".slide-corner-logo")?.remove();
  slide.querySelector(".slide-corner-back")?.remove();
}

function updateStageScale() {
  const designWidthPx = DESIGN_WIDTH_REM * BASE_FONT_SIZE_PX;
  const designHeightPx = DESIGN_HEIGHT_REM * BASE_FONT_SIZE_PX;

  const scale = Math.min(
    window.innerWidth / designWidthPx,
    window.innerHeight / designHeightPx,
  );

  const nextRootFontSize = Math.max(scale * BASE_FONT_SIZE_PX, 1);
  document.documentElement.style.fontSize = `${nextRootFontSize.toFixed(4)}px`;
}

function initSwiper() {
  const setBackgroundShift = (progressValue) => {
    const safeProgress = Math.min(Math.max(progressValue, 0), 1);
    const shift = -(safeProgress * MAX_BG_SHIFT_PERCENT);

    document.documentElement.style.setProperty(
      "--bg-shift",
      `${shift.toFixed(3)}%`,
    );
  };

  return new Swiper(".expo-swiper", {
    loop: false,
    rewind: false,
    speed: 950,
    touchStartPreventDefault: false,
    effect: "coverflow",
    slidesPerView: SWIPER_SLIDES_PER_VIEW,
    spaceBetween: SWIPER_SPACE_BETWEEN,
    centeredSlides: true,
    grabCursor: true,
    coverflowEffect: {
      rotate: SWIPER_COVERFLOW_ROTATE,
      slideShadows: false,
      stretch: 0,
      depth: SWIPER_COVERFLOW_DEPTH,
      modifier: 1,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      init(swiper) {
        setBackgroundShift(swiper.progress);
      },
      setTranslate(swiper) {
        setBackgroundShift(swiper.progress);
      },
    },
  });
}

function initIntro(swiper) {
  const intro = document.querySelector(".intro-screen");
  if (!intro) return;

  const IDLE_TIMEOUT_MS = 15000;
  const IDLE_TIMEOUT_EXPANDED_MS = 60000;
  let idleTimer = null;
  let hasEnteredSwiper = false;

  const reveal = () => {
    document.body.classList.add("is-revealed");
    hasEnteredSwiper = true;
  };

  const hide = () => {
    const expandedBackButtons = document.querySelectorAll(
      ".swiper-slide.is-slide-expanded .card-detail__back",
    );

    expandedBackButtons.forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.click();
      }
    });

    if (hasEnteredSwiper) {
      document.body.classList.add("is-revealed");
    } else {
      document.body.classList.remove("is-revealed");
    }

    if (swiper) {
      swiper.slideTo(0, 0);
    }
  };

  const resetIdleTimer = () => {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }

    const hasExpandedSlide = Boolean(
      document.querySelector(
        ".swiper-slide.is-slide-expanded, .swiper-slide.is-slide-collapsing",
      ),
    );

    const idleTimeout = hasExpandedSlide
      ? IDLE_TIMEOUT_EXPANDED_MS
      : IDLE_TIMEOUT_MS;

    idleTimer = setTimeout(() => {
      hide();
    }, idleTimeout);
  };

  const startInteraction = () => {
    reveal();
    resetIdleTimer();
  };

  intro.addEventListener("click", startInteraction);
  intro.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startInteraction();
    }
  });

  ["click", "pointerdown", "pointermove", "touchstart", "keydown"].forEach(
    (eventName) => {
      document.addEventListener(eventName, resetIdleTimer, { passive: true });
    },
  );
}

async function getMarkup(path, fallbackHtml) {
  if (cardMarkupCache.has(path)) {
    return cardMarkupCache.get(path);
  }

  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error("Fetch failed");
    const html = await response.text();
    cardMarkupCache.set(path, html);
    return html;
  } catch (error) {
    return fallbackHtml;
  }
}

async function renderCardState(slide, state, options = {}) {
  const { fadeOut = true, fadeIn = true } = options;

  const card = slide?.querySelector(".feature-card");
  const id = slide?.dataset?.id;

  if (!card || !id) return;

  const isDetail = state === "detail";
  const path = isDetail
    ? `assets/data/slide-${id}.html`
    : `assets/data/preview-${id}.html`;

  const fallback = isDetail
    ? "<div class=\"card-detail\"><h3>Нет данных</h3><p>Контент временно недоступен.</p></div>"
    : "<h2>Нет данных</h2><p>Контент недоступен.</p>";

  const requestId = `${Date.now()}-${Math.random()}`;
  card.dataset.requestId = requestId;

  const content = card.querySelector(".card-content");
  if (fadeOut && content) {
    content.classList.add("is-fade-hidden");
  }

  const nextHtmlPromise = getMarkup(path, fallback);

  if (fadeOut && content) {
    await wait(CONTENT_FADE_MS);
  }

  const nextHtml = await nextHtmlPromise;
  if (card.dataset.requestId !== requestId) return;

  card.innerHTML = `<div class="card-content${fadeIn ? " is-fade-hidden" : ""}">${nextHtml}</div>`;
  card.classList.toggle("is-detail", isDetail);
  card.dataset.mode = state;

  if (isDetail) {
    ensureSlideCornerBack(slide);
    if (id === "1") {
      initOhhoCatalog(slide);
    }
    if (id === "2") {
      initGatorCatalog(slide);
    }
    if (id === "4") {
      initBrovarCatalog(slide);
    }
    if (id === "3") {
      initOhotaCatalog(slide);
    }
  } else {
    removeSlideCornerControls(slide);
  }

  if (fadeIn) {
    requestAnimationFrame(() => {
      card.querySelector(".card-content")?.classList.remove("is-fade-hidden");
    });
  }
}

function waitForCardResize(slide, timeoutMs = 500) {
  const card = slide?.querySelector(".feature-card");
  if (!card) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      card.removeEventListener("transitionend", onTransitionEnd);
      clearTimeout(timeoutId);
      resolve();
    };

    const onTransitionEnd = (event) => {
      if (event.target !== card) return;
      if (
        event.propertyName !== "width" &&
        event.propertyName !== "height" &&
        event.propertyName !== "padding"
      ) {
        return;
      }

      finish();
    };

    const timeoutId = window.setTimeout(finish, timeoutMs);
    card.addEventListener("transitionend", onTransitionEnd);
  });
}

async function loadSlides(swiper) {
  const container = document.querySelector("#slides-root");
  if (!container) return;

  try {
    const response = await fetch("assets/data/slides.html", {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to load slides");
    container.innerHTML = await response.text();
  } catch (error) {
    container.innerHTML =
      "<div class=\"swiper-slide\"><div class=\"feature-card\"><h2>Нет данных</h2><p>Слайды недоступны.</p></div></div>";
  }

  const slides = Array.from(container.querySelectorAll(".swiper-slide[data-id]"));
  await Promise.all(
    slides.map((slide) =>
      renderCardState(slide, "preview", {
        fadeOut: false,
        fadeIn: false,
      }),
    ),
  );

  if (swiper) {
    swiper.update();
  }
}

function initExpandedSlides(swiper) {
  const container = document.querySelector("#slides-root");
  if (!container) return;
  let pendingExpandSlide = null;
  let isExpandedUi = false;

  const syncSwiperLayout = (expanded) => {
    if (!swiper || swiper.destroyed) return;

    swiper.params.slidesPerView = expanded
      ? SWIPER_EXPANDED_SLIDES_PER_VIEW
      : SWIPER_SLIDES_PER_VIEW;
    swiper.params.spaceBetween = expanded
      ? SWIPER_EXPANDED_SPACE_BETWEEN
      : SWIPER_SPACE_BETWEEN;

    if (swiper.params.coverflowEffect) {
      swiper.params.coverflowEffect.rotate = expanded
        ? SWIPER_EXPANDED_COVERFLOW_ROTATE
        : SWIPER_COVERFLOW_ROTATE;
      swiper.params.coverflowEffect.depth = expanded
        ? SWIPER_EXPANDED_COVERFLOW_DEPTH
        : SWIPER_COVERFLOW_DEPTH;
    }

    swiper.update();
    swiper.slideTo(swiper.activeIndex, 0, false);
  };

  const setExpandedUiState = (expanded) => {
    if (isExpandedUi === expanded) {
      if (swiper) {
        swiper.allowTouchMove = !expanded;
      }
      return;
    }

    isExpandedUi = expanded;
    document.body.classList.toggle("has-expanded-slide", expanded);
    if (swiper) {
      swiper.allowTouchMove = !expanded;
    }
    syncSwiperLayout(expanded);
  };

  const collapseSlide = async (slide) => {
    if (!slide || !slide.classList.contains("is-slide-expanded")) return;

    const content = slide.querySelector(".card-content");
    if (content) {
      content.classList.add("is-fade-hidden");
      await wait(CONTENT_FADE_CLOSE_MS);
    }

    slide.classList.add("is-slide-collapsing");
    slide.classList.remove("is-slide-expanded");
    await waitForCardResize(slide, 260);
    await renderCardState(slide, "preview", {
      fadeOut: false,
      fadeIn: true,
    });
    slide.classList.remove("is-slide-collapsing");

    const hasExpandedSlide = Boolean(
      container.querySelector(
        ".swiper-slide.is-slide-expanded, .swiper-slide.is-slide-collapsing",
      ),
    );
    if (!hasExpandedSlide) {
      setExpandedUiState(false);
    }
  };

  const collapseAll = () => {
    const expandedSlides = Array.from(
      container.querySelectorAll(".swiper-slide.is-slide-expanded"),
    );

    if (!expandedSlides.length) {
      setExpandedUiState(false);
      return;
    }

    expandedSlides.forEach((slide) => {
      collapseSlide(slide);
    });
  };

  const activateExpandedSlide = async (slide) => {
    if (!slide) return;

    container
      .querySelectorAll(".swiper-slide.is-slide-expanded")
      .forEach((item) => {
        if (item !== slide) {
          collapseSlide(item);
        }
      });

    slide.classList.add("is-slide-expanded");
    setExpandedUiState(true);

    renderCardState(slide, "detail", {
      fadeOut: true,
      fadeIn: true,
    });
  };

  const expandSlide = (slide, options = {}) => {
    if (!slide) return;

    const skipAgeCheck = options.skipAgeCheck === true;
    if (
      !skipAgeCheck &&
      slide.dataset.id === BROVAR_SLIDE_ID &&
      !isBrovarAgeConfirmed
    ) {
      if (typeof openBrovarAgeModal === "function") {
        openBrovarAgeModal(() => {
          expandSlide(slide, { skipAgeCheck: true });
        });
      }
      return;
    }

    if (swiper) {
      const slideIndex = Array.from(container.children).indexOf(slide);
      if (slideIndex >= 0 && swiper.activeIndex !== slideIndex) {
        pendingExpandSlide = slide;
        swiper.slideTo(slideIndex);
        return;
      }
    }

    pendingExpandSlide = null;
    activateExpandedSlide(slide);
  };

  container.addEventListener("click", (event) => {
    const slide = event.target.closest(".swiper-slide");
    if (!slide) return;

    if (event.target.closest(".card-detail__back, .slide-corner-back")) {
      collapseSlide(slide);
      return;
    }

    const card = event.target.closest(".feature-card");
    if (!card) return;

    if (slide.classList.contains("is-slide-expanded")) {
      return;
    }

    expandSlide(slide);
  });

  container.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const card = event.target.closest(".feature-card");
    const slide = event.target.closest(".swiper-slide");
    if (!card || !slide) return;

    event.preventDefault();
    if (slide.classList.contains("is-slide-expanded")) return;
    expandSlide(slide);
  });

  if (swiper) {
    swiper.on("slideChangeTransitionStart", collapseAll);
    swiper.on("slideChangeTransitionEnd", () => {
      if (!pendingExpandSlide) return;

      const targetSlide = pendingExpandSlide;
      pendingExpandSlide = null;
      activateExpandedSlide(targetSlide);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      collapseAll();
    }
  });
}

window.addEventListener("resize", updateStageScale);
window.addEventListener("orientationchange", updateStageScale);

updateStageScale();
muteBackgroundVideos();
initButtonSound();
initContactModal();
initAgeModal();
const swiperInstance = initSwiper();
loadSlides(swiperInstance).then(() => {
  initExpandedSlides(swiperInstance);
});
initIntro(swiperInstance);
