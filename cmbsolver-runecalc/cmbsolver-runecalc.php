<?php
/*
Plugin Name: CMB Solver Rune Calculator
Description: A rune calculation tool with conversion capabilities
Version: 1.0
Author: CMBSOLVER
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
        <div class="text-label">Text To Calculate</div>
        <textarea id="input-area" rows="4" class="wide-input"></textarea>

        <!-- Conversion Type -->
        <div class="conversion-row">
            <select id="conversion-type">
                <option value="from-latin">From Latin Characters</option>
                <option value="from-rune">From Rune Characters</option>
            </select>
            <button id="load-button" class="button">Load</button>
        </div>

        <!-- Special Characters Row -->
        <div class="special-buttons"></div>

        <!-- Rune Buttons -->
        <div class="rune-buttons"></div>

        <!-- Tabs Navigation -->
        <div class="tabs-navigation">
            <button class="tab-button active" data-tab="information-tab">Information View</button>
            <button class="tab-button" data-tab="gp-view-tab">Line View</button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
            <!-- Information Tab (First Tab) -->
            <div id="information-tab" class="tab-pane active">
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
                        <div id="runes-result" class="rune-result-content"></div>
                    </div>
                    <div class="result-row">
                        <button class="copy-button" aria-label="Copy to clipboard">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <div class="result-label">Runeglish:</div>
                        <div id="runeglish-result" class="rune-result-content"></div>
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
                        <div class="result-label">Word Count:</div>
                        <div id="wordcount-result" class="result-content"></div>
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
            </div>

            <!-- GP View Tab (Second Tab) -->
            <div id="gp-view-tab" class="tab-pane">
                <div class="gp-view-content">
                    <div id="gp-visualization" class="gp-lines-container"></div>
                    <div>
                        <b>Legend:</b>
                        <div class="gp-line-sum-nonprime">Non-Prime</div>
                        <div class="gp-line-sum-prime">Prime</div>
                        <div class="gp-line-sum-emirp">Emirp</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="snackbar">Copied text</div>
    <?php
    return ob_get_clean();
}
add_shortcode('runecalc', 'cmbsolver_runecalc_shortcode');