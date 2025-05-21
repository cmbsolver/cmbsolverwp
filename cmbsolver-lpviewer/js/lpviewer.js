/**
 * LP Viewer JavaScript functionality
 */
jQuery(document).ready(function($) {
    // Tab switching functionality
    $('.lpviewer-tab-button').on('click', function() {
        // Remove the active class from all tabs
        $('.lpviewer-tab-button').removeClass('active');
        $('.lpviewer-tab-pane').removeClass('active');

        // Add active class to clicked tab
        $(this).addClass('active');

        // Show corresponding tab content
        const tabId = $(this).data('tab');
        $('#' + tabId).addClass('active');
    });

    // Rune to letter hashmap
    const runeToLetter = {
        'ᛝ': 'ING', 'ᛟ': 'OE', 'ᛇ': 'EO', 'ᛡ': 'IO', 'ᛠ': 'EA', 'ᚫ': 'AE', 'ᚦ': 'TH', 'ᚠ': 'F', 'ᚢ': 'U', 'ᚩ': 'O',
        'ᚱ': 'R', 'ᚳ': 'C', 'ᚷ': 'G', 'ᚹ': 'W', 'ᚻ': 'H', 'ᚾ': 'N', 'ᛁ': 'I', 'ᛄ': 'J', 'ᛈ': 'P', 'ᛉ': 'X', 'ᛋ': 'S',
        'ᛏ': 'T', 'ᛒ': 'B', 'ᛖ': 'E', 'ᛗ': 'M', 'ᛚ': 'L', 'ᛞ': 'D', 'ᚪ': 'A', 'ᚣ': 'Y', '•': ' ', '⊹': '.',
    }

    /**
     * Checks if a rune is a valid rune.
     * @param {string} rune - The rune to check
     * @return {boolean} True if the rune is valid, false otherwise
     */
    function isRune(rune) {
        return runeToLetter.hasOwnProperty(rune);
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

    // Load page content when button is clicked
    $('#lpviewer-load-button').on('click', function() {
        loadPageContent();
    });

    $('#lpviewer-sload-button').on('click', function() {
        loadSectionContent();
    });

    // Initial content load
    loadPageContent();

    /**
     * Load page content based on the selected page
     */
    function loadPageContent() {
        const pageNumber = $('#lpviewer-page-select').val();

        // Clear the image container
        $('#lpviewer-image-container').empty();

        // Load image content
        const imageUrl = `${lpviewer_vars.plugin_url}files/images/${pageNumber}.jpg`;
        console.log(imageUrl);

        // Create the image element
        const img = $('<img>', {
            id: 'lpviewer-image',
            class: 'lpviewer-image',
            src: imageUrl,
            alt: `Page ${pageNumber}`
        });

        // Append the image to the container
        $('#lpviewer-image-container').append(img);

        // Load text with line breaks
        $.ajax({
            url: `${lpviewer_vars.plugin_url}files/text/lb/${pageNumber}.txt`,
            dataType: 'text',
            success: function(data) {
                $('#lpviewer-text-lb').text(data);
            },
            error: function() {
                $('#lpviewer-text-lb').html('<p class="lpviewer-error">Error loading text content. The file may not exist.</p>');
            }
        });

        // Load text without line breaks
        $.ajax({
            url: `${lpviewer_vars.plugin_url}files/text/nlb/${pageNumber}.txt`,
            dataType: 'text',
            success: function(data) {
                $('#lpviewer-text-nlb').text(data);

                const runeglish = transposeRuneToLatin(data);
                $('#lpviewer-runeglish').text(runeglish);
            },
            error: function() {
                $('#lpviewer-text-nlb').html('<p class="lpviewer-error">Error loading text content. The file may not exist.</p>');
            }
        });
    }

    /**
     * Load page content based on the selected page
     */
    function loadSectionContent() {
        const pageNumber = $('#lpviewer-section-select').val();

        // Clear the image container
        $('#lpviewer-image-container').empty();


        // Now we are going to split pageNumber on the -
        const splitPageNumber = pageNumber.split('-');
        for (let i = splitPageNumber[0]; i <= splitPageNumber[1]; i++) {
            const imageUrl = `${lpviewer_vars.plugin_url}files/images/${i}.jpg`;
            console.log(imageUrl);

            const breaker = $('<br />');
            $('#lpviewer-image-container').append(breaker);
            $('#lpviewer-image-container').append(breaker);

            // Create the image element
            const img = $('<img>', {
                id: `lpviewer-image-${i}`,
                class: 'lpviewer-image',
                src: imageUrl,
                alt: `Page ${i}`
            });

            // Append the image to the container
            $('#lpviewer-image-container').append(img);
        }

        // Load text with line breaks
        $.ajax({
            url: `${lpviewer_vars.plugin_url}files/text/sections/${pageNumber}.txt`,
            dataType: 'text',
            success: function(data) {
                $('#lpviewer-text-lb').text(data);
            },
            error: function() {
                $('#lpviewer-text-lb').html('<p class="lpviewer-error">Error loading text content. The file may not exist.</p>');
            }
        });

        // Load text without line breaks
        $.ajax({
            url: `${lpviewer_vars.plugin_url}files/text/sections/${pageNumber}.txt`,
            dataType: 'text',
            success: function(data) {
                $('#lpviewer-text-nlb').text(data);

                const runeglish = transposeRuneToLatin(data);
                $('#lpviewer-runeglish').text(runeglish);
            },
            error: function() {
                $('#lpviewer-text-nlb').html('<p class="lpviewer-error">Error loading text content. The file may not exist.</p>');
            }
        });
    }
});