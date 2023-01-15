// We declare the roman numbers
const ROMAN = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I"
}

/**
 * Converts decimal to Roman
 */
function convertToRoman(num) {
    // We conver the number to array of digits to be able to fetch them
    let vals = num.toString().split("");
    let str = "";

    // For each digit, we associate the correct value
    const len = vals.length;
    for (let i = 0; i < len; i++)
        if (vals[i] != 0)
            str += getRoman(
                parseInt(getDigit(vals[i], vals.length - i - 1)));

    return str;
}

/**
 * Returns the equivalent number without lower number units
 */
function getDigit(d, index) {
    return d + '000'.slice(3 - index);
}

/**
 * Returns the correct ROMAN value of a given digit
 */
function getRoman(d) {
    return ROMAN.hasOwnProperty(d)
        ? ROMAN[d]
        : calculate(d);
}

/**
 * Calculates the roman string for a non listed Roman digit
 */
function calculate(d) {
    let str = "";

    // We get the minor values that the number so we can add up
    const values = Object
        .keys(ROMAN)
        .filter(val => val < d);

    // We calculate the next char based on the values of the digits
    let cont = 0;
    let index = values.length - 1;

    // Always the value doesn't surpass the digit and there's more subvalues
    while (cont != d && index >= 0) {
        const val = parseInt(values[index]);

        // If the value were to be bigger than the actual number, we get lower values
        if (cont + val > d) {
            index--;
        } else {
            // If it can fit, we add the count and we add the char to the string
            cont += val;
            str += ROMAN[val];
        }
    }

    return str;
}

// Examples with different numbers
console.log(convertToRoman(3));
console.log(convertToRoman(900));
console.log(convertToRoman(100));
console.log(convertToRoman(88));