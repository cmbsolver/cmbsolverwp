<?php
/*
Plugin Name: CMB Solver Rune Calculator
Description: A rune calculation tool with conversion capabilities
Version: 1.19
Author: CMBSOLVER
*/

// Prevent direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue necessary scripts and styles
function cmbsolver_runecalc_scripts() {
    wp_enqueue_style('cmbsolver-runecalc-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('cmbsolver-runecalc-js', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
    
    // Pass the plugin URL to JavaScript so we can construct file paths
    wp_localize_script('cmbsolver-runecalc-js', 'pluginUrl', plugins_url('', __FILE__) . '/');
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

        <!-- Transform Type -->
        <div class="conversion-row">
            <label class="text-label">Pass One Rune Encryption/Decryption: </label>
            <select id="transform-type">
                <option value="none" selected>No Transform</option>
                <option value="atbash">Atbash</option>
                <option value="albam">Albam</option>
                <option value="albam-one">Albam (Var 1)</option>
                <option value="achbi">Achbi</option>
                <option value="achbi-one">Achbi (Var 1)</option>
                <option value="avgad">Avgad</option>
                <option value="avgad-reverse">Avgad Decrypt</option>
                <option value="akhas">Akhas Beta</option>
                <option value="akhas-reverse">Akhas Beta Decrypt</option>
            </select>
        </div>

        <div class="reverse-options">
            <label><input type="radio" name="reverse-option" id="reverse-none" value="none" checked /> Don't Reverse</label>
            <label><input type="radio" name="reverse-option" id="reverse-words" value="words" /> Reverse Words</label>
            <label><input type="radio" name="reverse-option" id="reverse-text" value="text" /> Reverse Text</label>
        </div>

        <!-- Conversion Type -->
        <div class="conversion-row">
            <select id="conversion-type">
                <option value="from-latin">From Latin Characters</option>
                <option value="from-rune">From Rune Characters</option>
            </select>
            <button id="load-button" class="button">Transpose</button>
        </div>

        <div class="conversion-row">
            <label class="text-label">Select Page or Section: </label>
            <select id="lpviewer-section-select">
                <option value="0-2.txt">Section 0-2</option>
                <option value="3-7.txt">Section 3-7</option>
                <option value="8-14.txt">Section 8-14</option>
                <option value="15-22.txt">Section 15-22</option>
                <option value="23-26.txt">Section 23-26</option>
                <option value="27-32.txt">Section 27-32</option>
                <option value="33-39.txt">Section 33-39</option>
                <option value="40-53.txt">Section 40-53</option>
                <option value="54-55.txt">Section 54-55</option>
                <option value="56-56.txt">Section 56</option>
                <option value="57-57.txt">Section 57</option>
                <option value="0.txt">Page 0</option>
                <option value="1.txt">Page 1</option>
                <option value="2.txt">Page 2</option>
                <option value="3.txt">Page 3</option>
                <option value="4.txt">Page 4</option>
                <option value="5.txt">Page 5</option>
                <option value="6.txt">Page 6</option>
                <option value="7.txt">Page 7</option>
                <option value="8.txt">Page 8</option>
                <option value="9.txt">Page 9</option>
                <option value="10.txt">Page 10</option>
                <option value="11.txt">Page 11</option>
                <option value="12.txt">Page 12</option>
                <option value="13.txt">Page 13</option>
                <option value="14.txt">Page 14</option>
                <option value="15.txt">Page 15</option>
                <option value="16.txt">Page 16</option>
                <option value="17.txt">Page 17</option>
                <option value="18.txt">Page 18</option>
                <option value="19.txt">Page 19</option>
                <option value="20.txt">Page 20</option>
                <option value="21.txt">Page 21</option>
                <option value="22.txt">Page 22</option>
                <option value="23.txt">Page 23</option>
                <option value="24.txt">Page 24</option>
                <option value="25.txt">Page 25</option>
                <option value="26.txt">Page 26</option>
                <option value="27.txt">Page 27</option>
                <option value="28.txt">Page 28</option>
                <option value="29.txt">Page 29</option>
                <option value="30.txt">Page 30</option>
                <option value="31.txt">Page 31</option>
                <option value="32.txt">Page 32</option>
                <option value="33.txt">Page 33</option>
                <option value="34.txt">Page 34</option>
                <option value="35.txt">Page 35</option>
                <option value="36.txt">Page 36</option>
                <option value="37.txt">Page 37</option>
                <option value="38.txt">Page 38</option>
                <option value="39.txt">Page 39</option>
                <option value="40.txt">Page 40</option>
                <option value="41.txt">Page 41</option>
                <option value="42.txt">Page 42</option>
                <option value="43.txt">Page 43</option>
                <option value="44.txt">Page 44</option>
                <option value="45.txt">Page 45</option>
                <option value="46.txt">Page 46</option>
                <option value="47.txt">Page 47</option>
                <option value="48.txt">Page 48</option>
                <option value="49.txt">Page 49</option>
                <option value="50.txt">Page 50</option>
                <option value="51.txt">Page 51</option>
                <option value="52.txt">Page 52</option>
                <option value="53.txt">Page 53</option>
                <option value="54.txt">Page 54</option>
                <option value="55.txt">Page 55</option>
                <option value="56.txt">Page 56</option>
                <option value="57.txt">Page 57</option>
            </select>
            <button id="sload-button" class="button">Load</button>
        </div>

        <!-- Special Characters Row -->
        <div class="special-buttons"></div>

        <!-- Rune Buttons -->
        <div class="rune-buttons"></div>

        <!-- Tabs Navigation -->
        <div class="tabs-navigation">
            <button class="tab-button active" data-tab="information-tab">Information View</button>
            <button class="tab-button" data-tab="gp-view-tab">Prime View</button>
            <button class="tab-button" data-tab="totient-view-tab">Totient View</button>
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
                        <div class="result-label">Rune Count:</div>
                        <div id="runecount-result" class="result-content"></div>
                    </div>
                    <div class="result-row">
                        <button class="copy-button" aria-label="Copy to clipboard">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <div class="result-label">Runeglish Count:</div>
                        <div id="runeglishcount-result" class="result-content"></div>
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
                    <div class="result-row">
                        <button class="copy-button" aria-label="Copy to clipboard">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <div class="result-label">Distinct Runes:</div>
                        <div id="distinct-runes-result" class="result-content"></div>
                    </div>
                    <div class="result-row">
                        <button class="copy-button" aria-label="Copy to clipboard">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <div class="result-label">Doublets:</div>
                        <div id="doublets-result" class="result-content"></div>
                    </div>
                    <div class="result-row">
                        <button class="copy-button" aria-label="Copy to clipboard">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <div class="result-label">Starts With:</div>
                        <div id="startswith-result" class="result-content"></div>
                    </div>
                    <div class="result-row">
                        <button class="copy-button" aria-label="Copy to clipboard">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <div class="result-label">Starts and Ends With:</div>
                        <div id="startsendwith-result" class="result-content"></div>
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
                        <div class="gp-line-sum-circular-prime">Circular Prime</div>
                        <div class="gp-line-sum-prime">Prime</div>
                        <div class="gp-line-sum-emirp">Emirp</div>
                        <div class="gp-line-sum-semi-prime">Semi-Prime</div>
                    </div>
                </div>
            </div>

            <!-- Totient View Tab (Third Tab) -->
            <div id="totient-view-tab" class="tab-pane">
                <div class="totient-view-content">
                    <div id="totient-sigma"></div>

                    <div id="totient-visualization" class="gp-lines-container"></div>
                    <div>
                        <b>Legend:</b>
                        <div class="gp-line-sum-nonprime">Not Coprime</div>
                        <div class="gp-line-sum-circular-prime">Coprime</div>
                    </div>
                    <div class="expandable-section">
                        <div class="expandable-header">
                            <span>Coprimes (Click to expand)</span>
                            <button class="expand-button">▼</button>
                        </div>
                        <div id="totient-coprimes" class="expandable-content collapsed"></div>
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