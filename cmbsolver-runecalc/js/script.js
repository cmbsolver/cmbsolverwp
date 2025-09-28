jQuery(document).ready(function($) {
    // Tab switching functionality
    $('.tab-button').on('click', function() {
        // Remove the active class from all tabs
        $('.tab-button').removeClass('active');
        $('.tab-pane').removeClass('active');

        // Add active class to clicked tab
        $(this).addClass('active');

        // Show corresponding tab content
        const tabId = $(this).data('tab');
        $('#' + tabId).addClass('active');
    });

    // Add rune button generation code
    const runes = [
        'ᚪ/A', 'ᚫ/AE', 'ᛒ/B', 'ᚳ/C', 'ᛞ/D', 'ᛖ/E', 'ᛠ/EA', 'ᛇ/EO', 'ᚠ/F',
        'ᚷ/G', 'ᚻ/H', 'ᛁ/I', 'ᛡ/IO', 'ᛝ/ING', 'ᛄ/J', 'ᛚ/L', 'ᛗ/M', 'ᚾ/N',
        'ᚩ/O', 'ᛟ/OE', 'ᛈ/P', 'ᚱ/R', 'ᛋ/S', 'ᛏ/T', 'ᚦ/TH', 'ᚢ/U', 'ᚹ/W',
        'ᛉ/X', 'ᚣ/Y'
    ];

    const runeButtonsContainer = $('.rune-buttons');
    runes.forEach(rune => {
        $('<button>', {
            class: 'button rune-button',
            text: rune
        }).appendTo(runeButtonsContainer);
    });

    // Add special buttons generation code
    const specialButtons = [
        { text: 'Clear', onclick: 'clearAll()' },
        { text: '•' },
        { text: '\'' },
        { text: '"' },
        { text: '⊹' }
    ];

    // Generate special buttons
    const specialButtonsContainer = $('.special-buttons');
    specialButtons.forEach(button => {
        const $button = $('<button>', {
            class: 'button',
            text: button.text
        });

        if (button.onclick) {
            $button.attr('onclick', button.onclick);
        }

        specialButtonsContainer.append($button);
    });

    // Handle rune button clicks
    $('.rune-button').click(function() {
        const rune = $(this).text();
        const runeOnly = rune.split('/')[0];
        const textarea = $('#input-area');
        const cursorPos = textarea[0].selectionStart;
        const textBefore = textarea.val().substring(0, cursorPos);
        const textAfter = textarea.val().substring(cursorPos);

        const runeText = textBefore + runeOnly + textAfter;
        textarea.val(runeText);
        textarea.focus();
        textarea[0].selectionStart = textarea[0].selectionEnd = cursorPos + 1;

        const runeglishText = transposeRuneToLatin(runeText);
        const gemSum = sumAllRuneValues(runeText);

        const runeValues = getRuneValues(runeText);
        const runeValuesText = runeValues.join(', ');

        let distinctRunesText = getDistinctRuneText(runeText);
        let doubletText = getDoubletsText(runeText);

        // Update results (this is just a placeholder)
        $('#runes-result').text(runeText);
        $('#runeglish-result').text(runeglishText);
        updateGematriaDisplay(gemSum);
        $('#wordcount-result').text(getWordCount(runeText));
        $('#runevalues-result').text(runeValuesText);
        $('#runecount-result').text(runeValues.length);
        $('#totalcount-result').text(runeText.length);
        $('#distinct-runes-result').text(distinctRunesText);
        $('#doublets-result').text(doubletText);
        updateGPView(runeText);
        updateLucasView(runeText);
        updateFibView(runeText);
        updateTotientView(runeText, gemSum);
        updateIocTexts();
    });

    // Handle special character buttons
    $('.special-buttons button').click(function() {
        if ($(this).text() === 'Clear') {
            clearAll();
            return;
        }

        const char = $(this).text();
        const textarea = $('#input-area');
        const cursorPos = textarea[0].selectionStart;
        const textBefore = textarea.val().substring(0, cursorPos);
        const textAfter = textarea.val().substring(cursorPos);

        textarea.val(textBefore + char + textAfter);
        textarea.focus();
        textarea[0].selectionStart = textarea[0].selectionEnd = cursorPos + 1;
    });

    // Handle load button click
    $('#load-button').click(function() {
        let runeText = '';
        let runeglishText = '';
        const input = $('#input-area').val();
        const conversionType = $('#conversion-type').val();
        const isReversed = $('#reverse-checkbox').is(':checked');

        if (conversionType === 'from-latin') {
            if (isReversed) {
                const tempText = reverseWords(input);
                runeglishText = prepLatinToRune(tempText);
                runeText = transposeLatinToRune(runeglishText);
            } else {
                runeglishText = prepLatinToRune(input);
                runeText = transposeLatinToRune(runeglishText);
            }
        } else {
            if (isReversed) {
                runeText = reverseWords(input);
                runeglishText = transposeRuneToLatin(runeText);
            } else {
                runeText = input;
                runeglishText = transposeRuneToLatin(runeText);
            }

        }

        const gemSum = sumAllRuneValues(runeText);
        const runeValues = getRuneValues(runeText);
        const runeValuesText = runeValues.join(', ');
        let distinctRunesText = getDistinctRuneText(runeText);
        let doubletText = getDoubletsText(runeText);

        // Update results (this is just a placeholder)
        $('#runes-result').text(runeText);
        $('#runeglish-result').text(runeglishText);
        updateGematriaDisplay(gemSum);
        $('#wordcount-result').text(getWordCount(runeText));
        $('#runevalues-result').text(runeValuesText);
        $('#runecount-result').text(runeValues.length);
        $('#totalcount-result').text(runeText.length);
        $('#distinct-runes-result').text(distinctRunesText);
        $('#doublets-result').text(doubletText);
        updateGPView(runeText);
        updateLucasView(runeText);
        updateFibView(runeText);
        updateTotientView(runeText, gemSum);
        updateIocTexts();
    });
});

