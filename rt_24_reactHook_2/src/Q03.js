import { useState } from "react"

const LoadingMCQ = () => {
  const [token] = useState(() => {
    let token = window.localStorage.getItem("access-token")
	
	return token || "default#-token#"
  })
  
  return <div>Token is {token}</div>
}

const LazyLoading = () => {
	const [value] = useState(() => {
		let n1 = 0, n2 = 1, nextTerm;
		for (let i = 1; i <= 1000; i++) {
			nextTerm = n1 + n2;
			n1 = n2;
			n2 = nextTerm;
		}
		
		return nextTerm
  })
  
    return <div>Fibonacci 1000 is {value}</div>
}
const Q03 = () => <LoadingMCQ />
  
export {Q03, LazyLoading}