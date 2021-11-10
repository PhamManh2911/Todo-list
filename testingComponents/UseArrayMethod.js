import { useState } from "react"

export default function useArrayMethod(initialArray) {
  const [array, changeArray] = useState(initialArray)

  function push(element) {
    changeArray(array => [...array,element])
  }
  function filter(callback) {
    changeArray(() => array.filter(callback))
  }
  function map(callback) {
    changeArray(() => array.map(callback))
  }
  function update(index, newElement) {
    changeArray(array => 
      [...array.slice(0,index),
      newElement,
      ...array.slice(index+1,array.length)])
  }
  function slice(startIndex,endIndex) {
    changeArray(() => array.slice(startIndex,endIndex))
  }
  function remove(index) {
    changeArray(() => 
      [...array.slice(0,index),
      ...array.slice(index+1,array.length)])
  }
  function clear() {
    changeArray(() => [])
  }

  return ({array, push, filter, map, update, slice, remove, clear})
}