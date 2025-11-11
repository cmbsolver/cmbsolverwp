<?php
/**
 * Plugin Name: CMB Solver XOR
 * Description: A WordPress plugin that performs XOR operations on numbers, strings, or binary values.
 * Version: 1.0.0
 * Author: CMB Solver
 * Text Domain: cmbsolver-xor
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue necessary scripts and styles
function cmbsolver_xor_scripts() {
    wp_enqueue_style('cmbsolver-xor-style', plugins_url('css/cmbsolver-xor.css', __FILE__));
    wp_enqueue_script('cmbsolver-xor-script', plugins_url('js/cmbsolver-xor.js', __FILE__), array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'cmbsolver_xor_scripts');

// Create shortcode for the XOR calculator
function cmbsolver_xor_shortcode() {
    ob_start();
    ?>
    <div class="cmbsolver-xor-container">
        <h3>XOR Calculator</h3>

        <!-- Input for values -->
        <div class="cmbsolver-xor-input-group">
            <label for="cmbsolver-xor-input1">First value:</label>
            <input type="text" id="cmbsolver-xor-input1" class="cmbsolver-xor-input" placeholder="Enter first value">
        </div>

        <div class="cmbsolver-xor-input-group">
            <label for="cmbsolver-xor-input2">Second value:</label>
            <input type="text" id="cmbsolver-xor-input2" class="cmbsolver-xor-input" placeholder="Enter second value">
        </div>

        <!-- Data type selector -->
        <div class="cmbsolver-xor-input-group">
            <label for="cmbsolver-xor-datatype">Select Data Type:</label>
            <select id="cmbsolver-xor-datatype">
                <option value="number">Number</option>
                <option value="string">String</option>
                <option value="binary">Binary</option>
            </select>
        </div>

        <!-- Calculate button -->
        <button id="cmbsolver-xor-calculate" class="cmbsolver-xor-button">Calculate XOR</button>

        <!-- Results area -->
        <div class="cmbsolver-xor-result-group">
            <label>Result:</label>
            <div id="cmbsolver-xor-result" class="cmbsolver-xor-result"></div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('cmbsolver_xor', 'cmbsolver_xor_shortcode');