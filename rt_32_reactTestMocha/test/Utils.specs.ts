import { expect } from 'chai'
import { generateData } from '../src/Utils'
// import 'chai'
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha'

describe('Utils generateData', () => {
    it('should return empty array', () => {
        const r = generateData<number>(0, 0, null)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(0)
    })
})
