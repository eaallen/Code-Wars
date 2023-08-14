/**
 * 
 * - Combination	Example roll	Points
 * - Straight (1,2,3,4,5 and 6)	6 3 1 2 5 4	1000 points
 * - Three pairs of any dice	2 2 4 4 1 1	750 points
 * - Three of 1	1 4 1 1	1000 points
 * - Three of 2	2 3 4 2 2	200 points
 * - Three of 3	3 4 3 6 3 2	300 points
 * - Three of 4	4 4 4	400 points
 * - Three of 5	2 5 5 5 4	500 points
 * - Three of 6	6 6 2 6	600 points
 * - Four of a kind	1 1 1 1 4 6	2 × Three-of-a-kind score (in example, 2000 pts)
 * - Five of a kind	5 5 5 4 5 5	3 × Three-of-a-kind score (in example, 1500 pts)
 * - Six of a kind	4 4 4 4 4 4	4 × Three-of-a-kind score (in example, 1600 pts)
 * - Every 1	4 3 1 2 2	100 points
 * - Every 5	5 2 6	50 points
 * 
 * 
 * @param {number[]} dice 
 * @returns 
 */
function getScore(dice) {
    let leftOverDice = [...dice]
    let totalPoints = 0
    let bigistPoints = 0
    do {
        const allPossiblePoints = [
            [0, leftOverDice],
            straight(leftOverDice),
            threeOrMoreOfAKind(leftOverDice, 1),
            threeOrMoreOfAKind(leftOverDice, 2),
            threeOrMoreOfAKind(leftOverDice, 3),
            threeOrMoreOfAKind(leftOverDice, 4),
            threeOrMoreOfAKind(leftOverDice, 5),
            threeOrMoreOfAKind(leftOverDice, 6),
            everyOne(leftOverDice),
            everyFive(leftOverDice),
            threePairs(leftOverDice)
        ]
        bigistPoints = allPossiblePoints.sort((a, b) => b[0] - a[0])
        totalPoints += bigistPoints[0][0]
        leftOverDice = bigistPoints[0][1]
    } while (bigistPoints[0][0] > 0)

    return totalPoints;
}

/**
 * 
 * @param {number[]} dice 
 * @returns {[number, number[]]}
 */
function straight(dice) {
    const sorted = [...dice].sort()
    if (sorted.join() === "1,2,3,4,5,6") {
        return [1000, []]
    }
    return [0, dice]
}

/**
 * 
 * @param {number[]} dice 
 * @returns {[number, number[]]}
 */
function threePairs(dice) {
    if (dice.length < 6) {
        return [0, dice]
    }

    for (const num of [1, 2, 3, 4, 5, 6]) {
        if (dice.filter(x => x === num).length > 2) {
            return [0, dice]
        }
    }

    const sorted = [...dice].sort()
    if (sorted[0] === sorted[1] && sorted[2] === sorted[3] && sorted[4] === sorted[5]) {
        return [750, []]
    }
}



/**
 * 
 * @param {number[]} dice 
 * @param {number} kind 
 * @returns {[number, number[]]}
 */
function threeOrMoreOfAKind(dice, kind) {
    const filtered = dice.filter(x => x === kind)
    if (filtered.length < 3) {
        return [0, dice]
    }
    if (kind === 1) {
        return [1000 * (filtered.length - 3 + 1), dice.filter(x => !filtered.includes(x))]
    }

    return [kind * 100 * (filtered.length - 3 + 1), dice.filter(x => !filtered.includes(x))]
}


/**
 * Every One is worth 100 points
 * @param {number[]} dice 
 * @returns {[number, number[]]}
 */
function everyOne(dice) {
    const ones = dice.filter(x => x === 1)
    const score = ones.length * 100
    return [score, dice.filter(x => !ones.includes(x))]
}

/**
 * Every five is worth 100 points
 * @param {number[]} dice 
 * @returns {[number, number[]]}
 */

function everyFive(dice) {
    const fives = dice.filter(x => x === 5)
    const score = fives.length * 50
    return [score, dice.filter(x => !fives.includes(x))]
}



// getScore([1, 2, 3, 5, 6, 4])