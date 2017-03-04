export class NumberToWordUtil {

    static numToWords(number) {
        //Validates the number input and makes it a string
        if (typeof number === 'string') {
            number = parseInt(number, 10);
        }
        if (typeof number === 'number' && isFinite(number)) {
            number = number.toString(10);
        } else {
            return 'This is not a valid number';
        }

        //Creates an array with the number's digits and
        //adds the necessary amount of 0 to make it fully
        //divisible by 3
        let digits = number.split('');
        while (digits.length % 3 !== 0) {
            digits.unshift('0');
        }

        //Groups the digits in groups of three
        let digitsGroup = [];
        let numberOfGroups = digits.length / 3;
        for (let i = 0; i < numberOfGroups; i++) {
            digitsGroup[i] = digits.splice(0, 3);
        }
        //console.log(' Digit Group :: ', digitsGroup); //debug

        //Change the group's numerical values to text
        let digitsGroupLen = digitsGroup.length;
        let numTxt = [
            [null, 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'], //hundreds
            [null, 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'], //tens
            [null, 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'] //ones
        ];
        let tenthsDifferent = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
            'Eighteen', 'Nineteen'];

        // j maps the groups in the digitsGroup
        // k maps the element's position in the group to the numTxt equivalent
        // k values: 0 = hundreds, 1 = tens, 2 = ones
        for (let j = 0; j < digitsGroupLen; j++) {
            for (let k = 0; k < 3; k++) {
                let currentValue = digitsGroup[j][k];
                digitsGroup[j][k] = numTxt[k][currentValue];
                // !==0 avoids creating a string "null hundred"
                if (k === 0 && currentValue !== '0') {
                    digitsGroup[j][k] += ' hundred and ';
                }
                //Changes the value in the tens place and erases the value in the ones place
                else if (k === 1 && currentValue === '1') {
                    digitsGroup[j][k] = tenthsDifferent[digitsGroup[j][2]];
                    //Sets to null. Because it sets the next k to be evaluated, setting this to null doesn't work.
                    digitsGroup[j][2] = 0;
                }
            }
        }

        //console.log(digitsGroup); //debug

        //Adds '-' for gramar, cleans all null values, joins the group's elements into a string
        for (let l = 0; l < digitsGroupLen; l++) {
            if (digitsGroup[l][1] && digitsGroup[l][2]) {
                digitsGroup[l][1] += ' ';
            }
            digitsGroup[l].filter(function (e) {
                return e !== null;
            });
            digitsGroup[l] = digitsGroup[l].join('');
        }

        //console.log(digitsGroup); //debug

        //Adds thousand.
        let postfix = [null, 'thousand'];
        if (digitsGroupLen > 1) {
            let postfixRange = postfix.splice(0, digitsGroupLen).reverse();
            for (let m = 0; m < digitsGroupLen - 1; m++) { //'-1' prevents adding a null postfix to the last group
                if (digitsGroup[m]) {
                    digitsGroup[m] += ' ' + postfixRange[m];
                }
            }
        }
        //console.log(digitsGroup); //debug

        //Joins all the string into one and returns it
        return digitsGroup.join(' ');

    }
}