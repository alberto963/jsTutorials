'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'fetchItemsToDisplay' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. 2D_STRING_ARRAY items
 *  2. INTEGER sortParameter
 *  3. INTEGER sortOrder
 *  4. INTEGER itemsPerPage
 *  5. INTEGER pageNumber
 */

function fetchItemsToDisplay(items, sortParameter, sortOrder, itemsPerPage, pageNumber) {
    // Write your code here

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const itemsRows = parseInt(readLine().trim(), 10);

    const itemsColumns = parseInt(readLine().trim(), 10);

    let items = Array(itemsRows);

    for (let i = 0; i < itemsRows; i++) {
        items[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    const sortParameter = parseInt(readLine().trim(), 10);

    const sortOrder = parseInt(readLine().trim(), 10);

    const itemsPerPage = parseInt(readLine().trim(), 10);

    const pageNumber = parseInt(readLine().trim(), 10);

    const result = fetchItemsToDisplay(items, sortParameter, sortOrder, itemsPerPage, pageNumber);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
