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

            if (!inputText.trim()) {
                alert('Please enter text to hash');
                return;
            }

            // Convert text to Uint8Array for hashing
            const encoder = new TextEncoder();
            const data = encoder.encode(inputText);

            // Get all hashes for the input
            const hashResults = HashingBox.getAllHashes(data);

            // Display the results
            displayHashResults(hashResults);
        });

        // Function to display the hash results
        // Function to display the hash results
        function displayHashResults(hashResults) {
            $resultsContainer.empty();

            const currentMode = $hashMode.val();
            const algorithms = HashingBox.getAlgorithmsForMode(currentMode);

            // Create a table for the results
            const $table = $('<table class="hash-results-table"></table>');
            const $tableHeader = $('<tr><th>Algorithm</th><th>Hash</th><th>Match</th><th></th></tr>');
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

            $resultsContainer.append($table);
        }
    });
})(jQuery);