function clearAll() {
    // Clear the input textarea
    jQuery('#input-area').val('');
    
    // Clear all result content elements
    jQuery('.result-content').text('');
    jQuery('.rune-result-content').text('');
    jQuery('#runes-result').html('');
    jQuery('#runeglish-result').html('');
    jQuery('#gematria-result').html('');
    jQuery('#wordcount-result').text('');
    jQuery('#runecount-result').text('');
    jQuery('#totalcount-result').text('');
    jQuery('#runevalues-result').text('');
    jQuery('#distinct-runes-result').text('');
    jQuery('#doublets-result').text('');
    
    // Reset checkbox if exists
    if (jQuery('#reverse-checkbox').length) {
        jQuery('#reverse-checkbox').prop('checked', false);
    }
    
    // Reset conversion type dropdown if exists
    if (jQuery('#conversion-type').length) {
        jQuery('#conversion-type').val('from-latin');
    }
    
    // Clear the GP visualization
    updateGPView('');
    updateLucasView('');
    updateFibView('');
    updateTotientView('', 0);
    
    // Add a small notification that everything was cleared
    const snackbar = jQuery('#snackbar');
    if (snackbar.length) {
        snackbar.text('All content cleared');
        snackbar.addClass('show');
        setTimeout(function(){ snackbar.removeClass('show'); }, 3000);
    }
}

const runeToValue = {
    'ᛝ': 79, 'ᛟ': 83, 'ᛇ': 41, 'ᛡ': 107, 'ᛠ': 109, 'ᚫ': 101, 'ᚦ': 5, 'ᚠ': 2,
    'ᚢ': 3, 'ᚩ': 7, 'ᚱ': 11, 'ᚳ': 13, 'ᚷ': 17, 'ᚹ': 19, 'ᚻ': 23, 'ᚾ': 29,
    'ᛁ': 31, 'ᛄ': 37, 'ᛈ': 43, 'ᛉ': 47, 'ᛋ': 53, 'ᛏ': 59, 'ᛒ': 61, 'ᛖ': 67,
    'ᛗ': 71, 'ᛚ': 73, 'ᛞ': 89, 'ᚪ': 97, 'ᚣ': 103
}

/**
 * Gets the value of a rune.
 * @param {string} rune - The rune to get the value of
 * @return {number} The value of the rune
 */
function getRuneValue(rune) {
    // if the rune is not in the hashmap, return 0
    if (!runeToValue.hasOwnProperty(rune)) {
        return 0;
    } else {
        return runeToValue[rune];
    }
}

// Rune conversion functions
const letterToRune = {
    'ING': 'ᛝ', 'NG': 'ᛝ', 'OE': 'ᛟ', 'EO': 'ᛇ', 'IO': 'ᛡ', 'IA': 'ᛡ', 'EA': 'ᛠ', 'AE': 'ᚫ', 'TH': 'ᚦ', 'F': 'ᚠ',
    'V': 'ᚢ', 'U': 'ᚢ', 'O': 'ᚩ', 'R': 'ᚱ', 'Q': 'ᚳ', 'K': 'ᚳ', 'C': 'ᚳ', 'G': 'ᚷ', 'W': 'ᚹ', 'H': 'ᚻ', 'N': 'ᚾ',
    'I': 'ᛁ', 'J': 'ᛄ', 'P': 'ᛈ', 'X': 'ᛉ', 'Z': 'ᛋ', 'S': 'ᛋ', 'T': 'ᛏ', 'B': 'ᛒ', 'E': 'ᛖ', 'M': 'ᛗ', 'L': 'ᛚ',
    'D': 'ᛞ', 'A': 'ᚪ', 'Y': 'ᚣ', ' ': '•', '.': '⊹',
}

