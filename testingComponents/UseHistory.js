import {useRef, useState, useEffect, useCallback} from "react"

export default function useHistory(value) {
	const currentValue = useRef(value)
	const historyValue = useRef([currentValue.current])
	const [searchedValue, setSearchedValue] = useState()
	const [searchedIndex, setSearchedIndex] = useState(-1)

	if (currentValue.current !== value) {
		currentValue.current = value
		setSearchedValue(() => historyValue.current[searchedIndex])
		historyValue.current = [...historyValue.current,currentValue.current]
	}
	useEffect(() => {
		setSearchedIndex(c => c+1)
	},[value])
	// useEffect(() => console.log(searchedValue),[searchedIndex])


	const goBack = useCallback(() => {	
		setSearchedIndex(searchedIndex+1)
		setSearchedValue(() => historyValue.current[searchedIndex+1])
	},[])
	const goForward = useCallback(() => {
		setSearchedIndex(c => c+1)
		console.log(searchedIndex)
		setSearchedValue(() => historyValue.current[searchedIndex+1])
	},[])
	const goToIndex = useCallback((index) => {
	setSearchedIndex(() => index)
	console.log(searchedIndex)
	setSearchedValue(() => historyValue.current[index])
	},[])
	// function goBack() {
	// 	setSearchedIndex(c => c-1)
	// 	console.log(searchedIndex)
	// 	setSearchedValue(() => historyValue.current[searchedIndex-1])
	// 	console.log(searchedValue)
	// }
	// function goForward() {
	// 	setSearchedIndex(c => c+1)
	// 	console.log(searchedIndex)
	// 	setSearchedValue(() => historyValue.current[searchedIndex+1])
	// }
	// function goToIndex(index) {
	// 	setSearchedIndex(() => index)
	// 	console.log(searchedIndex)
	// 	setSearchedValue(() => historyValue.current[index])
	// }

	return [historyValue.current,
	 searchedValue,
	 searchedIndex,
	 goBack, 
	 goForward,
	 goToIndex]
}



