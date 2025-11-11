(function($) {
    'use strict';
    
    $(document).ready(function() {
        $('#cmbsolver-xor-calculate').on('click', function() {
            calculateXOR();
        });

        // Allow pressing Enter in inputs to trigger calculation
        $('#cmbsolver-xor-input1, #cmbsolver-xor-input2').on('keydown', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                calculateXOR();
            }
        });

        function calculateXOR() {
            const input1 = $('#cmbsolver-xor-input1').val().trim();
            const input2 = $('#cmbsolver-xor-input2').val().trim();
            const dataType = $('#cmbsolver-xor-datatype').val();
            const $result = $('#cmbsolver-xor-result');
            
            if (!input1 || !input2) {
                $result.html('<span class="cmbsolver-xor-error">Please enter both values.</span>');
                return;
            }
            
            try {
                let result;
                
                switch (dataType) {
                    case 'number':
                        result = xorNumbers([input1, input2]);
                        break;
                    case 'string':
                        result = xorStrings([input1, input2]);
                        break;
                    case 'binary':
                        result = xorBinary([input1, input2]);
                        break;
                    default:
                        throw new Error('Invalid data type selected.');
                }
                
                $result.html(result);
            } catch (error) {
                $result.html('<span class="cmbsolver-xor-error">Error: ' + error.message + '</span>');
            }
        }
        
        function xorNumbers(values) {
            // Convert each value to number and validate
            const numbers = values.map(val => {
                const num = parseInt(val, 10);
                if (isNaN(num)) {
                    throw new Error(`"${val}" is not a valid number.`);
                }
                return num;
            });
            
            // Perform XOR operation
            let result = numbers[0];
            for (let i = 1; i < numbers.length; i++) {
                result ^= numbers[i];
            }
            
            return `<div>Decimal result: ${result}</div>
                   <div>Hexadecimal result: 0x${result.toString(16).toUpperCase()}</div>
                   <div>Binary result: ${result.toString(2)}</div>`;
        }
        
        function xorStrings(values) {
            // Convert strings to arrays of character codes
            const charArrays = values.map(str => Array.from(str).map(c => c.charCodeAt(0)));
            
            // Check if arrays have the same length
            if (charArrays[0].length !== charArrays[1].length) {
                throw new Error('Input strings must have the same length for XOR operation.');
            }
            
            // Perform XOR operation character by character
            const resultArray = Array(charArrays[0].length).fill(0);
            
            for (let i = 0; i < charArrays[0].length; i++) {
                resultArray[i] = charArrays[0][i] ^ charArrays[1][i];
            }
            
            // Convert result back to string
            const resultString = String.fromCharCode(...resultArray.filter(code => code !== 0));
            
            // Also provide hex representation of the result
            const hexResult = resultArray.map(code => code.toString(16).padStart(2, '0')).join(' ');
            
            return `<div>String result: ${escapeHTML(resultString)}</div>
                   <div>Hex representation: ${hexResult.toUpperCase()}</div>`;
        }
        
        function xorBinary(values) {
            // Validate and convert binary strings to numbers
            const binaries = values.map(val => {
                if (!/^[01]+$/.test(val)) {
                    throw new Error(`"${val}" is not a valid binary number.`);
                }
                return parseInt(val, 2);
            });
            
            // Check if binary strings have the same length
            if (values[0].length !== values[1].length) {
                throw new Error('Binary strings must have the same length for XOR operation.');
            }
            
            // Perform XOR operation
            let result = binaries[0];
            for (let i = 1; i < binaries.length; i++) {
                result ^= binaries[i];
            }
            
            // Format the binary result to maintain the same length as inputs
            const binaryResult = result.toString(2).padStart(values[0].length, '0');
            
            return `<div>Binary result: ${binaryResult}</div>
                   <div>Decimal result: ${result}</div>
                   <div>Hexadecimal result: 0x${result.toString(16).toUpperCase()}</div>`;
        }
        
        function escapeHTML(str) {
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }
    });
    
})(jQuery);