/**
 * Converts a letter to a rune.
 * @param letter
 * @returns {string}
 */
function getRuneFromLetter(letter) {
    if (!letterToRune.hasOwnProperty(letter)) {
        return letter;
    } else {
        return letterToRune[letter];
    }
}

// Rune to letter hashmap
const runeToLetter = {
    'ᛝ': 'ING', 'ᛟ': 'OE', 'ᛇ': 'EO', 'ᛡ': 'IO', 'ᛠ': 'EA', 'ᚫ': 'AE', 'ᚦ': 'TH', 'ᚠ': 'F', 'ᚢ': 'U', 'ᚩ': 'O',
    'ᚱ': 'R', 'ᚳ': 'C', 'ᚷ': 'G', 'ᚹ': 'W', 'ᚻ': 'H', 'ᚾ': 'N', 'ᛁ': 'I', 'ᛄ': 'J', 'ᛈ': 'P', 'ᛉ': 'X', 'ᛋ': 'S',
    'ᛏ': 'T', 'ᛒ': 'B', 'ᛖ': 'E', 'ᛗ': 'M', 'ᛚ': 'L', 'ᛞ': 'D', 'ᚪ': 'A', 'ᚣ': 'Y', '•': ' ', '⊹': '.',
}

/**
 * Converts a rune to a letter.
 * @param {string} rune - The rune to convert
 * @return {string} The converted letter
 */
function getLetterFromRune(rune) {
    // if the rune is not in the hashmap, return the character itself
    if (!runeToLetter.hasOwnProperty(rune)) {
        return rune;
    } else {
        return runeToLetter[rune];
    }
}

/**
 * Checks if a rune is a valid rune.
 * @param {string} rune - The rune to check
 * @return {boolean} True if the rune is valid, false otherwise
 */
function isRune(rune) {
    return runeToLetter.hasOwnProperty(rune);
}

function isDinkus(rune) {
    return rune === '⊹' || rune === '•';
}

/**
 * Converts Latin text to a format suitable for rune conversion.
 * @param {string} text - The input text to convert
 * @return {string} The converted text
 */
function prepLatinToRune(text) {
    // Convert to uppercase
    text = text.toUpperCase();

    // Replace specific letter combinations
    text = text.replaceAll("QU", "CW");
    text = text.replaceAll("Z", "S");
    text = text.replaceAll("K", "C");
    text = text.replaceAll("Q", "C");
    text = text.replaceAll("V", "U");

    // Process special cases with 'I'
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const xchar = text[i];

        if (xchar === 'I') {
            if (i + 1 < text.length && (text[i + 1] === 'O' || text[i + 1] === 'A')) {
                result += "IO";
                i++;  // Skip the next character as we've handled it
            } else {
                result += 'I';
            }
        } else {
            result += xchar;
        }
    }

    return result;
}

/**
* Transposes latin to rune
* @param {string} text - The input text to convert
* @return {string} The converted text
*/
function transposeLatinToRune(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const xchar = text[i];
        if (!isRune(xchar)) {
            switch (xchar) {
                case 'A':
                    if (i + 1 < text.length && text[i + 1] === 'E') {
                        result += getRuneFromLetter("AE");
                        i++
                    } else {
                        result += getRuneFromLetter("A");
                    }
                    break;
                case 'E':
                    if (i + 1 < text.length && text[i + 1] === 'A') {
                        result += getRuneFromLetter("EA");
                        i++
                    } else if (i + 1 < text.length && text[i + 1] === 'O') {
                        result += getRuneFromLetter("EO");
                        i++
                    } else {
                        result += getRuneFromLetter("E");
                    }
                    break;
                case 'O':
                    if (i + 1 < text.length && text[i + 1] === 'E') {
                        result += getRuneFromLetter("OE");
                        i++
                    } else {
                        result += getRuneFromLetter("O");
                    }
                    break;
                case 'T':
                    if (i + 1 < text.length && text[i + 1] === 'H') {
                        result += getRuneFromLetter("TH");
                        i++
                    } else {
                        result += getRuneFromLetter("T");
                    }
                    break;
                case 'I':
                    if (i + 1 < text.length && text[i + 1] === 'O') {
                        result += getRuneFromLetter("IO");
                        i++
                    } else if (i + 2 < text.length && text[i + 1] === 'N' && text[i + 2] === 'G') {
                        result += getRuneFromLetter("ING");
                        i += 2
                    } else if (i + 1 < text.length && text[i + 1] === 'A') {
                        result += getRuneFromLetter("IA");
                        i++
                    } else {
                        result += getRuneFromLetter("I");
                    }
                    break;
                case 'N':
                    if (i + 1 < text.length && text[i + 1] === 'G') {
                        result += getRuneFromLetter("NG");
                        i++
                    } else {
                        result += getRuneFromLetter("N");
                    }
                    break;
                default:
                    result += getRuneFromLetter(xchar);
                    break;
            }
        } else {
            result += xchar;
        }
    }

    return result;
}

