function encodeAndDecodeMessages() {
    const [encodeButton, decodeButton] = document.getElementsByTagName("button");
    const [encodeTextArea, decodeTextArea] = document.getElementsByTagName("textarea");

    // Generic transform function
    const transformText = (text, shift) =>
        text.split('').map(char => String.fromCharCode(char.charCodeAt() + shift)).join('');

    // Encode button
    encodeButton.addEventListener('click', () => {
        decodeTextArea.value = transformText(encodeTextArea.value, 1); // shift +1
        encodeTextArea.value = "";
    });

    // Decode button
    decodeButton.addEventListener('click', () => {
        decodeTextArea.value = transformText(decodeTextArea.value, -1); // shift -1
    });
}
