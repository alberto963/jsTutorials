import { expect } from 'chai'
import { generateData, IFunc } from '../src/Utils'

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha'

describe('Utils generateData', () => {

    it('should return empty array with boolean function', () => {
        const f: IFunc<boolean> = {x: v => true, y: v => false}
        const r = generateData<boolean>(0, 0, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(0)
    })

    it('should return empty array with number function', () => {
        const f: IFunc<number> = {x: v => 0, y: v => 0}
        const r = generateData<number>(0, 0, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(0)
    })

    it('should return empty array with struct type function', () => {
        interface IE<T> {
            v0: T
            v1: T
        }
        const f: IFunc<IE<boolean>> = {x: v => ({v0: !v, v1: !!v}), y: v => ({v0: !!v, v1: !v})}

        const r = generateData<IE<boolean>>(0, 0, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(0)
    })

    it('should return one element array with boolean function', () => {
        const f: IFunc<boolean> = {x: v => true, y: v => false}
        const r = generateData<boolean>(0, 1, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(1)
    })

    it('should return one element  array with number function', () => {
        const f: IFunc<number> = {x: v => 0, y: v => 0}
        const r = generateData<number>(0, 1, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(1)
    })

    it('should return one element  array with struct type function', () => {
        interface IE<T> {
            v0: T
            v1: T
        }
        const f: IFunc<IE<boolean>> = {x: v => ({v0: !v, v1: !!v}), y: v => ({v0: !!v, v1: !v})}

        const r = generateData<IE<boolean>>(0, 1, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(1)
    })
})
