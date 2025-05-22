(function($) {
    $(document).ready(function() {
        // Check if HashingBox is defined
        if (typeof HashingBox === 'undefined') {
            console.error('HashingBox is not defined. Make sure hashbox.js is loaded before this script.');
            $('#hash-results-list').html('<div class="error">Error: Hash functionality is not available.</div>');
            return;
        }

        // Reference to the input area and results container
        const $inputArea = $('#hash-input-area');
        const $hashMode = $('#hash-mode');
        const $multilineCheck = $('#multiline-check');
        const $checkButton = $('#check-hash-button');
        const $resultsContainer = $('#hash-results-list');

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
                    const data = encoder.encode(line);

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
                const data = encoder.encode(inputText);

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
    });
})(jQuery);