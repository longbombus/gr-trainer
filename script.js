document.addEventListener('DOMContentLoaded', () => {
    // --- Data Definitions (Оставляем как было, с артиклями у существительных) ---
    const pronouns = [
        { person: 1, number: 'sg', gr: 'εγώ', ru: 'я', gr_gen: 'μου', ru_dat: 'мне', gr_acc_weak: 'με', ru_acc: 'меня' },
        { person: 2, number: 'sg', gr: 'εσύ', ru: 'ты', gr_gen: 'σου', ru_dat: 'тебе', gr_acc_weak: 'σε', ru_acc: 'тебя' },
        { person: 3, number: 'sg', gr: 'αυτός', ru: 'он', gr_gen: 'του', ru_dat: 'ему', gr_acc_weak: 'τον', ru_acc: 'его' },
        { person: 3, number: 'sg', gr: 'αυτή', ru: 'она', gr_gen: 'της', ru_dat: 'ей', gr_acc_weak: 'την', ru_acc: 'её' },
        { person: 3, number: 'sg', gr: 'αυτό', ru: 'оно', gr_gen: 'του', ru_dat: 'ему', gr_acc_weak: 'το', ru_acc: 'его (ср)' }, // 'оно' в рус. вин. падеже совпадает с род. 'его'
        { person: 1, number: 'pl', gr: 'εμείς', ru: 'мы', gr_gen: 'μας', ru_dat: 'нам', gr_acc_weak: 'μας', ru_acc: 'нас' },
        { person: 2, number: 'pl', gr: 'εσείς', ru: 'вы', gr_gen: 'σας', ru_dat: 'вам', gr_acc_weak: 'σας', ru_acc: 'вас' },
        { person: 3, number: 'pl', gr: 'αυτοί', ru: 'они (м)', gr_gen: 'τους', ru_dat: 'им', gr_acc_weak: 'τους', ru_acc: 'их (м)' },
        { person: 3, number: 'pl', gr: 'αυτές', ru: 'они (ж)', gr_gen: 'τους', ru_dat: 'им', gr_acc_weak: 'τις', ru_acc: 'их (ж)' },
        { person: 3, number: 'pl', gr: 'αυτά', ru: 'они (ср)', gr_gen: 'τους', ru_dat: 'им', gr_acc_weak: 'τα', ru_acc: 'их (ср)' },
    ];

    const nouns = [
        { id: 'man', gr_sg: 'άνδρας', gr_pl: 'άνδρες', ru_sg: 'мужчина', ru_pl: 'мужчины', gr_sg_art: 'ο άνδρας', gr_pl_art: 'οι άνδρες'},
        { id: 'aftokinito', gr_sg: 'αυτοκίνητο', gr_pl: 'αυτοκίνητα', ru_sg: 'машина', ru_pl: 'машины', gr_sg_art: 'το αυτοκίνητο', gr_pl_art: 'τα αυτοκίνητα'},
        { id: 'woman', gr_sg: 'γυναίка', gr_pl: 'γυναίκες', ru_sg: 'женщина', ru_pl: 'женщины', gr_sg_art: 'η γυναίка', gr_pl_art: 'οι γυναίκες'},
        { id: 'child', gr_sg: 'παιδί', gr_pl: 'παιδιά', ru_sg: 'ребёнок', ru_pl: 'дети', gr_sg_art: 'το παιδί', gr_pl_art: 'τα παιδιά'},
        { id: 'spiti', gr_sg: 'σπίτι', gr_pl: 'σπίτια', ru_sg: 'дом', ru_pl: 'дома', gr_sg_art: 'το σπίτι', gr_pl_art: 'τα σπίτια'},
    ]

    const verbs = [
        {
            id: 'akouo',
            gr_inf: 'ακούω',
            ru_inf: 'слышать/слушать',
            conjugations: {
                '1sg': 'ακούω', '2sg': 'ακούς', '3sg': 'ακούει',
                '1pl': 'ακούμε', '2pl': 'ακούτε', '3pl': 'ακούν(ε)' // Вариант с (ε)
            },
            ru_conjugations: {
                '1sg': 'слышу', '2sg': 'слышишь', '3sg': 'слышит',
                '1pl': 'слышим', '2pl': 'слышите', '3pl': 'слышат'
            },
            generatePhraseModePhrase: (availablePronouns, availableNouns) => { // nouns не используется
                if (!availablePronouns || availablePronouns.length < 2) return null; // Нужно минимум 2 местоимения (субъект и объект)
                const thisVerb = verbs.find(v => v.id === 'akouo');
                if (!thisVerb) return null;

                // Выбираем субъект и ОБЯЗАТЕЛЬНО ДРУГОЙ объект
                const subjectPronoun = getRandomElement(availablePronouns);
                let objectPronoun = getRandomElement(availablePronouns);

                const subjPersonNum = `${subjectPronoun.person}${subjectPronoun.number}`;
                const verbFormGr = thisVerb.conjugations[subjPersonNum];
                const verbFormRu = thisVerb.ru_conjugations[subjPersonNum];
                const objFormGr = objectPronoun.gr_acc_weak;
                const objFormRu = objectPronoun.ru_acc;

                if (!verbFormGr || !verbFormRu || !objFormGr || !objFormRu) { console.error(`Missing forms for akouo`); return null; }
                const gr_phrase = `${objFormGr} ${verbFormGr}`;
                const ru_phrase = `${subjectPronoun.ru} ${verbFormRu} ${objFormRu}`;
                return { greek: gr_phrase, russian: ru_phrase };
            }
        },
        {
            id: 'areso',
            gr_inf: 'αρέσω',
            ru_inf: 'нравиться',
            conjugations: { // Греческие спряжения (зависят от того, *что* нравится)
                '1sg': 'αρέσω', '2sg': 'αρέσεις', '3sg': 'αρέσει',
                '1pl': 'αρέσουμε', '2pl': 'αρέσετε', '3pl': 'αρέσουν'
            },
            ru_conjugations: { // Русские спряжения (зависят от того, *что* нравится)
                '1sg': 'нравлюсь', '2sg': 'нравишься', '3sg': 'нравится',
                '1pl': 'нравимся', '2pl': 'нравитесь', '3pl': 'нравятся'
            },
            generatePhraseModePhrase: (availablePronouns, availableNouns) => {
                if (!availablePronouns || availablePronouns.length === 0) return null;
                const aresoVerbData = verbs.find(v => v.id === 'areso');
                if (!aresoVerbData) return null;

                // Выбираем "кому нравится"
                const likerPronoun = getRandomElement(availablePronouns);

                // Решаем, будет ли объект местоимением ИЛИ если нет доступных существительных
                // Также проверяем, есть ли *другое* местоимение для выбора
                const canUsePronounObject = availablePronouns.length > 1;
                const usePronounObject = (canUsePronounObject && Math.random() < 0.5) || availableNouns.length === 0;

                if (usePronounObject) {
                     if (!canUsePronounObject) return null; // Не можем выбрать другое местоимение
                    // Вариант: Объект - Местоимение ("Ты мне нравишься")
                    let likedPronoun;
                    do {
                        likedPronoun = getRandomElement(availablePronouns);
                    } while (likerPronoun === likedPronoun); // Убедимся, что это разные местоимения

                    const personNumberLiked = `${likedPronoun.person}${likedPronoun.number}`;
                    const verbFormGr = aresoVerbData.conjugations[personNumberLiked];
                    const verbFormRu = aresoVerbData.ru_conjugations[personNumberLiked];
                    if (!verbFormGr || !verbFormRu) { console.error(`Missing conj for areso ${personNumberLiked}`); return null; }

                    const gr_phrase = `${likerPronoun.gr_gen} ${verbFormGr}`; // μου αρέσεις
                    const ru_phrase = `${likedPronoun.ru} ${verbFormRu} ${likerPronoun.ru_dat}`; // ты нравишься мне
                    return { greek: gr_phrase, russian: ru_phrase };

                } else {
                     // Вариант: Объект - Существительное ("Мне нравится женщина")
                     // availableNouns.length > 0 (проверено косвенно через usePronounObject)
                     const likedNounData = getRandomElement(availableNouns);
                     const usePlural = Math.random() < 0.5;
                     const likedNoun_gr_art = usePlural ? likedNounData.gr_pl_art : likedNounData.gr_sg_art;
                     const likedNoun_ru = usePlural ? likedNounData.ru_pl : likedNounData.ru_sg;
                     const verbFormGr = usePlural ? aresoVerbData.conjugations['3pl'] : aresoVerbData.conjugations['3sg'];
                     const verbFormRu = usePlural ? aresoVerbData.ru_conjugations['3pl'] : aresoVerbData.ru_conjugations['3sg'];
                     if (!verbFormGr || !verbFormRu) { console.error(`Missing 3p conj for areso`); return null; }

                     const gr_phrase = `${likerPronoun.gr_gen} ${verbFormGr} ${likedNoun_gr_art}`; // μου αρέσει η γυναίκα
                     const ru_phrase = `${likerPronoun.ru_dat} ${verbFormRu} ${likedNoun_ru}`; // мне нравится женщина
                     return { greek: gr_phrase, russian: ru_phrase };
                }
           }
        },
        {
            id: 'blepo',
            gr_inf: 'βλέπω',
            ru_inf: 'видеть',
            conjugations: {
                '1sg': 'βλέπω', '2sg': 'βλέπεις', '3sg': 'βλέπει',
                '1pl': 'βλέπουμε', '2pl': 'βλέπετε', '3pl': 'βλέπουν'
            },
            ru_conjugations: {
                '1sg': 'вижу', '2sg': 'видишь', '3sg': 'видит',
                '1pl': 'видим', '2pl': 'видите', '3pl': 'видят'
            },
            generatePhraseModePhrase: (availablePronouns, availableNouns) => { // nouns не используется
                if (!availablePronouns || availablePronouns.length < 2) return null;
                const thisVerb = verbs.find(v => v.id === 'blepo');
                if (!thisVerb) return null;
                const subjectPronoun = getRandomElement(availablePronouns);
                let objectPronoun;
                do { objectPronoun = getRandomElement(availablePronouns); } while (subjectPronoun === objectPronoun);
                const subjPersonNum = `${subjectPronoun.person}${subjectPronoun.number}`;
                const verbFormGr = thisVerb.conjugations[subjPersonNum];
                const verbFormRu = thisVerb.ru_conjugations[subjPersonNum];
                const objFormGr = objectPronoun.gr_acc_weak;
                const objFormRu = objectPronoun.ru_acc;
                if (!verbFormGr || !verbFormRu || !objFormGr || !objFormRu) { console.error(`Missing forms for blepo`); return null; }
                const gr_phrase = `${objFormGr} ${verbFormGr}`;
                const ru_phrase = `${subjectPronoun.ru} ${verbFormRu} ${objFormRu}`;
                return { greek: gr_phrase, russian: ru_phrase };
            }
        },
        {
            id: 'einai',
            gr_inf: 'είμαι',
            ru_inf: 'быть/являться',
            conjugations: { // Греческие спряжения
                '1sg': 'είμαι', '2sg': 'είσαι', '3sg': 'είναι',
                '1pl': 'είμαστε', '2pl': 'είστε', '3pl': 'είναι'
            },
            ru_conjugations: { // Русские спряжения (для режимов 'verbs' и 'phrases')
                '1sg': 'являюсь', '2sg': 'являешься', '3sg': 'является',
                '1pl': 'являемся', '2pl': 'являетесь', '3pl': 'являются'
                // Используем "являться", т.к. "быть" в настоящем времени обычно опускается или архаично.
            },
            generatePhraseModePhrase: (availablePronouns, availableNouns) => {
                if (!availablePronouns || availablePronouns.length === 0) return null; // Нужен хотя бы один субъект
                const einaiVerbData = verbs.find(v => v.id === 'einai');
                if (!einaiVerbData) return null;
                if (!availableNouns || availableNouns.length === 0) {
                    // console.error("Cannot generate 'einai' phrase: no nouns available."); // Можно не логировать, а просто вернуть null
                    return null; // einai требует существительное
                }

                // Выбираем субъект и существительное
                const subjectPronoun = getRandomElement(availablePronouns);
                const nounData = getRandomElement(availableNouns);

                const usePlural = subjectPronoun.number === 'pl';
                const noun_gr = usePlural ? nounData.gr_pl : nounData.gr_sg;
                const noun_ru = usePlural ? nounData.ru_pl : nounData.ru_sg;
                const personNumber = `${subjectPronoun.person}${subjectPronoun.number}`;
                const verbFormGr = einaiVerbData.conjugations[personNumber];
                let subj_ru = subjectPronoun.ru;
                if (subjectPronoun.number === 'pl' && subjectPronoun.person === 3) subj_ru = 'они';

                const gr_phrase = `${verbFormGr} ${noun_gr}`;
                const ru_phrase = `${subj_ru} -- ${noun_ru}`;
                return { greek: gr_phrase, russian: ru_phrase };
            }
        },
        {
           id: 'thelo',
           gr_inf: 'θέλω',
           ru_inf: 'хотеть',
           conjugations: {
               '1sg': 'θέλω', '2sg': 'θέλεις', '3sg': 'θέλει',
               '1pl': 'θέλουμε', '2pl': 'θέλετε', '3pl': 'θέλουν'
           },
           ru_conjugations: {
               '1sg': 'хочу', '2sg': 'хочешь', '3sg': 'хочет',
               '1pl': 'хотим', '2pl': 'хотите', '3pl': 'хотят'
           },
           generatePhraseModePhrase: (availablePronouns, availableNouns) => {
            if (!availablePronouns || availablePronouns.length < 2) return null;
            const thisVerb = verbs.find(v => v.id === 'thelo');
            if (!thisVerb) return null;
            const subjectPronoun = getRandomElement(availablePronouns);
            let objectPronoun;
            do { objectPronoun = getRandomElement(availablePronouns); } while (subjectPronoun === objectPronoun);
            const subjPersonNum = `${subjectPronoun.person}${subjectPronoun.number}`;
            const verbFormGr = thisVerb.conjugations[subjPersonNum];
            const verbFormRu = thisVerb.ru_conjugations[subjPersonNum];
            const objFormGr = objectPronoun.gr_acc_weak;
            const objFormRu = objectPronoun.ru_acc;
            if (!verbFormGr || !verbFormRu || !objFormGr || !objFormRu) { console.error(`Missing forms for thelo`); return null; }
            const gr_phrase = `${objFormGr} ${verbFormGr}`;
            const ru_phrase = `${subjectPronoun.ru} ${verbFormRu} ${objFormRu}`;
            return { greek: gr_phrase, russian: ru_phrase };
        }
        },
        {
            id: 'ksero',
            gr_inf: 'ξέρω',
            ru_inf: 'знать',
            conjugations: {
                '1sg': 'ξέρω', '2sg': 'ξέρεις', '3sg': 'ξέρει',
                '1pl': 'ξέρουμε', '2pl': 'ξέρετε', '3pl': 'ξέρουν'
            },
            ru_conjugations: {
                '1sg': 'знаю', '2sg': 'знаешь', '3sg': 'знает',
                '1pl': 'знаем', '2pl': 'знаете', '3pl': 'знают'
            },
            generatePhraseModePhrase: (availablePronouns, availableNouns) => {
                if (!availablePronouns || availablePronouns.length < 2) return null;
                const thisVerb = verbs.find(v => v.id === 'ksero');
                if (!thisVerb) return null;
                const subjectPronoun = getRandomElement(availablePronouns);
                let objectPronoun;
                do { objectPronoun = getRandomElement(availablePronouns); } while (subjectPronoun === objectPronoun);
                const subjPersonNum = `${subjectPronoun.person}${subjectPronoun.number}`;
                const verbFormGr = thisVerb.conjugations[subjPersonNum];
                const verbFormRu = thisVerb.ru_conjugations[subjPersonNum];
                const objFormGr = objectPronoun.gr_acc_weak;
                const objFormRu = objectPronoun.ru_acc;
                if (!verbFormGr || !verbFormRu || !objFormGr || !objFormRu) { console.error(`Missing forms for ksero`); return null; }
                const gr_phrase = `${objFormGr} ${verbFormGr}`;
                const ru_phrase = `${subjectPronoun.ru} ${verbFormRu} ${objFormRu}`;
                return { greek: gr_phrase, russian: ru_phrase };
            }
        },
        {
            id: 'perimeno', // NEW
            gr_inf: 'περιμένω',
            ru_inf: 'ждать',
            conjugations: {
                '1sg': 'περιμένω', '2sg': 'περιμένεις', '3sg': 'περιμένει',
                '1pl': 'περιμένουμε', '2pl': 'περιμένετε', '3pl': 'περιμένουν'
            },
            ru_conjugations: {
                '1sg': 'жду', '2sg': 'ждёшь', '3sg': 'ждёт',
                '1pl': 'ждём', '2pl': 'ждёте', '3pl': 'ждут'
            },
            generatePhraseModePhrase: (availablePronouns, availableNouns) => {
                if (!availablePronouns || availablePronouns.length < 2) return null;
                const thisVerb = verbs.find(v => v.id === 'perimeno');
                if (!thisVerb) return null;
                const subjectPronoun = getRandomElement(availablePronouns);
                let objectPronoun;
                do { objectPronoun = getRandomElement(availablePronouns); } while (subjectPronoun === objectPronoun);
                const subjPersonNum = `${subjectPronoun.person}${subjectPronoun.number}`;
                const verbFormGr = thisVerb.conjugations[subjPersonNum];
                const verbFormRu = thisVerb.ru_conjugations[subjPersonNum];
                const objFormGr = objectPronoun.gr_acc_weak;
                const objFormRu = objectPronoun.ru_acc;
                if (!verbFormGr || !verbFormRu || !objFormGr || !objFormRu) { console.error(`Missing forms for perimeno`); return null; }
                const gr_phrase = `${objFormGr} ${verbFormGr}`;
                const ru_phrase = `${subjectPronoun.ru} ${verbFormRu} ${objFormRu}`;
                return { greek: gr_phrase, russian: ru_phrase };
           }
        },
    ];

    const magicEmojis = ['🧠', '✨', '🤔', '💡', '🔮', '🧙', '🪄'];

    // --- DOM Elements ---
    const settingsPanel = document.getElementById('settings-panel');
    const trainerDiv = document.getElementById('trainer');
    const trainingModeSelect = document.getElementById('training-mode-select');
    const verbSelectionList = document.querySelector('#verb-selection .scrollable-list');
    const nounSelectionList = document.querySelector('#noun-selection .scrollable-list');
    const languageModeSelect = document.getElementById('language-mode'); // Направление перевода
    const promptTextDiv = document.getElementById('prompt-text');
    const speakPromptButton = document.getElementById('speak-prompt-button');
    const resultDiv = document.getElementById('result');
    const userInput = document.getElementById('user-input');
    const speakAnswerButton = document.getElementById('speak-answer-button');
    const submitButton = document.getElementById('submit-button');
    const speechStatusP = document.getElementById('speech-status');
    const errorMessageP = document.getElementById('error-message');
    const settingsErrorP = document.getElementById('settings-error');

    // --- State Variables ---
    let currentPhrase = null;
    let selectedVerbIds = [];
    let selectedNounIds = [];
    let currentMode = 'phrases'; // Default mode
    let recognition = null; // For Speech Recognition

    // --- Cookie Functions ---
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // Encode value to handle special characters like commas in arrays
        document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/; SameSite=Lax";
         // console.log("Set cookie:", name, "=", value);
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
                // console.log("Get cookie:", name, "=", value);
                return value;
            }
        }
        return null;
    }

    // --- Web Speech API (unchanged from previous version) ---
    const synth = window.speechSynthesis;
    let voices = [];
    function populateVoiceList() { /* ... same as before ... */
         if(typeof synth === 'undefined') return; voices = synth.getVoices();
    }
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
    function speakText(text, lang) { /* ... same as before ... */
         if (synth.speaking) { synth.cancel(); /* Cancel previous before speaking new */ }
         if (text && typeof SpeechSynthesisUtterance !== 'undefined') {
            const utterThis = new SpeechSynthesisUtterance(text);
            utterThis.onerror = (event) => { console.error('SpeechSynthesisUtterance.onerror', event); showError(`Ошибка озвучивания: ${event.error}`); };
            const targetLang = lang.startsWith('el') ? 'el-GR' : 'ru-RU';
            let selectedVoice = voices.find(voice => voice.lang === targetLang && voice.localService) || voices.find(voice => voice.lang === targetLang);
             if (!selectedVoice) selectedVoice = voices.find(voice => voice.lang.startsWith(lang.substring(0, 2)) && voice.localService) || voices.find(voice => voice.lang.startsWith(lang.substring(0, 2)));
             if (selectedVoice) utterThis.voice = selectedVoice; else utterThis.lang = targetLang;
            utterThis.pitch = 1; utterThis.rate = 0.9;
            synth.speak(utterThis);
        } else if (typeof SpeechSynthesisUtterance === 'undefined'){
             console.warn("Speech Synthesis not supported");
        }
    }
     function setupSpeechRecognition(lang) { /* ... same as before ... */
         window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!window.SpeechRecognition) {
            speakAnswerButton.disabled = true; speakAnswerButton.title = "Распознавание речи не поддерживается"; return null;
        }
         speakAnswerButton.disabled = false; speakAnswerButton.title = "Сказать ответ";
         const recognizer = new SpeechRecognition();
         recognizer.lang = lang; recognizer.interimResults = false; recognizer.maxAlternatives = 1;
         recognizer.onstart = () => { speechStatusP.textContent = `Говорите (${lang})...`; speechStatusP.classList.remove('hidden'); speakAnswerButton.disabled = true; };
         recognizer.onresult = (event) => { userInput.value = event.results[0][0].transcript; handleSubmit(); };
         recognizer.onspeechend = () => { recognizer.stop(); };
         recognizer.onerror = (event) => {
             console.error('Speech recognition error', event.error);
             let errorMsg = `Ошибка распознавания: ${event.error}`;
             if (event.error === 'no-speech') errorMsg = 'Речь не распознана.';
             if (event.error === 'audio-capture') errorMsg = 'Проблема с микрофоном.';
             if (event.error === 'not-allowed') errorMsg = 'Доступ к микрофону запрещен.';
             showError(errorMsg); // Show error in main trainer area
             speechStatusP.classList.add('hidden'); speakAnswerButton.disabled = false;
         };
         recognizer.onend = () => { speechStatusP.classList.add('hidden'); speakAnswerButton.disabled = false; };
         return recognizer;
     }

    // --- Core Functions ---

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function normalizeText(text) {
        return text.toLowerCase().trim().replace(/\s+/g, ' ');
    }

    function handleSettingsChange() {
        // Read selected mode from the select dropdown
        currentMode = trainingModeSelect.value;

        // Read selected verbs/nouns (без изменений)
        selectedVerbIds = Array.from(verbSelectionList.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        selectedNounIds = Array.from(nounSelectionList.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

        // Save settings to cookies (без изменений в логике сохранения)
        setCookie('trainingMode', currentMode, 30);
        setCookie('selectedVerbs', selectedVerbIds.join(','), 30);
        setCookie('selectedNouns', selectedNounIds.join(','), 30);
        setCookie('languageMode', languageModeSelect.value, 30); // Также сохраняем направление

        // Regenerate phrase based on new settings (без изменений)
        generateNewPhrase();
    }

    function generateNewPhrase() {
        clearTrainerError(); // Clear errors in the main trainer area
        clearSettingsError(); // Clear errors in the settings panel
        resultDiv.innerHTML = ''; // Очищаем поле результата
        userInput.value = ''; // Очищаем поле ввода
        submitButton.disabled = false; // Кнопка "Проверить" должна быть активна для новой фразы
        speakAnswerButton.disabled = recognition === null; // Reset speech button state

        submitButton.textContent = 'Проверить'; // Устанавливаем текст
        submitButton.onclick = handleSubmit; // Назначаем обработчик проверки

        currentPhrase = null; // Reset current phrase
        let phraseGenerated = false; // Flag to check if generation was successful

        const availableVerbs = verbs.filter(v => selectedVerbIds.includes(v.id));
        const availableNouns = nouns.filter(n => selectedNounIds.includes(n.id));

        // Отключаем кнопки проверки/речи, если нет доступных слов для текущего режима
        let disableInputs = false;
        switch (currentMode) {
            case 'nouns':
                if (availableNouns.length === 0) {
                    showSettingsError("Выберите хотя бы одно существительное для режима 'Только существительные'.");
                    disableInputs = true;
                }
                break;
            case 'verbs':
                 if (availableVerbs.length === 0) {
                    showSettingsError("Выберите хотя бы один глагол для режима 'Только глаголы'.");
                    disableInputs = true;
                }
                break;
            case 'pronouns':
                // Для этого режима не нужны доп. настройки слов
                break;
            case 'phrases':
            default:
                 if (availableVerbs.length === 0) {
                    showSettingsError("Выберите хотя бы один глагол для режима 'Фразы'.");
                    disableInputs = true;
                }
                break;
        }

         if(disableInputs) {
             promptTextDiv.textContent = "-";
             submitButton.disabled = true;
             speakAnswerButton.disabled = true;
             return; // Stop generation
         }


        try { // Wrap generation in try/catch for better error isolation
            switch (currentMode) {
                case 'nouns':
                    // Проверка на availableNouns уже сделана выше
                    const nounData = getRandomElement(availableNouns);
                    const usePluralNoun = Math.random() < 0.5;
                    currentPhrase = {
                        greek: usePluralNoun ? nounData.gr_pl_art : nounData.gr_sg_art,
                        russian: usePluralNoun ? nounData.ru_pl : nounData.ru_sg
                    };
                    phraseGenerated = true;
                    break;

                case 'verbs':
                     // Проверка на availableVerbs уже сделана выше
                     const pronounVerb = getRandomElement(pronouns);
                     const verbData = getRandomElement(availableVerbs); // Глагол уже отфильтрован
                     const personNumberVerb = `${pronounVerb.person}${pronounVerb.number}`;
 
                     const verbFormGr = verbData.conjugations ? verbData.conjugations[personNumberVerb] : null;
                     const verbFormRu = verbData.ru_conjugations ? verbData.ru_conjugations[personNumberVerb] : null;
 
                     // Проверка на наличие спряжений
                      if (!verbFormGr || !verbFormRu) {
                          console.error(`Missing conjugation for ${verbData.id}, personNumber: ${personNumberVerb}`);
                          showError(`Ошибка генерации: отсутствует спряжение для "${verbData.ru_inf}" (${personNumberVerb}).`);
                          submitButton.disabled = true;
                          speakAnswerButton.disabled = true;
                          return; // Stop generation
                      }
 
                     // Формируем пару: греческое спряжение и "русское местоимение + русское спряжение"
                     currentPhrase = {
                         greek: verbFormGr,
                         russian: `${pronounVerb.ru} ${verbFormRu}` // Теперь используем русское спряжение
                     };
                     phraseGenerated = true;
                    break;

                case 'pronouns':
                    const randomPronounP = getRandomElement(pronouns);

                    if (!randomPronounP.gr || !randomPronounP.ru || !randomPronounP.gr_gen || !randomPronounP.ru_dat || !randomPronounP.gr_acc_weak || !randomPronounP.ru_acc) {
                         console.error("Missing pronoun forms for:", randomPronounP);
                         throw new Error("Отсутствуют необходимые формы местоимений.");
                    }

                    switch (Math.floor(Math.random() * 2.99999)) {
                        case 0:
                            currentPhrase = {
                                greek: randomPronounP.gr,      // εγώ
                                russian: randomPronounP.ru     // я
                            };
                            break;
                        case 1:
                            currentPhrase = {
                                greek: randomPronounP.gr_gen,  // μου
                                russian: randomPronounP.ru_dat // мне
                            };
                            break;
                        case 2:
                            currentPhrase = {
                                greek: randomPronounP.gr_acc_weak, // με
                                russian: randomPronounP.ru_acc     // меня
                            };
                            break;
                    }
                    phraseGenerated = true;
                    break;

                case 'phrases':
                    default:
                        const randomVerb = getRandomElement(availableVerbs);
    
                        if (typeof randomVerb.generatePhraseModePhrase !== 'function') {
                            throw new Error(`Generator not found for verb ${randomVerb.id}`);
                        }
    
                        currentPhrase = randomVerb.generatePhraseModePhrase(pronouns, availableNouns);
    
                        if (currentPhrase) {
                            phraseGenerated = true;
                        } else {
                                throw new Error(`Не удалось сгенерировать фразу для "${randomVerb.gr_inf}". Проверьте наличие необходимых слов (особенно сущ. для είναι).`);
                        }
                        break;
            } // end switch

        } catch (error) {
            console.error("Error during phrase generation:", error);
            showError(`Критическая ошибка при генерации фразы: ${error.message}`);
            promptTextDiv.textContent = "-";
            submitButton.disabled = true;
             speakAnswerButton.disabled = true;
            return; // Stop
        }


        if (phraseGenerated && currentPhrase) {
            updatePromptAndInputMode();
        } else if (!phraseGenerated && !settingsErrorP.textContent && !errorMessageP.textContent) {
             // If no phrase generated AND no other error shown, display a general message
            promptTextDiv.textContent = "-";
            showError("Не удалось сгенерировать фразу. Проверьте настройки.");
             submitButton.disabled = true;
             speakAnswerButton.disabled = true;
        }

        userInput.focus();
    }

    function updatePromptAndInputMode() {
         if (!currentPhrase) {
             // console.log("updatePromptAndInputMode called with no currentPhrase");
              promptTextDiv.textContent = "-"; // Ensure prompt is cleared if generation failed
             return;
         }

        const mode = languageModeSelect.value; // "ru-gr" or "gr-ru"
        let promptLang, answerLang, promptText, expectedAnswerText;

        if (mode === 'ru-gr') {
            promptLang = 'ru-RU'; answerLang = 'el-GR';
            promptText = currentPhrase.russian; expectedAnswerText = currentPhrase.greek;
        } else { // gr-ru
            promptLang = 'el-GR'; answerLang = 'ru-RU';
            promptText = currentPhrase.greek; expectedAnswerText = currentPhrase.russian;
        }

        promptTextDiv.textContent = promptText;
        userInput.placeholder = `Введите перевод на ${answerLang === 'el-GR' ? 'греческий' : 'русский'}...`;

        // Delay slightly before speaking to avoid cutting off previous sounds
        setTimeout(() => speakText(promptText, promptLang), 100);

        // Setup Speech Recognition for the *answer* language
        recognition = setupSpeechRecognition(answerLang);
        // Ensure button state reflects availability after setup
        speakAnswerButton.disabled = (recognition === null);
        speakAnswerButton.title = (recognition === null) ? "Распознавание речи не поддерживается" : "Сказать ответ";
    }

    /**
     * Находит наибольшую общую подпоследовательность (LCS) для двух массивов.
     * @param {Array<string>} arr1 Первый массив (например, слова пользователя).
     * @param {Array<string>} arr2 Второй массив (например, правильные слова).
     * @returns {Array<string>} Массив, содержащий элементы LCS.
     */
    function findLCS(arr1, arr2) {
        const m = arr1.length;
        const n = arr2.length;
        // dp[i][j] хранит длину LCS для arr1[0..i-1] и arr2[0..j-1]
        const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                // Сравниваем элементы из *исходных* массивов (i-1 и j-1 индексы)
                if (arr1[i - 1] === arr2[j - 1]) {
                    // Если элементы совпадают, длина LCS увеличивается на 1
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    // Если не совпадают, берем максимум из предыдущих LCS
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // Восстановление самой последовательности LCS (не только длины)
        let index = dp[m][n]; // Длина LCS
        const lcsSequence = Array(index); // Массив для результата LCS

        // Идем с конца таблицы dp
        let i = m, j = n;
        while (i > 0 && j > 0) {
            // Если символы совпадают, они часть LCS
            if (arr1[i - 1] === arr2[j - 1]) {
                lcsSequence[index - 1] = arr1[i - 1]; // Добавляем элемент в результат
                i--;
                j--;
                index--;
            }
            // Если не совпадают, двигаемся в направлении большего значения в таблице dp
            else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--; // Двигаемся вверх
            } else {
                j--; // Двигаемся влево
            }
        }
        return lcsSequence; // Возвращаем массив LCS
    }

    function handleSubmit() {
        clearTrainerError();
        const userAnswer = userInput.value; // Оригинальный ввод пользователя
        if (!currentPhrase) return;

        const langMode = languageModeSelect.value;
        const expectedAnswer = (langMode === 'ru-gr') ? currentPhrase.greek : currentPhrase.russian;

        if (userAnswer.trim() === '') {
            // Выбираем случайный эмодзи
            const randomEmoji = getRandomElement(magicEmojis);

            // Отображаем эмодзи как "ответ" пользователя и правильный ответ
            resultDiv.innerHTML = `Ваш ответ: ${randomEmoji}<br>Правильный ответ: ${expectedAnswer}`;
            
            submitButton.textContent = 'Следующая фраза';
            submitButton.onclick = generateNewPhrase; // Теперь кнопка генерирует новую фразу
            submitButton.disabled = false; // Кнопка должна быть активна для перехода
            speakAnswerButton.disabled = true; // Отключаем "Говорить"
            userInput.disabled = true; // Блокируем ввод после ответа

            return; // Прерываем выполнение функции handleSubmit здесь
        }

        // 1. Нормализация и токенизация (разделение на слова)
        const normalizedUserAnswer = normalizeText(userAnswer);
        const normalizedExpectedAnswer = normalizeText(expectedAnswer);

        // Разделяем на слова, фильтруем пустые строки (если было >1 пробела)
        const userWordsNorm = normalizedUserAnswer.split(' ').filter(w => w.length > 0);
        const correctWordsNorm = normalizedExpectedAnswer.split(' ').filter(w => w.length > 0);

        // Получаем оригинальные слова пользователя для сохранения регистра и т.д.
        const originalUserWords = userAnswer.trim().split(/\s+/).filter(w => w.length > 0);

        // 2. Находим LCS между нормализованными массивами слов
        const lcsResult = findLCS(userWordsNorm, correctWordsNorm);

        // 3. Генерируем HTML с подсветкой на основе LCS
        let resultHTML = [];
        let lcsIndex = 0; // Индекс для отслеживания текущего слова в LCS

        for (let i = 0; i < originalUserWords.length; i++) {
            const currentOriginalWord = originalUserWords[i];
            const currentUserWordNorm = userWordsNorm[i]; // Берем соответствующее нормализованное слово

            // Проверяем, совпадает ли текущее нормализованное слово пользователя
            // со следующим ожидаемым словом из LCS
            if (lcsIndex < lcsResult.length && currentUserWordNorm === lcsResult[lcsIndex]) {
                // Слово является частью LCS - помечаем как правильное
                resultHTML.push(`<span class="correct-char">${currentOriginalWord}</span>`);
                lcsIndex++; // Переходим к следующему слову в LCS
            } else {
                // Слово не является частью LCS (лишнее или не на своем месте) - помечаем как неправильное
                resultHTML.push(`<span class="incorrect-char">${currentOriginalWord}</span>`);
            }
        }

        // 4. Отображаем результат
        // Собираем подсвеченные слова обратно в строку с пробелами
        resultDiv.innerHTML = `Ваш ответ: ${resultHTML.join(' ')}<br>Правильный ответ: ${expectedAnswer}`;

        submitButton.textContent = 'Следующая фраза';
        submitButton.onclick = generateNewPhrase; // Теперь кнопка генерирует новую фразу
        submitButton.disabled = false; // Кнопка должна быть активна для перехода
        speakAnswerButton.disabled = true; // Отключаем "Говорить"
        userInput.disabled = true; // Блокируем ввод после ответа
    }

    function handleSpeechRequest() {
        clearTrainerError();
        if (recognition) {
            try {
                recognition.start();
            } catch (e) {
                 console.error("Error starting speech recognition:", e);
                 if (e.name !== 'InvalidStateError') { // Ignore if already started
                    showError('Не удалось начать распознавание речи.');
                 }
            }
        } else {
            showError('Распознавание речи не настроено.');
        }
    }

    // --- Error Display ---
     function showSettingsError(message) {
         settingsErrorP.textContent = message;
         settingsErrorP.classList.remove('hidden');
     }
      function clearSettingsError() {
         settingsErrorP.textContent = '';
         settingsErrorP.classList.add('hidden');
     }
     function showError(message) { // For trainer area errors
         errorMessageP.textContent = message;
         errorMessageP.classList.remove('hidden');
     }
     function clearTrainerError() { // For trainer area errors
         errorMessageP.textContent = '';
         errorMessageP.classList.add('hidden');
     }

    // --- Initialization ---
    function initializeApp() {
        populateVoiceList(); // Ensure voices are loaded early

        // --- Load Settings from Cookies ---
        const savedMode = getCookie('trainingMode') || 'phrases';
        const savedVerbsStr = getCookie('selectedVerbs');
        const savedNounsStr = getCookie('selectedNouns');
        const savedLangMode = getCookie('languageMode') || 'ru-gr';

        const savedVerbIds = savedVerbsStr ? savedVerbsStr.split(',') : verbs.map(v => v.id); // Default to all if no cookie
        const savedNounIds = savedNounsStr ? savedNounsStr.split(',') : nouns.map(n => n.id); // Default to all if no cookie

        // --- Populate Settings UI ---
        // Verbs
        verbSelectionList.innerHTML = ''; // Clear previous (if any)
        verbs.forEach(verb => {
            const div = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `verb-${verb.id}`;
            checkbox.value = verb.id;
            checkbox.checked = savedVerbIds.includes(verb.id); // Set from loaded/default
            checkbox.addEventListener('change', handleSettingsChange); // Add listener
            const label = document.createElement('label');
            label.htmlFor = `verb-${verb.id}`;
            label.textContent = `${verb.gr_inf} (${verb.ru_inf})`;
            div.appendChild(checkbox);
            div.appendChild(label);
            verbSelectionList.appendChild(div);
        });

        // Nouns
        nounSelectionList.innerHTML = ''; // Clear previous
        nouns.forEach(noun => {
             const div = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `noun-${noun.id}`;
            checkbox.value = noun.id;
            checkbox.checked = savedNounIds.includes(noun.id); // Set from loaded/default
            checkbox.addEventListener('change', handleSettingsChange); // Add listener
            const label = document.createElement('label');
            label.htmlFor = `noun-${noun.id}`;
            label.textContent = `${noun.gr_sg_art} / ${noun.gr_pl_art} (${noun.ru_sg} / ${noun.ru_pl})`;
             div.appendChild(checkbox);
            div.appendChild(label);
            nounSelectionList.appendChild(div);
        });

         trainingModeSelect.value = savedMode;
         trainingModeSelect.addEventListener('change', handleSettingsChange);

         // Language Direction Select
         languageModeSelect.value = savedLangMode;
         languageModeSelect.addEventListener('change', handleSettingsChange); // Add listener

        // --- Initial State Sync & First Phrase ---
        // Call handleSettingsChange once to ensure state variables (selectedVerbIds, etc.) are set correctly
        // and the first phrase is generated based on loaded settings.
        handleSettingsChange();

        // --- Add Other Event Listeners ---
        speakPromptButton.addEventListener('click', () => {
            if (currentPhrase) {
                const langMode = languageModeSelect.value;
                const textToSpeak = (langMode === 'ru-gr') ? currentPhrase.russian : currentPhrase.greek;
                const lang = (langMode === 'ru-gr') ? 'ru-RU' : 'el-GR';
                speakText(textToSpeak, lang);
            }
        });
        submitButton.onclick = handleSubmit;
        userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSubmit(); });
        speakAnswerButton.addEventListener('click', handleSpeechRequest);

         // Initial check for Speech API support and update buttons
        if (typeof synth === 'undefined') { speakPromptButton.disabled = true; speakPromptButton.title = "Синтез речи не поддерживается"; }
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) { speakAnswerButton.disabled = true; speakAnswerButton.title = "Распознавание речи не поддерживается"; }
    }

    // --- Start the application ---
    initializeApp();

}); // End DOMContentLoaded