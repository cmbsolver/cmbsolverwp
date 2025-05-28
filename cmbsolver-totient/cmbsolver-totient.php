<?php
/*
Plugin Name: CMB Solver Totient
Description: Calculate the totient function (Euler's phi function) for a given number
Version: 1.0
Author: CMBSOLVER
*/

// Prevent direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue necessary scripts and styles
function cmbsolver_totient_scripts() {
    wp_enqueue_style('cmbsolver-totient-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('cmbsolver-totient-js', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'cmbsolver_totient_scripts');

// Create shortcode for the totient calculator
function cmbsolver_totient_shortcode() {
    ob_start();
    ?>
    <div class="totient-container">
        <!-- Input Area -->
        <div class="totient-input-area">
            <label for="number-input">Enter a number:</label>
            <input type="number" id="number-input" class="totient-number-input" min="1">
            <button id="solve-button" class="totient-button">Solve</button>
        </div>

        <!-- Results Area -->
        <div class="totient-results-area">
            <div id="result-message" class="totient-result-message"></div>

            <div class="totient-result-details">
                <div id="totient-result" class="totient-result-detail"></div>
                <div id="coprimes-list" class="totient-result-detail"></div>
            </div>

            <div class="totient-definitions-box">
                <p><strong>Totient Function:</strong> Euler's totient function φ(n) counts the positive integers up to n that are coprime to n (have no common factors with n other than 1).</p>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('totient', 'cmbsolver_totient_shortcode');
?>