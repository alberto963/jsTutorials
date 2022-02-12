import { useState, useEffect, useCallback } from "react"

const functionsSet = new Set();

// Questa e' come nella consegna dell'esercizio originale
const TypeExp0 = () => {
  
  const [chars, setChars] = useState('')

  const handleUserKeyPress = event => {
    const {key, keyCode} = event
    if (keyCode == 32 || (keyCode >= 65 && keyCode <= 90)) {
      setChars(`${chars}${key}`)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    console.log('addEventListener')
  }, [])

  functionsSet.add(setChars)
  functionsSet.add(handleUserKeyPress)
  
  console.log(functionsSet) // Always the same for setChars, setChars is memoized, handleUserKeyPress is not memoized
  
  return <div>
    <h2>Type here</h2>
    <blockquote>{chars}</blockquote>
  </div>
}

// Questa e' come nella consegna dell'esercizio dopo la possibile correzione richiesta
const TypeExp = () => {
  
  const [chars, setChars] = useState('')

  useEffect(() => {
    window.addEventListener('keydown', setChars);

    return () => window.removeEventListener('keydown', setChars);
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
  
  const [chars, setChars] = useState('')

  const getKey = e => setChars(p => `${p}${e.key}`)
  
  const getKeyC = useCallback(e => setChars(p => `${p}${e.key}`), [chars])
  const getKeyD = useCallback(e => setChars(p => `${p}${e.key}`), [])
  
  functionsSet.add(getKey)
  functionsSet.add(getKeyC)
  functionsSet.add(getKeyD)
  
  console.log(functionsSet) // getKey e' sempre diversa, perche' i parametri cambiano ogni volta (un carattere e' sempre aggiunto). La useCallback e' inutile
  
  useEffect(() => {
    window.addEventListener('keydown', getKeyC);

    return () => window.removeEventListener('keydown', getKeyC);
  }, [])

  return <div>
    <h2>Type here</h2>
    <blockquote>{chars}</blockquote>
  </div>
}

export {Q05, TypeExp0, TypeExp}