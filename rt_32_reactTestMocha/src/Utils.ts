export const t = (): number => Math.floor(Date.now() / 1000)

export const dt = (t0: number): string => {
    return (t() - t0) + ' :: '
}

interface IElem<T> {
    x: T
    y: T
}

export interface IFunc<T> {
    x (v: number): T,
    y (v: number): T
}

export type Data<T> = Array<IElem<T>>

export function generateData<T> (t0: number, d: number, f: IFunc<T>): Data<T> {
    console.info(dt(t0) + 'generating data... d=', d)
    return  [...new Array<T>(d)].map((r, x) => ({
     x: f.x(x),
     y: f.y(x * d)
   }))
 }
