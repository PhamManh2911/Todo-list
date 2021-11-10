import {useState} from "react"

const arrayMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const setNumber = (number) => {return number < 10 ? `0${number}` : `${number}`}
export default function AddTask({onAdd}) {
	const [text, setText] = useState("")
	const [time, setTime] = useState("")
	const [reminder, setReminder] = useState(false)
	const [refuse, setRefuse] = useState(false)
	const handleTime = (event) => {
		const timer = new Date(event.target.value)
		const year = timer.getFullYear()
		const month = arrayMonth[timer.getMonth()]
		const date = setNumber(timer.getDate())
		const hour = setNumber(timer.getHours())
		const minute = setNumber(timer.getMinutes())
		setTime(`${month} ${date} ${year} ${hour}:${minute}`)
	}
	const submitEvent = (event) => {
		event.preventDefault()
		if (!text) {
			setRefuse(true)
			return
		}
		onAdd({text,time,reminder})
		setText("")
		setTime("")
		setReminder(false)
		setRefuse(false)
	}

	return (
		<form className="add-form" onSubmit={(event) => submitEvent(event)}>
			{refuse && <div style={{textAlign: "center"}}>You haven't added new task yet</div>}
			<div className="form-control">
				<label>Task</label>
				<input type="text" placeholder="Task" value={text} onChange={(event) => {setText(event.target.value); setRefuse(false)}} />
			</div>
			<div className="form-control">
				<label>Day & Time</label>
				<input type="datetime-local" onChange={handleTime} />
			</div>
			<div className="form-control form-control-check">
				<label>Reminder</label>
				<input type="checkbox" checked={reminder} onChange={(event) => setReminder(event.currentTarget.checked)} />
			</div>
			<input type="submit" className="btn btn-block" value="Add Task"/>
		</form>
	)
}