/**
 * Transposes runes to latin text.
 * @param text
 * @returns {string}
 */
function transposeRuneToLatin(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const xchar = text[i];
        if (isRune(xchar)) {
            result += getLetterFromRune(xchar);
        } else {
            result += xchar;
        }
    }
    return result;
}

/**
 * Sums all rune values in a string.
 * @param text
 * @returns {number}
 */
function sumAllRuneValues(text) {
    let result = 0;
    for (let i = 0; i < text.length; i++) {
        const xchar = text[i];
        if (isRune(xchar)) {
            result += getRuneValue(xchar);
        }
    }
    return result;
}

/**
 * Gets the word count in a string.
 * @param text
 */
function getWordCount(text) {
    let result = 0;
    const tmpText = text.replaceAll('⊹', '•')
    const words = tmpText.split('•');
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (word.length > 0) {
            result++;
        }
    }

    return result;
}

/**
 * Gets all rune values in a string.
 * @param text
 * @returns {number[]}
 */
function getRuneValues(text) {
    const result = [];
    for (let i = 0; i < text.length; i++) {
        const xchar = text[i];
        const runeValue = getRuneValue(xchar);
        if (runeValue > 0) {
            result.push(runeValue);
        }
    }
    return result;
}

/**
 * Adds copy buttons to all result rows.
 */
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const resultContent = this.closest('.result-row').querySelector('.result-content');
            const textToCopy = resultContent.textContent;

            try {
                await navigator.clipboard.writeText(textToCopy);

                // Get the snackbar DIV
                const x = document.getElementById("snackbar");

                // Add the "show" class to DIV
                x.className = "show";

                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

            } catch (err) {
                console.error('Failed to copy text:', err);
                button.style.color = '#f44336'; // Error red
            }
        });
    });
});

/**
 * Checks if a number is prime
 * @param {number} num - The number to check
 * @returns {boolean}
 */
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

/**
 * Checks if a number is emirp (prime when reversed and different from original)
 * @param {number} num - The number to check
 * @returns {boolean}
 */
function isEmirp(num) {
    if (!isPrime(num)) return false;
    const reversedNum = parseInt(num.toString().split('').reverse().join(''));
    return reversedNum !== num && isPrime(reversedNum);
}

/**
 * Checks if a number is fibonacci
 * @param num
 * @returns {boolean}
 */
function isCircularPrime(num) {
    if (!isPrime(num)) return false;

    const numStr = num.toString();
    const len = numStr.length;

    // Check all rotations
    for (let i = 0; i < len; i++) {
        // Create rotation by moving first digit to end
        const rotation = parseInt(numStr.slice(i) + numStr.slice(0, i));
        if (!isPrime(rotation)) return false;
    }

    return true;
}

/**
 * Calculate word value
 * @param word
 * @returns {number}
 */
function calculateWordValue(word) {
    let sum = 0;
    for (let i = 0; i < word.length; i++) {
        const runeValue = getRuneValue(word[i]);
        sum += runeValue;
    }
    return sum;
}

/**
 * Function to update the GP View
 */
function updateGPView(inputText) {
    const gpContainer = document.getElementById('gp-visualization');
    // Clear the container
    gpContainer.innerHTML = '';

    if (!inputText.trim()) return;

    // Split into lines by newline ⊹, or . character
    const lines = inputText.split(/[\n\.\⊹\␍\␗\␊]/);

    lines.forEach(line => {
        if (!line.trim()) return; // Skip empty lines

        // Create a line container
        const lineDiv = document.createElement('div');
        lineDiv.className = 'gp-line';

        // Split the line into words
        const words = line.trim().split(/[\s•]+/);

        let lineSum = 0;

        // Process each word
        words.forEach(word => {
            if (!word.trim()) return; // Skip empty words

            // Calculate word value
            const wordValue = calculateWordValue(word);
            const latin = transposeRuneToLatin(word);
            lineSum += wordValue;

            // Determine color coding
            let boxClass = 'gp-word-nonprime';
            if (isEmirp(wordValue)) {
                boxClass = 'gp-word-emirp';
            } else if (isPrime(wordValue)) {
                boxClass = 'gp-word-prime';
            }

            if (isCircularPrime(wordValue)) {
                boxClass = 'gp-word-circular-prime';
            }

            // Create the word box
            const wordBox = document.createElement('div');
            wordBox.className = `gp-word-box ${boxClass}`;
            wordBox.title = `Value: ${wordValue}`;

            // Create and append text element
            const wordText = document.createElement('div');
            wordText.className = 'gp-word-text';
            wordText.textContent = latin + ' (' + word + ')';
            wordBox.appendChild(wordText);

            // Create and append value element
            const wordValueElement = document.createElement('div');
            wordValueElement.className = 'gp-word-value';
            wordValueElement.textContent = wordValue;
            wordBox.appendChild(wordValueElement);

            lineDiv.appendChild(wordBox);
        });

        // Add the line sum at the end
        const lineSumElement = document.createElement('div');
        lineSumElement.className = 'gp-line-sum-nonprime';

        if (isPrime(lineSum)) {
            lineSumElement.className = 'gp-line-sum-prime';
        }

        if (isEmirp(lineSum)) {
            lineSumElement.className = 'gp-line-sum-emirp';
        }

        if (isCircularPrime(lineSum)) {
            lineSumElement.className = 'gp-line-sum-circular-prime';
        }

        lineSumElement.textContent = `Line Sum: ${lineSum}`;
        lineDiv.appendChild(lineSumElement);

        gpContainer.appendChild(lineDiv);
    });
}

