export const childrenEditorial = `
<ol>
    <li>
        The idea is that if  occupies  position,  occupies  position and so on, 
        then there will be some integer  which will occupy  position. 
        So, this forms a cycle.
    </li>
    <li>
        So, if any element  is not at its correct position, we shift it to its correct 
        position , then shift  to its correct position  and so on. So, if  is the length 
        of the cycle (number of elements in the cycle), then it will require a minimum of  
        swaps to rearrange the elements of the cycle to their correct positions.
    </li>
    <li>
        We find all such cycles and compute our answer.
    </li>
</ol>
<p>
    The correct positions of all the elements can be found by sorting the array 
    by value and keeping track of the old and new positions. You may gain more clarity 
    by the setters solution.
</p>
`

export const childrenProblem = `
    <p>You are given an unordered array consisting of consecutive integers -
    [1, 2, 3, ..., n] without any duplicates. You are allowed to swap any 
    two elements.  Find the minimum number of swaps required to sort the 
    array in ascending order.  </p>
    <p><strong>Example</strong>   </p>
    <p>Perform the following steps:  </p>
    <pre><code>i   arr                         swap (indices)
    0   [7, 1, 3, 2, 4, 5, 6]   swap (0,3)
    1   [2, 1, 3, 7, 4, 5, 6]   swap (0,1)
    2   [1, 2, 3, 7, 4, 5, 6]   swap (3,4)
    3   [1, 2, 3, 4, 7, 5, 6]   swap (4,5)
    4   [1, 2, 3, 4, 5, 7, 6]   swap (5,6)
    5   [1, 2, 3, 4, 5, 6, 7]
    </code></pre>
    <p>It took 5 swaps to sort the array.</p>
    <p><strong>Function Description</strong></p>
    <p>Complete the function <em>minimumSwaps</em> in the editor below.   </p>
    <p>minimumSwaps has the following parameter(s):</p>
    <ul>
    <li><em>int arr[n]:</em> an unordered array of integers   </li>
    </ul>
    <p><strong>Returns</strong>   </p>
    <ul>
    <li><em>int:</em> the minimum number of swaps to sort the array   </li>
    </ul>
`

export const code = 
`
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/*$/, '')
        .split('\n')
        .map(str => str.replace(/*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
`

export const challenges = [
    {
        _id: '1',
        title: 'Minimum Swaps 2',
        status: 'unsolved',
        details: {
            difficulty: 'Medium',
            skill: 'Intermediate',
            maxScore: '40',
            successRatio: '76.10%',
        },
        preview: 'Return the minimum number of swaps to sort the given array.',
        content: {
            contentProblem: childrenProblem,
            contentCode: code,
        }
    },
    {
        _id: '2',
        title: '2D Array - DS',
        status: 'unsolved',
        details: {
            difficulty: 'Easy',
            skill: 'Basic',
            maxScore: '15',
            successRatio: '92.91%',
        },
        preview: 'Return the minimum number of swaps to sort the given array.',
    },
    {
        _id: '3',
        title: 'Array Manipulation',
        status: 'unsolved',
        details: {
            difficulty: 'Hard',
            skill: 'Intermediate',
            maxScore: '60',
            successRatio: '56.81%',
        },
        preview: 'Return the minimum number of swaps to sort the given array.',
    },
    {
        _id: 'newChallenge',
        title: 'Challenge Name',
        status: 'unsolved',
        details: {
            difficulty: 'Hard',
            skill: 'Intermediate',
            maxScore: '60',
            successRatio: '56.81%',
        },
        preview: 'Enter here short preview for this challenge',
    },
];