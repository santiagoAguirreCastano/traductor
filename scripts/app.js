import { dictionary } from "./array.js";

const addWords = document.getElementById('agregarPalabra');
const btnTranslate = document.getElementById('btn2');
const containerTranslate = document.getElementById('SecondDiv');
const inputTranslate = document.getElementById('tra2');
const selectTraductor = document.getElementById('selectTraductor');
const btnDictionary = document.getElementById('btn3');
const containerDictionary = document.getElementById('blur');
const containerFormulario = document.getElementById('blur2');
const containerDictionary2 = document.getElementById('dictionary2');
const selectFilter = document.getElementById('categorias');
const imagenCerrar = document.getElementById('imagenBorrar');
const imagenCerrar2 = document.getElementById('imagenBorrar2');
const btnAgregarPalabra = document.getElementById('btn1');
const inputAgregarEspañol = document.getElementById('inputEspañol');
const inputAgregarIngles = document.getElementById('inputIngles');
const selectAgregarPalabra = document.getElementById('selectCategoriaFormulario');
const confirmationMessage = document.getElementById('confirmationMessage');
const errorMessage = document.getElementById('errorMessage');
const example = document.getElementById('example');


const getAllWords = () => {
    return Object.values(dictionary.categories).flat();
};

function ordenarLista() {
    const elementosOrdenados = getAllWords().sort((a, b) =>
        a.spanish.localeCompare(b.spanish)
    );
    containerDictionary2.innerHTML = '';
    elementosOrdenados.forEach(elemento => {
        const palabraElemento = document.createElement('h2');
        palabraElemento.textContent = `${elemento.spanish} - ${elemento.english} - ${elemento.example}`;
        containerDictionary2.appendChild(palabraElemento);
    });
}

document.getElementById('ordenar').addEventListener('click', ordenarLista);

const makeTranslate = () => {
    const allWords = getAllWords();
    const inputValue = inputTranslate.value.toLowerCase();
    let foundTranslation = false;

    allWords.forEach(element => {
        if (inputValue === element.spanish.toLowerCase() && selectTraductor.value === "Español-Ingles") {
            containerTranslate.innerHTML = element.english;
            foundTranslation = true;
        } else if (inputValue === element.english.toLowerCase() && selectTraductor.value === "Ingles-Español") {
            containerTranslate.innerHTML = element.spanish;
            foundTranslation = true;
        }
    });

    if (!foundTranslation) {
        containerTranslate.innerHTML = "Escriba la palabra en el idioma indicado";
    }
};
const showWords = () => {
    containerDictionary2.innerHTML = '';
    getAllWords().forEach(element => {
        revision(element);
    });
};

let filterOne = document.querySelectorAll('#radio');
let filterTwo = document.querySelectorAll('#radio2');

const makeWordSpanish = (element) => {
    const wordSpanish = document.createElement('h2');
    wordSpanish.id = "palabra2";
    wordSpanish.textContent = element.spanish;
    containerDictionary2.appendChild(wordSpanish);
};

const makeWordEnglish = (element) => {
    const wordEnglish = document.createElement('h2');
    wordEnglish.id = "palabra2";
    wordEnglish.textContent = element.english;
    containerDictionary2.appendChild(wordEnglish);
};

const revision = (element2) => {
    filterOne.forEach(element => {
        if (element.checked) {
            selectFilter.style.display = 'flex';
            if (element.value === "palabra") {
                makeWordSpanish(element2);
            } else if (element.value === "traduccion") {
                makeWordEnglish(element2);
            }
        }
    });
};

filterOne.forEach(radio => {
    radio.addEventListener('change', showWords);
});



const filterCategoria = () => {
    containerDictionary2.innerHTML = '';
    const selectedCategory = [...filterTwo].find(element => element.checked)?.value;
    const selectedLanguage = [...filterOne].find(element => element.checked)?.value;

    if (selectedCategory && selectedLanguage) {
        const filteredWords = dictionary.categories[selectedCategory];
        if (filteredWords && filteredWords.length > 0) {
            if (selectedLanguage === "palabra") {
                filteredWords.forEach(makeWordSpanish);
            } else if (selectedLanguage === "traduccion") {
                filteredWords.forEach(makeWordEnglish);
            }
        } else {
            containerDictionary2.innerHTML = "No hay palabras en esta categoría.";
        }
    }
};

filterTwo.forEach(radio => {
    radio.addEventListener('change', filterCategoria);

});

const displayNoneDictionary = () => {
    containerDictionary.style.display = 'none';
    setTimeout(() => {
        containerDictionary.style.opacity = 0;
    });
};

const styleDictionary = () => {
    containerDictionary.style.display = 'block';
    setTimeout(() => {
        containerDictionary.style.opacity = 1;
    }, 10);
};

const displayNoneFormulario = () => {
    containerFormulario.style.display = 'none';
    setTimeout(() => {
        containerFormulario.style.opacity = 0;
    });
};

const styleFormulario = () => {
    containerFormulario.style.display = 'flex';
    setTimeout(() => {
        containerFormulario.style.opacity = 1;
    }, 10);
};

const getNextId = (category) => {
    const wordsInCategory = dictionary.categories[category];
    const lastWord = wordsInCategory[wordsInCategory.length - 1];
    return lastWord ? lastWord.id + 1 : 1;
};

const eventAddWord = () => {
    if (inputAgregarEspañol.value.trim() === '' || inputAgregarIngles.value.trim() === '') {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 2000);
    } else {
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 2000);
        
        const selectedCategory = selectAgregarPalabra.value;
        const newId = getNextId(selectedCategory);
        
        const newWord = {
            id: newId,
            english: inputAgregarIngles.value,
            spanish: inputAgregarEspañol.value,
            example: example.value, 
        };

        dictionary.categories[selectedCategory].push(newWord);
        console.log(dictionary);
    }
};

imagenCerrar.addEventListener('click', displayNoneDictionary);
imagenCerrar2.addEventListener('click', displayNoneFormulario);
btnAgregarPalabra.addEventListener('click', styleFormulario);
btnDictionary.addEventListener('click', styleDictionary);
addWords.addEventListener('click', eventAddWord);
btnTranslate.addEventListener('click', makeTranslate);