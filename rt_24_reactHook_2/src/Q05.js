import { useState, useEffect, useCallback } from "react"

const functionsSet = new Set();

// Questa e' come nella consegna dell'esercizio
const TypeExp = () => {
  
  const [chars, setChars] = useState('')

  useEffect(() => {
    window.addEventListener('keypress', setChars);

    return () => window.removeEventListener('keypress', setChars);
  }, [])

  functionsSet.add(setChars)
  
  console.log(functionsSet) // Always the same, setChars is memoized
  
  return <div>
    <h2>Type here</h2>
    <blockquote>{chars.key}</blockquote>
  </div>
}

// Questo e' come avrebbe il pezzo di codice un senso....
const Q05 = () => {
  
  const [chars, setChars] = useState('x')

  const getKey = e => setChars(p => `${p}${e.key}`)
  
  const getKeyC = useCallback(e => setChars(p => `${p}${e.key}`), [chars])
  const getKeyD = useCallback(e => setChars(p => `${p}${e.key}`), [])
  
  functionsSet.add(getKey)
  functionsSet.add(getKeyC)
  functionsSet.add(getKeyD)
  
  console.log(functionsSet) // getKey e' sempre diversa, perche' i parametri cambiano ogni volta (un carattere e' sempre aggiunto). La useCallback e' inutile
  
  useEffect(() => {
    window.addEventListener('keypress', getKeyC);

    return () => window.removeEventListener('keypress', getKeyC);
  }, [])

  return <div>
    <h2>Type here</h2>
    <blockquote>{chars}</blockquote>
  </div>
}

export {Q05, TypeExp}