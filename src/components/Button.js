import PropTypes from "prop-types"
import {useContext} from "react"
import {HandleButtonContext} from "../App"

export default function Button({text, color}) {
	const addTabNewTask = useContext(HandleButtonContext)
	return (
		<button className="btn" style={{backgroundColor: color}} onClick={addTabNewTask} >{text}</button>
	)
}

Button.defaultProps = {
	color: "steelblue"
}

Button.propTypes = {
	color: PropTypes.string,
	text: PropTypes.string
}