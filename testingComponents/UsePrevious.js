import {useRef, useEffect} from "react"

export default function usePrevious(value) {
	const previousValue = useRef()
	const currentValue = useRef(value)

	if (currentValue.current !== value) {
		previousValue.current = currentValue.current
		currentValue.current = value
	}

	return previousValue.current
}