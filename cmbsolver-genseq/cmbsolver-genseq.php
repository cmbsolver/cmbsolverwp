
<?php
/*
Plugin Name: CMB Solver Sequence Generator
Description: Generate various mathematical sequences based on input
Version: 1.0
Author: CMBSOLVER
*/

// Prevent direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue necessary scripts and styles
function cmbsolver_genseq_scripts() {
    wp_enqueue_style('cmbsolver-genseq-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('cmbsolver-genseq-script', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'cmbsolver_genseq_scripts');

// Create shortcode for the sequence generator
function cmbsolver_genseq_shortcode() {
    ob_start();
    ?>
    <div class="genseq-container">
        <!-- Input Area -->
        <div class="genseq-input-area">
            <div class="genseq-input-group">
                <label id="genseq-seq-len-max-num" for="sequence-length">Length of the sequence:</label>
                <input type="number" id="sequence-length" class="genseq-number-input" min="1" value="10">
            </div>

            <div class="genseq-input-group">
                <label for="sequence-type">Sequence type:</label>
                <select id="sequence-type" class="genseq-sequence-select">
                    <option value="fibonacci">Fibonacci Sequence</option>
                    <option value="lucas">Lucas Sequence</option>
                    <option value="prime">Prime Number Sequence</option>
                    <option value="triangle">Triangle Number Sequence</option>
                    <option value="square">Square Number Sequence</option>
                    <option value="cube">Cube Number Sequence</option>
                    <option value="arithmetic">Arithmetic Sequence</option>
                    <option value="geometric">Geometric Sequence</option>
                    <option value="collatz">Collatz Sequence</option>
                    <option value="central-polygonal">Central Polygonal Number Sequence</option>
                    <option value="zekendorf">Zekendorf Representation</option>
                </select>
            </div>

            <div id="arithmetic-options" class="genseq-additional-options" style="display: none;">
                <div class="genseq-input-group">
                    <label for="arithmetic-start">Start value:</label>
                    <input type="number" id="arithmetic-start" class="genseq-number-input" value="1">
                </div>
                <div class="genseq-input-group">
                    <label for="arithmetic-diff">Common difference:</label>
                    <input type="number" id="arithmetic-diff" class="genseq-number-input" value="1">
                </div>
            </div>

            <div id="geometric-options" class="genseq-additional-options" style="display: none;">
                <div class="genseq-input-group">
                    <label for="geometric-start">Start value:</label>
                    <input type="number" id="geometric-start" class="genseq-number-input" value="1">
                </div>
                <div class="input-group">
                    <label for="geometric-ratio">Common ratio:</label>
                    <input type="number" id="geometric-ratio" class="genseq-number-input" value="2">
                </div>
            </div>

            <button id="generate-button" class="genseq-button">Generate Sequence</button>
        </div>

        <!-- Results Area -->
        <div class="genseq-results-area">
            <div id="sequence-description" class="genseq-sequence-description"></div>
            <div id="sequence-result" class="genseq-sequence-result"></div>
        </div>

        <!-- Definitions Box -->
        <div class="genseq-definitions-box">
            <h4>Sequence Definitions</h4>
            <p><strong>Fibonacci:</strong> Each number is the sum of the two preceding ones (0, 1, 1, 2, 3, 5, 8, ...)</p>
            <p><strong>Prime Numbers:</strong> Natural numbers greater than 1 that are only divisible by 1 and themselves</p>
            <p><strong>Triangle Numbers:</strong> Sum of the first n natural numbers (1, 3, 6, 10, 15, ...)</p>
            <p><strong>Square Numbers:</strong> Numbers that are the square of an integer (1, 4, 9, 16, ...)</p>
            <p><strong>Cube Numbers:</strong> Numbers that are the cube of an integer (1, 8, 27, 64, ...)</p>
            <p><strong>Arithmetic Sequence:</strong> Each term differs from the previous by a constant value</p>
            <p><strong>Geometric Sequence:</strong> Each term is a constant multiple of the previous term</p>
            <p><strong>Collatz Sequence:</strong> The Collatz Conjecture is if the number is even, divide it by two; if it's odd, multiply it by three and add one.</p>
            <p><strong>Lucas Sequence:</strong> Lucas numbers are the sum of the two preceding numbers in the sequence.</p>
            <p><strong>Central Polygonal Numbers:</strong> The centered polygonal numbers are a class of series of figurate numbers, each formed by a central dot, surrounded by polygonal layers of dots with a constant number of sides.</p>
            <p><strong>Zekendorf Representation:</strong> The nonconsecutive fibonacci numbers that when summed, make up that number</p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('genseq', 'cmbsolver_genseq_shortcode');
?>