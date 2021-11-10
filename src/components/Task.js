import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {useContext} from "react"
import {HandleTaskContext} from "../App"

export default function Task({task}) {
	const {handleDelete, handleReminder} = useContext(HandleTaskContext)
	return (
		<div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => handleReminder(task.id)}>
			<h3>
				{task.text}
				<FontAwesomeIcon icon={faTimes} size="lg" style={{color: "red"}} onClick={() => handleDelete(task.id)}/>
			</h3>
			<div>{task.time}</div>
		</div>
	)
}