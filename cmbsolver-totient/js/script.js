jQuery(document).ready(function($) {
    $('#solve-button').on('click', function() {
        calculateTotient();
    });

    $('#number-input').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            calculateTotient();
        }
    });

    function calculateTotient() {
        const number = parseInt($('#number-input').val().trim());

        // Basic validation
        if (!number || isNaN(number) || number <= 0 || !Number.isInteger(number)) {
            $('#result-message').html('Please enter a valid positive integer.');
            $('#totient-result').html('');
            $('#coprimes-list').html('');
            return;
        }

        // Clear previous results
        $('#result-message').empty();
        $('#totient-result').empty();
        $('#coprimes-list').empty();

        // Calculate totient
        const totientResult = calculateTotientValue(number);

        // Display results
        $('#result-message').html(`<strong>Totient of ${number}</strong>`);
        $('#totient-result').html(`φ(${number}) = ${totientResult.count}`);

        if (totientResult.coprimes.length > 0) {
            $('#coprimes-list').html(`<p>Numbers coprime to ${number}: ${totientResult.coprimes.join(', ')}</p>`);
        } else {
            $('#coprimes-list').html(`<p>No numbers less than ${number} are coprime to it.</p>`);
        }
    }

    // Function to calculate GCD (Greatest Common Divisor)
    function gcd(a, b) {
        while (b !== 0) {
            let t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    // Function to calculate totient value
    function calculateTotientValue(n) {
        if (n === 1) return { count: 1, coprimes: [] };

        let count = 1; // 1 is always coprime
        let coprimes = [1];

        for (let i = 2; i < n; i++) {
            if (gcd(i, n) === 1) {
                count++;
                coprimes.push(i);
            }
        }

        return {
            count: count,
            coprimes: coprimes
        };
    }
});