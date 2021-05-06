import {calAvgReview} from "../../helpers/calAvgReview"

describe('Test function calAvgReview - Calculates and returns the string type of the decimal number', () => {
    let dataReview = [
        {
            score: 5,
        },
        {
            score: 3,
        }
    ]
    it('5 + 3 / 2 = ', () => {
        expect(calAvgReview(dataReview)).toBe("4.0");
    })
})

describe('Test function calAvgReview - if there is no data, number 0 is returned', () => {
    let dataReview = []
    it('parameter is empty', () => {
        expect(calAvgReview(dataReview)).toBe(0);
    })
})

describe('Test function calAvgReview', () => {
    it('No parameter', () => {
        expect(calAvgReview()).toBe(null);
    })
})
