
<?php
/*
Plugin Name: CMB Solver Rune Calculator
Description: A rune calculation tool with conversion capabilities
Version: 1.0
Author: Your Name
*/

// Prevent direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue necessary scripts and styles
function cmbsolver_runecalc_scripts() {
    wp_enqueue_style('cmbsolver-runecalc-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('cmbsolver-runecalc-script', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'cmbsolver_runecalc_scripts');

// Create shortcode for the calculator
function cmbsolver_runecalc_shortcode() {
    ob_start();
    ?>
    <div class="runecalc-container">
        <!-- Input Area -->
        <textarea id="input-area" rows="4" class="wide-input"></textarea>

        <!-- Conversion Type -->
        <div class="conversion-row">
            <select id="conversion-type">
                <option value="from-latin">from latin</option>
                <option value="from-rune">from rune</option>
            </select>
            <button id="load-button" class="button">Load</button>
        </div>

        <!-- Results Area -->
        <div class="results-area">
            <div class="result-row">
                <button class="copy-button" aria-label="Copy to clipboard">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <div class="result-label">Runes:</div>
                <div id="runes-result" class="result-content"></div>
            </div>
            <div class="result-row">
                <button class="copy-button" aria-label="Copy to clipboard">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <div class="result-label">Runeglish:</div>
                <div id="runeglish-result" class="result-content"></div>
            </div>
            <div class="result-row">
                <button class="copy-button" aria-label="Copy to clipboard">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <div class="result-label">Gematria Sum:</div>
                <div id="gematria-result" class="result-content"></div>
            </div>
            <div class="result-row">
                <button class="copy-button" aria-label="Copy to clipboard">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <div class="result-label">Word Sums:</div>
                <div id="wordsums-result" class="result-content"></div>
            </div>
            <div class="result-row">
                <button class="copy-button" aria-label="Copy to clipboard">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <div class="result-label">Rune Values:</div>
                <div id="runevalues-result" class="result-content"></div>
            </div>
        </div>

        <!-- Special Characters Row -->
        <div class="special-buttons">
            <button class="button" onclick="clearAll()">Clear</button>
            <button class="button">•</button>
            <button class="button">'</button>
            <button class="button">"</button>
            <button class="button">⊹</button>
        </div>

        <!-- Rune Buttons -->
        <div class="rune-buttons">
            <?php
            $runes = array('ᚠ/F', 'ᚢ/U', 'ᚦ/TH', 'ᚩ/O', 'ᚱ/R', 'ᚳ/C', 'ᚷ/G', 'ᚹ/W',
	                       'ᚻ/H', 'ᚾ/N', 'ᛁ/I', 'ᛄ/J', 'ᛇ/EO', 'ᛈ/P', 'ᛉ/X', 'ᛋ/S',
	                       'ᛏ/T', 'ᛒ/B', 'ᛖ/E', 'ᛗ/M', 'ᛚ/L', 'ᛝ/ING', 'ᛟ/OE', 'ᛞ/D',
	                       'ᚪ/A', 'ᚫ/AE', 'ᚣ/Y', 'ᛡ/IO', 'ᛠ/EA');
            foreach ($runes as $rune) {
                echo '<button class="button rune-button">' . $rune . '</button>';
            }
            ?>
        </div>
    </div>
    <div id="snackbar">Copied text</div>
    <?php
    return ob_get_clean();
}
add_shortcode('runecalc', 'cmbsolver_runecalc_shortcode');