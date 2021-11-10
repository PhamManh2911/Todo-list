import {useState, useEffect, createContext} from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

export const HandleTaskContext = createContext()
export const HandleButtonContext = createContext()
function App() {
  const [tasks, setTasks] = useState([])
  const [tabNewTask, setTabNewTask] = useState(true)

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks")
    const data = await response.json()
    return data
  }
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    return data
  }
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])
  const addNewTask = async (newTask) => {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
    const data = await response.json()
    setTasks([...tasks, data])
  }
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`,{
      method: "DELETE"
    })
    setTasks(
      tasks.filter((task) => task.id !== id)
    )
  }
  const handleReminder = async (id) => {
    const taskToggle = await fetchTask(id)
    const updatedTask = {...taskToggle,reminder: !taskToggle.reminder}
    fetch(`http://localhost:5000/tasks/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, reminder: updatedTask.reminder} : task
      )
    )
  }
  const addTabNewTask = () => setTabNewTask(!tabNewTask)

  return (
    <Router>
      <div className="container">
        <HandleButtonContext.Provider value={addTabNewTask}>
          <Header title="My schedule" tabNewTask={tabNewTask} />
        </HandleButtonContext.Provider>
        <Route path="/" exact render={() => (
          <>
            {!tabNewTask && <AddTask onAdd={addNewTask} />}
            {tasks.length 
              ? <HandleTaskContext.Provider value={{handleDelete, handleReminder}}>
                <Tasks tasks={tasks}/>
              </HandleTaskContext.Provider>
              : <div style={{textAlign: "center"}}>There are no tasks left</div>
            }
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;