/**
 * Function to update the Fibonacci View
 */
function updateFibView(inputText) {
    const gpContainer = document.getElementById('fib-visualization');
    // Clear the container
    gpContainer.innerHTML = '';

    if (!inputText.trim()) return;

    // Split into lines by newline ⊹, or . character
    const lines = inputText.split(/[\n\.\⊹\␍\␗\␊]/);

    lines.forEach(line => {
        if (!line.trim()) return; // Skip empty lines

        // Create a line container
        const lineDiv = document.createElement('div');
        lineDiv.className = 'gp-line';

        // Split the line into words
        const words = line.trim().split(/[\s•]+/);

        let lineSum = 0;

        // Process each word
        words.forEach(word => {
            if (!word.trim()) return; // Skip empty words

            // Calculate word value
            const wordValue = calculateWordValue(word);
            const latin = transposeRuneToLatin(word);
            lineSum += wordValue;

            // Determine color coding
            let boxClass = 'gp-word-nonprime';
            if (isFibonacciNumer(wordValue)) {
                boxClass = 'gp-word-circular-prime';
            }

            // Create the word box
            const wordBox = document.createElement('div');
            wordBox.className = `gp-word-box ${boxClass}`;
            wordBox.title = `Value: ${wordValue}`;

            // Create and append text element
            const wordText = document.createElement('div');
            wordText.className = 'gp-word-text';
            wordText.textContent = latin + ' (' + word + ')';
            wordBox.appendChild(wordText);

            // Create and append value element
            const wordValueElement = document.createElement('div');
            wordValueElement.className = 'gp-word-value';
            wordValueElement.textContent = wordValue;
            wordBox.appendChild(wordValueElement);

            lineDiv.appendChild(wordBox);
        });

        // Add the line sum at the end
        const lineSumElement = document.createElement('div');
        lineSumElement.className = 'gp-line-sum-nonprime';

        if (isFibonacciNumer(lineSum)) {
            lineSumElement.className = 'gp-line-sum-circular-prime';
        }

        lineSumElement.textContent = `Line Sum: ${lineSum}`;
        lineDiv.appendChild(lineSumElement);

        gpContainer.appendChild(lineDiv);
    });
}

/**
 * Function to update the Lucas View
 */
function updateLucasView(inputText) {
    const gpContainer = document.getElementById('lucas-visualization');
    // Clear the container
    gpContainer.innerHTML = '';

    if (!inputText.trim()) return;

    // Split into lines by newline ⊹, or . character
    const lines = inputText.split(/[\n\.\⊹\␍\␗\␊]/);

    lines.forEach(line => {
        if (!line.trim()) return; // Skip empty lines

        // Create a line container
        const lineDiv = document.createElement('div');
        lineDiv.className = 'gp-line';

        // Split the line into words
        const words = line.trim().split(/[\s•]+/);

        let lineSum = 0;

        // Process each word
        words.forEach(word => {
            if (!word.trim()) return; // Skip empty words

            // Calculate word value
            const wordValue = calculateWordValue(word);
            const latin = transposeRuneToLatin(word);
            lineSum += wordValue;

            // Determine color coding
            let boxClass = 'gp-word-nonprime';
            if (isLucasNumber(wordValue)) {
                boxClass = 'gp-word-circular-prime';
            }

            // Create the word box
            const wordBox = document.createElement('div');
            wordBox.className = `gp-word-box ${boxClass}`;
            wordBox.title = `Value: ${wordValue}`;

            // Create and append text element
            const wordText = document.createElement('div');
            wordText.className = 'gp-word-text';
            wordText.textContent = latin + ' (' + word + ')';
            wordBox.appendChild(wordText);

            // Create and append value element
            const wordValueElement = document.createElement('div');
            wordValueElement.className = 'gp-word-value';
            wordValueElement.textContent = wordValue;
            wordBox.appendChild(wordValueElement);

            lineDiv.appendChild(wordBox);
        });

        // Add the line sum at the end
        const lineSumElement = document.createElement('div');
        lineSumElement.className = 'gp-line-sum-nonprime';

        if (isLucasNumber(lineSum)) {
            lineSumElement.className = 'gp-line-sum-circular-prime';
        }

        lineSumElement.textContent = `Line Sum: ${lineSum}`;
        lineDiv.appendChild(lineSumElement);

        gpContainer.appendChild(lineDiv);
    });
}

