import {useState, useCallback} from "react"
import useHistory from "./UseHistory"
function App() {
  const [count, setCount] = useState(1);
  const [name,setName] = useState("boorio")
  const [historyValue, searchedValue, searchedIndex, goBack, goForward, goToIndex] = useHistory(count)
  return (
    <>
      <div>History value of count {historyValue.join(",")}</div>
      <div>SearchedValue is {searchedValue}</div>
      <div>SearchedIndex is {searchedIndex}</div>
      <button onClick={() => setCount(c => c*2)}>Double</button>
      <button onClick={() => setCount(c => c + 1)}>Increase</button>
      <button onClick={() => goBack()}>GoBack</button>
      <button onClick={() => goForward()}>GoForward</button>
      <button onClick={() => goToIndex(2)}>GoToIndex2</button>
      <h2>Name: {name}</h2>
      <button onClick={() => setName(name => name = "vic")}>Set Name</button>

    </>
  );
}

export default App;
