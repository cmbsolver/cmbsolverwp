jQuery(document).ready(function($) {
    $('#check-button').on('click', function() {
        checkNumber();
    });

    $('#number-input').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            checkNumber();
        }
    });

    function checkNumber() {
        $('#result-message').removeClass('is-prime');
        $('#result-message').removeClass('not-prime');
        $('#result-message').removeClass('is-emirp');

        const number = $('#number-input').val().trim();

        // Basic validation
        if (!number || isNaN(number) || number <= 0 || !Number.isInteger(parseFloat(number))) {
            $('#result-message').html('Please enter a valid positive integer.');
            $('#prime-result').html('');
            $('#emirp-result').html('');
            return;
        }

        const reversed = parseInt(number.toString().split('').reverse().join(''));

        // Clear previous results
        $('#result-message').empty();
        $('#prime-result').empty();
        $('#emirp-result').empty();

        // Create a comprehensive result message
        let resultMessage = `<strong>${number}</strong>: `;
        let resultClass = '';

        // Display Prime status
        if (isPrime(number)) {
            $('#prime-result').html(`✓ ${number} is a prime number.`);
            console.log(number + ' is prime');
            resultClass = 'is-prime';
        } else {
            $('#prime-result').html(`✗ ${number} is not a prime number.`);
            console.log(number + ' is not prime');
            resultClass = 'not-prime';
        }

        // Display Emirp status (as a separate characteristic)
        if (isEmirp(number)) {
            $('#emirp-result').html(`✓ ${number} is an emirp: reversed (${reversed}) is also prime.`);
            resultClass += ' is-emirp';

            if (number === reversed) {
                $('#emirp-result').html(`✗ ${number} is a palindrome prime (same forwards and backwards).`);
            }
        }

        // Summarize the findings
        if (isPrime(number) && isEmirp(number)) {
            resultMessage += `This number is both prime and emirp!`;
        } else if (isPrime(number) && !isEmirp(number)) {
            resultMessage += `This number is prime but not emirp.`;
        } else {
            resultMessage += `This number is not prime.`;
        }

        $('#result-message').html(resultMessage).addClass(resultClass);
    }
});

/**
 * Checks if a number is prime
 * @param {number} num - The number to check
 * @returns {boolean}
 */
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

/**
 * Checks if a number is emirp (prime when reversed and different from original)
 * @param {number} num - The number to check
 * @returns {boolean}
 */
function isEmirp(num) {
    if (!isPrime(num)) return false;
    const reversedNum = parseInt(num.toString().split('').reverse().join(''));
    return reversedNum !== num && isPrime(reversedNum);
}