/**
 * Function to update the Totient View
 */
function updateTotientView(inputText, gemSum) {
    const sigma = calculateTotientValue(gemSum);

    const sigmaContainer = document.getElementById('totient-sigma');
    sigmaContainer.innerHTML = `φ(${gemSum}) = ${sigma.count}`;

    const sigmaCoprimes = document.getElementById('totient-coprimes');
    sigmaCoprimes.innerHTML = `Coprimes: ${sigma.coprimes.join(', ')}`;

    const gpContainer = document.getElementById('totient-visualization');
    // Clear the container
    gpContainer.innerHTML = '';

    if (!inputText.trim()) return;

    // Split into lines by newline ⊹, or . character
    const lines = inputText.split(/[\n\.\⊹\␍\␗\␊]/);

    lines.forEach(line => {
        if (!line.trim()) return; // Skip empty lines

        // Create a line container
        const lineDiv = document.createElement('div');
        lineDiv.className = 'gp-line';

        // Split the line into words
        const words = line.trim().split(/[\s•]+/);

        let lineSum = 0;

        // Process each word
        words.forEach(word => {
            if (!word.trim()) return; // Skip empty words

            // Calculate word value
            const wordValue = calculateWordValue(word);
            const latin = transposeRuneToLatin(word);
            lineSum += wordValue;

            // Determine color coding
            let boxClass = 'gp-word-nonprime';
            if (sigma.coprimes.includes(wordValue)) {
                boxClass = 'gp-word-circular-prime';
            }

            // Create the word box
            const wordBox = document.createElement('div');
            wordBox.className = `gp-word-box ${boxClass}`;
            wordBox.title = `Value: ${wordValue}`;

            // Create and append text element
            const wordText = document.createElement('div');
            wordText.className = 'gp-word-text';
            wordText.textContent = latin + ' (' + word + ')';
            wordBox.appendChild(wordText);

            // Create and append value element
            const wordValueElement = document.createElement('div');
            wordValueElement.className = 'gp-word-value';
            wordValueElement.textContent = wordValue;
            wordBox.appendChild(wordValueElement);

            lineDiv.appendChild(wordBox);
        });

        // Add the line sum at the end
        const lineSumElement = document.createElement('div');
        lineSumElement.className = 'gp-line-sum-nonprime';

        if (sigma.coprimes.includes(lineSum)) {
            lineSumElement.className = 'gp-line-sum-circular-prime';
        }

        lineSumElement.textContent = `Line Sum: ${lineSum}`;
        lineDiv.appendChild(lineSumElement);

        gpContainer.appendChild(lineDiv);
    });
}

