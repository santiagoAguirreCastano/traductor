import { diccionario } from "./array.js";
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
const btnAgregarPalabra = document.getElementById('btn1')
const inputAgregarEspañol = document.getElementById('inputEspañol')
const inputAgregarIngles = document.getElementById('inputIngles')
const selectAgregarPalabra = document.getElementById('selectCategoriaFormulario')

const confirmationMessage = document.getElementById('confirmationMessage');
const imagenBorrar2 = document.getElementById('imagenBorrar2');


addWords.addEventListener('click', () => {
 
    confirmationMessage.style.display = 'block';
    
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 2000);
    

   
});





const makeTranslate = () => {
    diccionario.forEach(element => {
        if (
            inputTranslate.value.toLowerCase() == element.palabra ||
            inputTranslate.value.toLowerCase() == element.traduccion
        ) {
            if (selectTraductor.value == "Español-Ingles") {
                if (inputTranslate.value == element.palabra) {
                    containerTranslate.innerHTML = element.traduccion;
                } else {
                    containerTranslate.innerHTML = "Escriba la palabra en el idioma indicado";
                }
            } else if (selectTraductor.value == "Ingles-Español") {
                if (inputTranslate.value == element.traduccion) {
                    containerTranslate.innerHTML = element.palabra;
                } else {
                    containerTranslate.innerHTML = "Escriba la palabra en el idioma indicado";
                }
            }
        }
    });
};



const showWords = () => {
    containerDictionary2.innerHTML = ''; // Limpia el contenedor antes de mostrar palabras
    diccionario.forEach(element => {
        revision(element);
    });
};

let filterOne = document.querySelectorAll('#radio');
let filterTwo = document.querySelectorAll('#radio2');

const makeWordSpanish = (element) => {
    const wordSpanish = document.createElement('h2');
    wordSpanish.id = "palabra2";
    wordSpanish.textContent = element.palabra;
    containerDictionary2.appendChild(wordSpanish);
};

const makeWordEnglish = (element) => {
    const wordEnglish = document.createElement('h2');
    wordEnglish.id = "palabra2";
    wordEnglish.textContent = element.traduccion;
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

// Agregar un listener a cada radio button para detectar el cambio
filterOne.forEach(radio => {
    radio.addEventListener('change', showWords);
});

const filterCategoria = () => {
    containerDictionary2.innerHTML = ''; // Limpia el contenedor antes de filtrar

    const selectedCategory = [...filterTwo].find(element => element.checked)?.value;
    const selectedLanguage = [...filterOne].find(element => element.checked)?.value;

    if (selectedCategory && selectedLanguage) {
        // Filtra el diccionario por la categoría seleccionada
        const filteredWords = diccionario.filter(item => item.categoria === selectedCategory);

        if (filteredWords.length > 0) {
            // Verifica si el filtro seleccionado es para palabras o traducciones
            if (selectedLanguage === "palabra") {
                filteredWords.forEach(makeWordSpanish); // Muestra palabras en español
            } else if (selectedLanguage === "traduccion") {
                filteredWords.forEach(makeWordEnglish); // Muestra palabras en inglés
            }
        } else {
            console.log("No hay palabras en esta categoría.");
        }
    }
};


// Añade el evento 'change' a todos los radios
filterTwo.forEach(radio => {
    radio.addEventListener('change', filterCategoria);
});
const displayNoneDictionary = () =>{
    containerDictionary.style.display = 'none';
    setTimeout(() => {
        containerDictionary.style.opacity = 0;  
    }); 
}


const styleDictionary = () => {
    containerDictionary.style.display = 'block';
    setTimeout(() => {
        containerDictionary.style.opacity = 1;  
    },10); 
};

const displayNoneFormulario = () =>{
    containerFormulario.style.display = 'none';
    setTimeout(() => {
        containerFormulario.style.opacity = 0;  
    }); 
}

const styleFormulario = () => {
    containerFormulario.style.display = 'flex';
    setTimeout(() => {
        containerFormulario.style.opacity = 1;  
    },10); 
};

let idWord = 25;

const eventAddWord = () => {
    idWord = idWord + 1;
    setData({ id: idWord, palabra: inputAgregarEspañol.value, traduccion: inputAgregarIngles.value, categoria: selectAgregarPalabra.value });
};

const setData = (info) => {
    diccionario.push(info);
    console.log(diccionario);
};
imagenCerrar.addEventListener('click', displayNoneDictionary)
imagenCerrar2.addEventListener('click', displayNoneFormulario)
btnAgregarPalabra.addEventListener('click', styleFormulario)
btnDictionary.addEventListener('click', styleDictionary);
addWords.addEventListener('click', eventAddWord);
btnTranslate.addEventListener('click', makeTranslate);
