import {calDate} from "../../helpers/calDate"

describe('Test function calDate', () => {
    it('Have parameters', () => {
        expect(calDate(new Date("04/30/2021"), new Date("05/01/2021"))).toBe(1);
    })
})

describe('Test function calDate 1', () => {
    it('No parameters', () => {
        expect(calDate()).toEqual(0);
    })
})