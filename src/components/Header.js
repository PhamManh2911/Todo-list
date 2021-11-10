import Button from "./Button"
import {useLocation} from "react-router-dom"

export default function Header({title, tabNewTask}) {
	const currentLocation = useLocation()
	return (
		<header className="header">
			<h1>{title}</h1>
			{currentLocation.pathname === "/" && <Button text={tabNewTask ? "Add" : "Close"} color={tabNewTask ? "green" : "red"} />}
		</header>
	)
}