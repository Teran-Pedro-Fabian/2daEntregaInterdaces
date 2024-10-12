let maxCharacters = 9;  // Número máximo de caracteres que quieres mostrar
let paragraphs = document.querySelectorAll(".text_card");  // Selecciona todos los elementos con la clase "text_card"

// Itera sobre todos los elementos seleccionados
paragraphs.forEach(paragraph => {
    let fullText = paragraph.innerText;

    if (fullText.length > maxCharacters) {
        // Recorta el texto y agrega los "..."
        paragraph.innerText = fullText.substring(0, maxCharacters) + "...";
    }
});