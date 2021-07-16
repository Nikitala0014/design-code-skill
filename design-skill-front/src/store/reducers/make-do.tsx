import { IChallenge } from '../../interfaces/challenge.interface';

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

export const challenges: IChallenge[] = [
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
            contentSubmissions: [
                {
                    status: 'error', 
                    score: 0.0, 
                    time: "9 days ago", 
                    submitedCodeId: "102345",
                    details: [{
                        time: '9 days ago',
                        score: '0.0',
                        status: 'error',
                        submitedCodeId: "102345",
                        submitedCode: code,
                        submissionData: [
                            {
                                status: 'error', 
                                input: [4, 1, 2, 3], 
                                userOutput: '5', 
                                expectedOutput: '3'},
                            {
                                status: 'accepted', 
                                input: [24, 2, 89, 3, 5], 
                                userOutput: '34', 
                                expectedOutput: '45'},
                            {
                                status: 'accepted', 
                                input: [7, 9, 1, 0, 3], 
                                userOutput: '12', 
                                expectedOutput: '7'}
                        ]
                    }],
                },    
                {   
                    status: 'accepted', 
                    score: 20.0, 
                    time: "one year ago", 
                    submitedCodeId: "734970",
                    details: [{
                        time: 'one year ago',
                        score: '20.0',
                        status: 'accepted',
                        submitedCodeId: "734970",
                        submitedCode: code,
                        submissionData: [
                            {
                                status: 'accepted', 
                                input: [12, 4, 2, 3, 8, 9, 2, 8], 
                                userOutput: '8', 
                                expectedOutput: '8'},
                            {
                                status: 'accepted', 
                                input: [24, 2, 89, 3, 5, 8, 2, 3, 1], 
                                userOutput: '12', 
                                expectedOutput: '12'},
                            {
                                status: 'accepted', 
                                input: [7, 9, 1, 0, 3, 5, 6, 1], 
                                userOutput: '3', 
                                expectedOutput: '3'}
                        ]
                    }],
                },
            ]
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
        content: {
            contentProblem: childrenProblem,
            contentCode: code,
            contentSubmissions: [
                {
                    status: 'accepted', 
                    score: 10.0, 
                    time: "1 day ago", 
                    submitedCodeId: "79389793",
                    details: [{
                        time: '1 day ago',
                        score: '10.0',
                        status: 'accepted',
                        submitedCodeId: "79389793",
                        submitedCode: code,
                        submissionData: [
                            {
                                status: 'accepted', 
                                input: [4, 1, 2, 3, 3, 5, 23, 21, 1], 
                                userOutput: '6', 
                                expectedOutput: '6'},
                            {
                                status: 'accepted', 
                                input: [24, 2, 89, 3, 5, 2, 45, 123], 
                                userOutput: '33', 
                                expectedOutput: '33'},
                            {
                                status: 'accepted', 
                                input: [73, 19, 51, 0, 3, 1, 5, 7], 
                                userOutput: '7', 
                                expectedOutput: '7'}
                        ]
                    }],
                },    
                {   
                    status: 'accepted', 
                    score: 25.0, 
                    time: "1 month ago", 
                    submitedCodeId: "397398230",
                    details: [{
                        time: '1 month ago',
                        score: '25.0',
                        status: 'accepted',
                        submitedCodeId: "397398230",
                        submitedCode: code,
                        submissionData: [
                            {
                                status: 'accepted', 
                                input: [1, 4, 6, 2, 7], 
                                userOutput: '1', 
                                expectedOutput: '1'},
                            {
                                status: 'accepted', 
                                input: [1, 9, 7, 8, 5, 6, 4, 2, 3], 
                                userOutput: '78', 
                                expectedOutput: '78'},
                            {
                                status: 'accepted', 
                                input: [12, 345, 567, 753], 
                                userOutput: '145', 
                                expectedOutput: '145'}
                        ]
                    }],
                },
            ]
        }
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
        content: {
            contentProblem: childrenProblem,
            contentCode: code,
            contentSubmissions: [
                {
                    status: 'error', 
                    score: 0.0, 
                    time: "2 days ago", 
                    submitedCodeId: "329042919",
                    details: [{
                        time: '2 days ago',
                        score: '0.0',
                        status: 'error',
                        submitedCodeId: "329042919",
                        submitedCode: code,
                        submissionData: [
                            {
                                status: 'error', 
                                input: [4, 1, 2, 3, 332, 3, 2, 6, 5], 
                                userOutput: '23', 
                                expectedOutput: '2'},
                            {
                                status: 'error', 
                                input: [2, 32, 49, 36, 51, 32, 21], 
                                userOutput: '7', 
                                expectedOutput: '23'},
                            {
                                status: 'error', 
                                input: [72, 912, 21, 10, 34], 
                                userOutput: '34', 
                                expectedOutput: '33'}
                        ]
                    }],
                },    
                {   
                    status: 'error', 
                    score: 5.0, 
                    time: "23 days ago", 
                    submitedCodeId: "021984090712",
                    details: [{
                        time: '23 days ago',
                        score: '5.0',
                        status: 'error',
                        submitedCodeId: "021984090712",
                        submitedCode: code,
                        submissionData: [
                            {
                                status: 'accepted', 
                                input: [1, 42, 24, 35, 68, 4, 1, 6, 7], 
                                userOutput: '13', 
                                expectedOutput: '17'},
                            {
                                status: 'accepted', 
                                input: [22, 21, 49, 23, 55, 38, 72, 9, 6], 
                                userOutput: '9', 
                                expectedOutput: '9'},
                            {
                                status: 'error', 
                                input: [732, 49, 12, 30, 33, 54, 63, 11], 
                                userOutput: '89', 
                                expectedOutput: '89'}
                        ]
                    }],
                },
            ]
        },
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
        content: {
            contentProblem: childrenProblem,
            contentCode: code,
            contentSubmissions: [
                {status: 'error', score: 0.0, time: "9 days ago", submitedCodeId: "102345"},
                {status: 'accepted', score: 20.0, time: "one year ago", submitedCodeId: "734970"}
            ]
        }
    },
];