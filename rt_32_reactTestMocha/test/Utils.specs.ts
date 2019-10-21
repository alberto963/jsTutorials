import { expect } from 'chai'
import { t, generateData, IFunc } from '../src/Utils'

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha'

const r00 = []
const r10 = [{x: true, y: false}]

describe('Utils generateData', () => {
    const t0 = t()

    it('should return empty array with boolean function', () => {
        const f: IFunc<boolean> = {x: v => true, y: v => false}
        const r = generateData<boolean>(t0, 0, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(0)
    })

    it('should return empty array with number function', () => {
        const f: IFunc<number> = {x: v => 0, y: v => 0}
        const r = generateData<number>(t0, 0, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(0)
    })

    it('should return empty array with struct type function', () => {
        interface IE<T> {
            v0: T
            v1: T
        }
        const f: IFunc<IE<boolean>> = {x: v => ({v0: !v, v1: !!v}), y: v => ({v0: !!v, v1: !v})}

        const r = generateData<IE<boolean>>(t0, 0, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(0)
    })

    it('should return one element array with boolean function', () => {
        const f: IFunc<boolean> = {x: v => true, y: v => false}
        const r = generateData<boolean>(t0, 1, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(r10.length)
        expect(r).to.deep.equal(r10)
    })

    it('should return one element  array with number function', () => {
        const f: IFunc<number> = {x: v => 0, y: v => 0}
        const r = generateData<number>(t0, 1, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(1)
    })

    it('should return one element  array with struct type function', () => {
        interface IE<T> {
            v0: T
            v1: T
        }
        const f: IFunc<IE<boolean>> = {x: v => ({v0: !v, v1: !!v}), y: v => ({v0: !!v, v1: !v})}

        const r = generateData<IE<boolean>>(t0, 1, f)
        expect(r).to.be.an('array')
        expect(r).to.have.lengthOf(1)
    })
})
