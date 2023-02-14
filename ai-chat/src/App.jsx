import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserInterface from "./components/UserInterface";

import "./assets/css/main.css";

export const Context = createContext({});

function App() {
	const [ context, setContext ] = useState({});

	return (
		<Context.Provider value={ { context, setContext } }>
			<Router>
				<Switch>
					<Route exact path="/" component={ UserInterface } />
					<Route exact path="/cat" component={ UserInterface } />
				</Switch>
			</Router>
		</Context.Provider>
	);
}

export default App;