// Function to calculate GCD (Greatest Common Divisor)
function gcd(a, b) {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// Function to calculate totient value
function calculateTotientValue(n) {
    if (n === 0) return { count: 0, coprimes: [] };
    if (n === 1) return { count: 1, coprimes: [] };

    let count = 1; // 1 is always coprime
    let coprimes = [1];

    for (let i = 2; i < n; i++) {
        if (gcd(i, n) === 1) {
            count++;
            coprimes.push(i);
        }
    }

    return {
        count: count,
        coprimes: coprimes
    };
}

/**
 * Function to detect if a number is Fibonacci
 * @param value
 * @returns {boolean}
 */
function isFibonacciNumer(value) {
    // Handle edge cases
    if (value < 0) return false;
    if (value === 0 || value === 1) return true;

    // A number is Fibonacci if and only if one of (5n^2 + 4) or (5n^2 - 4) is a perfect square
    const test1 = 5 * value * value + 4;
    const test2 = 5 * value * value - 4;

    const perfectSquare1 = Math.sqrt(test1);
    const perfectSquare2 = Math.sqrt(test2);

    return Number.isInteger(perfectSquare1) || Number.isInteger(perfectSquare2);
}

/**
 * Function to detect if a number is Lucas
 * @param value
 * @returns {boolean}
 */
function isLucasNumber(value) {
    // Handle edge cases
    if (value < 0) return false;
    if (value === 2 || value === 1) return true;

    // Initialize first two numbers of Lucas sequence
    let a = 2;  // L(0) = 2
    let b = 1;  // L(1) = 1

    // Generate Lucas numbers until we reach or exceed the target value
    while (b <= value) {
        if (b === value) return true;

        // Calculate next Lucas number
        const temp = a + b;
        a = b;
        b = temp;
    }

    return false;
}

/**
 * updated the gematria sum display
 * @param sum
 */
function updateGematriaDisplay(sum) {
    const gematriaDiv = document.getElementById('gematria-result');
    let displayText = sum.toString();

    if (isPrime(sum)) {
        displayText += ' <span class="number-indicator prime" title="Prime">✓ Prime</span>';
    }

    if (isEmirp(sum)) {
        displayText += ' <span class="number-indicator emirp" title="Emirp">✓ Emirp</span>';
    }

    if (isCircularPrime(sum)) {
        displayText += ' <span class="number-indicator circular" title="Circular Prime">✓ Circular</span>';
    }

    gematriaDiv.innerHTML = displayText;
}

/**
 * Updates the gematria sum for the given text.
 */
function updateIocTexts() {
    const resultDiv = document.getElementById('runes-result');
    const resultIoC = calcIOC(resultDiv.textContent, AlphabetType.Rune);
    const displayResultText = resultDiv.textContent + ' <span class="ioc-text ioc" title="IOC">IOC: ' + resultIoC.toFixed(6) + '</span>';
    document.getElementById('runes-result').innerHTML = displayResultText;

    const runeglishDiv = document.getElementById('runeglish-result');
    const runeglishIoC = calcIOC(runeglishDiv.textContent, AlphabetType.Runeglish);
    const displayRuneglishText = runeglishDiv.textContent + ' <span class="ioc-text ioc" title="IOC">IOC: ' + runeglishIoC.toFixed(6) + '</span>';
    document.getElementById('runeglish-result').innerHTML = displayRuneglishText;
}

// AlphabetType enum equivalent
const AlphabetType = {
    Latin: 0,
    Runeglish: 1,
    Rune: 2
};

/**
 * Returns the character set corresponding to the specified alphabet type
 * @param {number} alphabetType - The type of alphabet to use
 * @returns {string[]} Array of individual characters in the alphabet
 */
function getAlphabet(alphabetType) {
    let retval = "";

    switch (alphabetType) {
        case AlphabetType.Latin:
            retval = "abcdefghijklmnopqrstuvwxyz";
            break;
        case AlphabetType.Runeglish:
            retval = "abcdefghijlmnoprstuwxy";
            break;
        case AlphabetType.Rune:
            retval = "ᛝᛟᛇᛡᛠᚫᚦᚠᚢᚩᚱᚳᚷᚹᚻᚾᛁᛄᛈᛉᛋᛏᛒᛖᛗᛚᛞᚪᚣ";
            break;
        default:
            retval = "abcdefghijklmnopqrstuvwxyz";
    }

    return retval.split("");
}

/**
 * Calculates the incidence of coincidence for the given text using the provided alphabet.
 * The incidence of coincidence is a measure used in cryptanalysis that
 * reflects the likelihood of randomly selecting the same letter twice from a text.
 * It returns a number between 0 and 1.
 *
 * @param {string} text - The text to analyze
 * @param {number} alphabetType - The type of alphabet to use
 * @returns {number} The Index of Coincidence value
 */
function calcIOC(text, alphabetType) {
    // Get the alphabet
    const alphabet = getAlphabet(alphabetType);

    // Create a set for faster character lookup
    const validChars = new Set(alphabet);

    // Create a map to count occurrences of each letter
    const counts = new Map();

    // Count only characters in our alphabet
    let totalLetters = 0;
    for (const char of text.toLowerCase()) {
        if (validChars.has(char)) {
            counts.set(char, (counts.get(char) || 0) + 1);
            totalLetters++;
        }
    }

    // If there are fewer than 2 letters, return 0
    if (totalLetters <= 1) {
        return 0.0;
    }

    // Calculate the sum of frequencies squared
    let sum = 0.0;
    for (const count of counts.values()) {
        sum += count * count;
    }

    // Calculate and return the IOC
    return sum / (totalLetters * (totalLetters - 1));
}

/**
 * Returns a set of unique runes found in the input text.
 * @param {string} runeText - The text containing runes to analyze
 * @returns {Map<string, number>} A set containing all unique runes found in the text
 */
function getDistinctRunes(runeText) {
    const runeArray = new Map;
    for (let i = 0; i < runeText.length; i++) {
        const rune = runeText[i];
        if (!runeArray.has(rune)) {
            if (isRune(rune) && !isDinkus(rune)) {
                runeArray.set(rune, 1);
            }
        } else {
            if (isRune(rune) && !isDinkus(rune)) {
                runeArray.set(rune, runeArray.get(rune) + 1);
            }
        }
    }


    // Convert Map entries to array, sort by count values (descending), and create new Map
    return new Map([...runeArray.entries()].sort((a, b) => b[1] - a[1]));
}

/**
 * Gets the distinct rune text
 * @param runeText
 * @returns {string}
 */
function getDistinctRuneText(runeText) {
    const distinctRunes = getDistinctRunes(runeText);
    let distinctRunesText = '';
    let firstIteration = true;
    for (const distinctRune of distinctRunes) {
        const myRuneValue = getRuneValue(distinctRune[0]);
        const isPrimeValue = isPrime(distinctRune[1]);
        const isPrimeChar = isPrimeValue ? ' Is Prime' : '';
        const separator = firstIteration ? '' : ', ';
        if (myRuneValue === distinctRune[1]) {
            distinctRunesText += separator + distinctRune[0] + '* (' + distinctRune[1] + isPrimeChar + ')';
        } else {
            distinctRunesText += separator + distinctRune[0] + '(' + distinctRune[1] + isPrimeChar + ')';
        }
        firstIteration = false;
    }

    return distinctRunesText;
}

/**
 * Returns a set of runes with doublets.
 * @param {string} runeText - The text containing runes to analyze
 * @returns {Map<string, number>} A set containing all unique runes found in the text
 */
function getDoublets(runeText) {
    const runeArray = new Map;
    let i = 0
    while (i < runeText.length) {
        const rune = runeText[i];
        let nextRune = '';
        if (i + 1 <= runeText.length) {
            nextRune = runeText[i + 1];
        }

        if (isRune(rune) && !isDinkus(rune)) {
            if (rune === nextRune) {
                i++;
                if (runeArray.has(rune)) {
                    runeArray.set(rune, runeArray.get(rune) + 1);
                } else {
                    runeArray.set(rune, 1);
                }
            }
        }

        i++;
    }

    return runeArray;
}

/**
 * Get the doublets text
 * @param runeText
 * @returns {string}
 */
function getDoubletsText(runeText) {
    const doublets = getDoublets(runeText);

    if (doublets === undefined || doublets.size === 0) return ('No doublets found.')

    let doubletText = '';
    let firstIteration = true;
    for (const doublet of doublets) {
        const myRuneValue = getRuneValue(doublet[0]);
        const isPrimeValue = isPrime(doublet[1]);
        const isPrimeChar = isPrimeValue ? ' Is Prime' : '';
        const separator = firstIteration ? '' : ', ';
        if (myRuneValue === doublet[1]) {
            doubletText += separator + doublet[0] + '* (' + doublet[1] + isPrimeChar + ')';
        } else {
            doubletText += separator + doublet[0] + '(' + doublet[1] + isPrimeChar + ')';
        }
        firstIteration = false;
    }

    return doubletText;
}

/**
 * Return if it a separator.
 * @param char
 * @returns {boolean}
 */
function isSeperator(char) {
    if (char === ' ' || char === '\n' || char === '\r' || char === '.' || char === '!' || char === '|' ||
        char === '[' || char === ']' || char === '{' || char === '}' || char === '(' || char === ')' || char === '-' ||
        char === '&' || char === '%' || char === '$' || char === '#' || char === '@' || char === '_' ||
        char === '=' || char === '+' || char === '*' || char === '^' || char === '"' || char === '␍' || char === '␊' ||
        char === '␗') {
        return true;
    } else {
        return false;
    }
}

/**
 * Reverses a string character by character.
 *
 * @param {string} text - The string to reverse
 * @returns {string} The reversed string
 * @private
 */
function reverseString(text) {
    return [...text].reverse().join('');
}

/**
 * Reverses each word in a text while preserving separators.
 *
 * @param {string} text - The text to process
 * @returns {string} The text with reversed words
 * @private
 */

// Initialize expandable sections
document.addEventListener('DOMContentLoaded', function() {
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    
    expandableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const button = this.querySelector('.expand-button');
            
            content.classList.toggle('collapsed');
            
            if (content.classList.contains('collapsed')) {
                button.textContent = '▼';
            } else {
                button.textContent = '▲';
            }
        });
    });
});

function reverseWords(text) {
    const retval = [];
    const charArray = [...text];
    let sb = '';

    for (let i = 0; i < charArray.length; i++) {
        if (isSeperator(charArray[i]) || isDinkus(charArray[i])) {
            retval.push(reverseString(sb));
            retval.push(charArray[i]);
            sb = '';
        } else {
            sb += charArray[i];
        }
    }

    if (sb.length > 0) {
        retval.push(reverseString(sb));
    }

    return retval.join('');
}