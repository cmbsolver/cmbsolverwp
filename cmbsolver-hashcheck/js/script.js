(function($) {
    $(document).ready(function() {
        // Check if HashingBox is defined
        if (typeof HashingBox === 'undefined') {
            console.error('HashingBox is not defined. Make sure hashbox.js is loaded before this js.');
            $('#hash-results-list').html('<div class="error">Error: Hash functionality is not available.</div>');
            return;
        }

        // Reference to the input area and results container
        const $inputArea = $('#hash-input-area');
        const $hashMode = $('#hash-mode');
        const $multilineCheck = $('#multiline-check');
        const $checkButton = $('#check-hash-button');
        const $resultsContainer = $('#hash-results-list');
        const $inputMode = $('#input-mode');

        // Initialize with default mode
        HashingBox.setMode($hashMode.val());

        // Event listener for mode changes
        $hashMode.on('change', function() {
            HashingBox.setMode($(this).val());
        });

        // Event listener for the check hash button
        $checkButton.on('click', function() {
            const inputText = $inputArea.val();
            const isMultiline = $multilineCheck.is(':checked');
            const mode = $inputMode.val();

            if (!inputText.trim()) {
                alert('Please enter text to hash');
                return;
            }

            // Clear previous results
            $resultsContainer.empty();

            if (isMultiline) {
                // Process each line separately
                const lines = inputText.split('\n');

                // Create a container for all results
                const $multilineResults = $('<div class="multiline-hash-results"></div>');

                // Process each line
                lines.forEach((line, index) => {
                    if (line.trim() === '') return; // Skip empty lines

                    // Add line header
                    const $lineHeader = $(`<h4>Line ${index + 1}: ${line.length > 30 ? line.substring(0, 30) + '...' : line}</h4>`);
                    $multilineResults.append($lineHeader);

                    // Convert text to Uint8Array for hashing
                    const encoder = new TextEncoder();
                    let data;
                    if (mode === 'bytes') {
                        data = getBytesFromIntArray(line.trim());
                    } else {
                        data = encoder.encode(line.trim());
                    }

                    // Get all hashes for this line
                    const hashResults = HashingBox.getAllHashes(data);

                    // Display the results for this line
                    const $lineResults = $('<div class="line-hash-results"></div>');
                    $lineResults.append(createHashResultsTable(hashResults));
                    $multilineResults.append($lineResults);
                });

                $resultsContainer.append($multilineResults);
            } else {
                // Process the entire text as a single input
                const encoder = new TextEncoder();
                let data;
                if (mode === 'bytes') {
                    data = getBytesFromIntArray(inputText.trim());
                } else {
                    data = encoder.encode(inputText.trim());
                }

                // Get all hashes for the input
                const hashResults = HashingBox.getAllHashes(data);

                // Display the results
                $resultsContainer.append(createHashResultsTable(hashResults));
            }
        });

        // Function to create a hash results table
        function createHashResultsTable(hashResults) {
            const currentMode = $hashMode.val();
            const algorithms = HashingBox.getAlgorithmsForMode(currentMode);

            // Create a table for the results
            const $table = $('<table class="hash-results-table"></table>');
            const $tableHeader = $('<tr><th>Algorithm</th><th>Hash</th><th>Match</th></tr>');
            $table.append($tableHeader);

            // Add each algorithm and its hash to the table
            algorithms.forEach(algorithm => {
                const hash = hashResults[algorithm];
                const matches = hash === LP_hash ? 'Yes' : 'No';
                const matchClass = hash === LP_hash ? 'match-success' : 'match-fail';

                const $row = $(`
                    <tr>
                        <td>${algorithm}</td>
                        <td class="hash-value">${hash}</td>
                        <td class="hash-match ${matchClass}">${matches}</td>
                    </tr>
                `);
                $table.append($row);
            });

            return $table;
        }

        function getBytesFromIntArray(items) {
            // Split the items into a number array
            const itemArray = items.split(',');

            // Convert string values to integers and validate range (0-255)
            const byteValues = itemArray.map(item => {
                const trimmedItem = item.trim();
                const num = parseInt(trimmedItem, 10);
                // Validate number is in valid byte range
                if (isNaN(num) || num < 0 || num > 255) {
                    throw new Error(`Invalid byte value: ${item}. Values must be between 0-255.`);
                }
                return num;
            });

            // Create and return a Uint8Array from the values
            return new Uint8Array(byteValues);
        }
    });
})(jQuery);