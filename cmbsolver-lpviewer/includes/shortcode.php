<?php
/**
 * Shortcode implementation for the LP Viewer
 */
function cmbslpv_shortcode($atts) {
    $atts = shortcode_atts(array(
        'default_page' => '0',
    ), $atts, 'lpviewer');

    $default_page = intval($atts['default_page']);

    // Generate options for pages 0-57
    $options = '';
    for ($i = 0; $i <= 57; $i++) {
        $selected = ($i === $default_page) ? 'selected' : '';
        $options .= "<option value=\"{$i}\" {$selected}>Page {$i}</option>";
    }

    ob_start();
    ?>
    <div class="lpviewer-container">
        <div class="lpviewer-controls">
            <label for="lpviewer-page-select">Select Page: </label>
            <select id="lpviewer-page-select" class="lpviewer-page-select">
                <?php echo $options; ?>
            </select>
            <button id="lpviewer-load-button" class="button">Load</button>
            &nbsp;&nbsp;OR&nbsp;&nbsp;
            <label for="lpviewer-page-select">Select Section: </label>
            <select id="lpviewer-section-select" class="lpviewer-page-select">
                <option value="0-2">Section 0-2 Sign Post Cross</option>
                <option value="3-7">Section 3-7 Spirals</option>
                <option value="8-14">Section 8-14 Branches</option>
                <option value="15-22">Section 15-22 Mobius</option>
                <option value="23-26">Section 23-26 Mayfly</option>
                <option value="27-32">Section 27-32 Wing Tree</option>
                <option value="33-39">Section 33-39 Cuneiform</option>
                <option value="40-53">Section 40-53 Spiral Branches</option>
                <option value="54-55">Section 54-55 More Spiral Branches</option>
                <option value="56-56">Section 56 An End</option>
                <option value="57-57">Section 57 Parable</option>
            </select>
            <button id="lpviewer-sload-button" class="button">Load</button>
        </div>

        <div class="lpviewer-tabs">
            <div class="lpviewer-tab-navigation">
                <button class="lpviewer-tab-button active" data-tab="image-tab">Image</button>
                <button class="lpviewer-tab-button" data-tab="text-lb-tab">Text with Line Breaks</button>
                <button class="lpviewer-tab-button" data-tab="text-nlb-tab">Text without Line Breaks</button>
                <button class="lpviewer-tab-button" data-tab="runeglish-tab">Runeglish</button>
            </div>

            <div class="lpviewer-tab-content">
                <div id="image-tab" class="lpviewer-tab-pane active">
                    <div id="lpviewer-image-container" class="lpviewer-image-container">
                    </div>
                </div>

                <div id="text-lb-tab" class="lpviewer-tab-pane">
                    <div id="lpviewer-text-lb" class="lpviewer-text-content"></div>
                </div>

                <div id="text-nlb-tab" class="lpviewer-tab-pane">
                    <div id="lpviewer-text-nlb" class="lpviewer-text-content"></div>
                </div>

                <div id="runeglish-tab" class="lpviewer-tab-pane">
                    <div id="lpviewer-runeglish" class="lpviewer-text-content"></div>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}