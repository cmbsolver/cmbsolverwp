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
                    <div class="lpviewer-image-container">
                        <img id="lpviewer-image" src="" alt="Page image" />
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