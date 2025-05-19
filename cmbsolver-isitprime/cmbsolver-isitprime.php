<?php
/*
Plugin Name: CMB Solver Is It Prime
Description: Check if a number is prime or emirp
Version: 1.0
Author: CMBSOLVER
*/

// Prevent direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue necessary scripts and styles
function cmbsolver_isitprime_scripts() {
    wp_enqueue_style('cmbsolver-isitprime-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('cmbsolver-isitprime-script', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'cmbsolver_isitprime_scripts');

// Function to check if a number is prime
function is_prime($number) {
    if ($number <= 1) return false;
    if ($number <= 3) return true;
    if ($number % 2 == 0 || $number % 3 == 0) return false;

    $i = 5;
    while ($i * $i <= $number) {
        if ($number % $i == 0 || $number % ($i + 2) == 0) return false;
        $i += 6;
    }
    return true;
}

// Function to check if a number is emirp (prime when reversed)
function is_emirp($number) {
    if (!is_prime($number)) return false;

    $reversed = (int)strrev((string)$number);
    // Must be different from the original to be an emirp
    return ($reversed != $number) && is_prime($reversed);
}

// Create shortcode for the prime checker
function cmbsolver_isitprime_shortcode() {
    ob_start();
    ?>
    <div class="isitprime-container">
        <h3>Prime & Emirp Number Checker</h3>

        <!-- Input Area -->
        <div class="input-area">
            <label for="number-input">Enter a number:</label>
            <input type="number" id="number-input" class="number-input" min="1">
            <button id="check-button" class="button">Check</button>
        </div>

        <!-- Results Area -->
        <div class="results-area">
            <div id="result-message" class="result-message"></div>

            <div class="result-details">
                <div id="prime-result" class="result-detail"></div>
                <div id="emirp-result" class="result-detail"></div>
            </div>

            <div class="definitions-box">
                <p><strong>Prime:</strong> A number greater than 1 that is only divisible by 1 and itself.</p>
                <p><strong>Emirp:</strong> A prime number that results in a different prime number when its digits are reversed.</p>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('isitprime', 'cmbsolver_isitprime_shortcode');

// Ajax handler to process prime check
function cmbsolver_isitprime_ajax_handler() {
    // Check nonce for security
    check_ajax_referer('isitprime_nonce', 'nonce');

    $number = isset($_POST['number']) ? intval($_POST['number']) : 0;

    $isPrime = is_prime($number);
    $isEmirp = is_emirp($number);

    $response = array(
        'number' => $number,
        'isPrime' => $isPrime,
        'isEmirp' => $isEmirp
    );

    wp_send_json($response);
    wp_die();
}
add_action('wp_ajax_isitprime_check', 'cmbsolver_isitprime_ajax_handler');
add_action('wp_ajax_nopriv_isitprime_check', 'cmbsolver_isitprime_ajax_handler');
?>