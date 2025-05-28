
(function($) {
    $(document).ready(function() {
        // Show/hide additional options based on sequence type
        $('#sequence-type').on('change', function() {
            // Hide all additional option divs
            $('.additional-options').hide();

            // Show relevant options based on selection
            var selectedType = $(this).val();
            if (selectedType === 'arithmetic') {
                $('#geometric-options').hide();
                $('#arithmetic-options').show();
            } else if (selectedType === 'geometric') {
                $('#arithmetic-options').hide();
                $('#geometric-options').show();
            } else {
                $('#arithmetic-options').hide();
                $('#geometric-options').hide();
            }

            var type = $('#sequence-type').val();
            switch(type) {
                case 'fibonacci':
                case 'prime':
                case 'triangle':
                case 'square':
                case 'cube':
                case 'arithmetic':
                case 'geometric':
                case 'lucas':
                case 'central-polygonal':
                    $('#genseq-seq-len-max-num').text("Length of the sequence:");
                    break;
                default:
                    $('#genseq-seq-len-max-num').text("Number:");
                    break;
            }
        });

        // Variable to store the current sequence
        var currentSequence = [];

        // Handle generate button click
        $('#generate-button').on('click', function() {
            var length = parseInt($('#sequence-length').val());
            var type = $('#sequence-type').val();

            // Limit length for performance reasons
            if (length < 1) length = 1;

            // Get additional parameters if needed
            var start = 1;
            var diff = 1;
            var ratio = 2;

            if (type === 'arithmetic') {
                start = parseInt($('#arithmetic-start').val());
                diff = parseInt($('#arithmetic-diff').val());
            } else if (type === 'geometric') {
                start = parseInt($('#geometric-start').val());
                ratio = parseInt($('#geometric-ratio').val());
            }

            // Show loading state
            $('#sequence-result').html('<p>Generating sequence...</p>');
            $('#copy-sequence-button').hide();

            // Calculate sequence directly on the client side
            var sequence = [];

            switch(type) {
                case 'fibonacci':
                    sequence = generateFibonacci(length);
                    break;
                case 'prime':
                    sequence = generatePrimes(length);
                    break;
                case 'triangle':
                    sequence = generateTriangle(length);
                    break;
                case 'square':
                    sequence = generateSquare(length);
                    break;
                case 'cube':
                    sequence = generateCube(length);
                    break;
                case 'arithmetic':
                    sequence = generateArithmetic(length, start, diff);
                    break;
                case 'geometric':
                    sequence = generateGeometric(length, start, ratio);
                    break;
                case 'collatz':
                    sequence = generateCollatzSequence(length);
                    break;
                case 'lucas':
                    sequence = generateLucasSequence(length);
                    break;
                case 'central-polygonal':
                    sequence = generateCentralPolygonalNumbers(length);
                    break;
                case 'zekendorf':
                    sequence = getZekendorfRepresentation(length);
                    break;
                default:
                    sequence = generateFibonacci(length);
                    break;
            }

            // Store the current sequence for the copy function
            currentSequence = sequence;

            // Display sequence description
            var typeLabel = $('#sequence-type option:selected').text();
            $('#sequence-description').html('<p>Generated ' + typeLabel + ':</p>');

            // Format and display sequence
            var sequenceHTML = '<div class="genseq-sequence-numbers">';
            $.each(sequence, function(index, value) {
                sequenceHTML += '<span class="genseq-sequence-number">' + value + '</span>';
            });
            sequenceHTML += '</div>';

            $('#sequence-result').html(sequenceHTML);

            // Show copy button if sequence was generated
            if (sequence.length > 0) {
                $('#copy-sequence-button').show();
            }
        });

        // Handle copy button click
        $('#copy-sequence-button').on('click', function() {
            // Create a comma-separated string from the sequence
            var sequenceString = currentSequence.join(', ');

            // Use the Clipboard API to copy the text
            navigator.clipboard.writeText(sequenceString).then(function() {
                // Show a temporary success message
                var originalText = $(this).text();
                $(this).text('Copied!');

                setTimeout(function() {
                    $('#copy-sequence-button').text(originalText);
                }, 2000);
            }.bind(this)).catch(function(err) {
                console.error('Could not copy text: ', err);
                alert('Failed to copy the sequence. Please try again or copy manually.');
            });
        });
    });

    // Function to generate Fibonacci sequence
    function generateFibonacci(length) {
        var sequence = [0, 1];
        for (var i = 2; i < length; i++) {
            sequence[i] = sequence[i-1] + sequence[i-2];
        }
        return sequence;
    }

    // Rest of the functions remain unchanged...

    // Function to generate Prime numbers
    function generatePrimes(length) {
        var sequence = [];
        var num = 2;

        while (sequence.length < length) {
            if (isPrime(num)) {
                sequence.push(num);
            }
            num++;
        }

        return sequence;
    }

    // Function to check if a number is prime
    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;

        for (var i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }

        return true;
    }

    // Function to generate Triangle numbers
    function generateTriangle(length) {
        var sequence = [];
        for (var i = 1; i <= length; i++) {
            sequence.push((i * (i + 1)) / 2);
        }
        return sequence;
    }

    // Function to generate Square numbers
    function generateSquare(length) {
        var sequence = [];
        for (var i = 1; i <= length; i++) {
            sequence.push(i * i);
        }
        return sequence;
    }

    // Function to generate Cube numbers
    function generateCube(length) {
        var sequence = [];
        for (var i = 1; i <= length; i++) {
            sequence.push(i * i * i);
        }
        return sequence;
    }

    // Function to generate Arithmetic sequence
    function generateArithmetic(length, start, diff) {
        var sequence = [start];
        for (var i = 1; i < length; i++) {
            sequence.push(start + (i * diff));
        }
        return sequence;
    }

    // Function to generate Geometric sequence
    function generateGeometric(length, start, ratio) {
        var sequence = [start];
        for (var i = 1; i < length; i++) {
            sequence.push(start * Math.pow(ratio, i));
        }
        return sequence;
    }

    function generateCollatzSequence(n) {
        if (n < 1) {
            throw new Error("Number must be greater than 1");
        }

        let sequence = [n];

        while (n !== 1) {
            if (n % 2 === 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            sequence.push(n);
        }

        return sequence;
    }

    function generateLucasSequence(numberOfTerms) {
        if (numberOfTerms < 1) {
            throw new Error("Number of terms must be at least 1");
        }

        const sequence = [];

        if (numberOfTerms >= 1) {
            sequence.push(2); // First Lucas number
        }

        if (numberOfTerms >= 2) {
            sequence.push(1); // Second Lucas number
        }

        for (let i = 2; i < numberOfTerms; i++) {
            // Each new term is the sum of the two previous terms
            sequence.push(sequence[i-1] + sequence[i-2]);
        }

        return sequence;
    }

    function generateCentralPolygonalNumbers(numberOfTerms) {
        if (numberOfTerms < 1) {
            throw new Error("Number of terms must be at least 1");
        }

        const sequence = [];

        // The formula for the nth central polygonal number is: n²(n-1)/2 + 1
        // This generates central polygonal numbers starting from n=1
        for (let n = 1; n <= numberOfTerms; n++) {
            // Calculate the nth central polygonal number
            const term = (n * n * (n - 1)) / 2 + 1;
            sequence.push(term);
        }

        return sequence;
    }

    function getZekendorfRepresentation(number) {
        if (number <= 0) {
            return [];
        }

        // Generate Fibonacci numbers up to or greater than the target number
        const fibSequence = [];
        let a = 1, b = 2; // Starting with F(2)=1, F(3)=2 (standard indexing)

        fibSequence.push(a);
        while (b <= number) {
            fibSequence.push(b);
            const next = a + b;
            a = b;
            b = next;
        }

        // Find the Zekendorf representation from largest to smallest Fibonacci numbers
        const representation = [];
        let remainder = number;

        for (let i = fibSequence.length - 1; i >= 0; i--) {
            if (fibSequence[i] <= remainder) {
                representation.push(fibSequence[i]);
                remainder -= fibSequence[i];

                // Skip the next Fibonacci number to ensure non-consecutive property
                i--;
            }
        }

        return representation;
    }

})(jQuery);