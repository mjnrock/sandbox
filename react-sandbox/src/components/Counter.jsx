import { useState, useEffect } from "react";

function* counter() {
	let state = [ { count: 0, ts: Date.now() } ];
	while(true) {
		const action = yield state;

		// Importantly, if state isn't reassigned, the useState hook won't trigger a re-render
		if(typeof action === "object") {
			let previous = state[ state.length - 1 ].count;
			switch(action.type) {
				case "INCREMENT":
					state = [ ...state, { count: previous + 1, ts: Date.now() } ];
					break;
				case "DECREMENT":
					state = [ ...state, { count: previous - 1, ts: Date.now() } ];
					break;
				default:
					break;
			}
		}
	}
}

const store = counter();

// React component that uses the state manager
export function Counter() {
	const [ state, setState ] = useState(store.next().value);

	const dispatch = action => {
		setState(store.next(action).value);
	};

	useEffect(() => {
		(async () => {
			console.log(Date.now(), state);
		})();
	}, [ state ]);

	return (
		<div className="flex items-center justify-center h-screen select-none">
			<div className="p-8 bg-white rounded-lg shadow-lg">
				<h1 className="mb-4 text-2xl font-bold text-center">Count: <span className="text-gray-400">{ state[ state.length - 1 ].count }</span></h1>
				<div className="flex justify-center gap-4">
					<button className="p-3 text-gray-700 border border-transparent rounded-lg hover:bg-gray-100 hover:border hover:border-solid hover:border-gray-200 focus:outline-none" onClick={ () => dispatch({ type: "DECREMENT" }) }>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M20 12H4" />
						</svg>
					</button>
					<button className="p-3 text-gray-700 border border-transparent rounded-lg hover:bg-gray-100 hover:border hover:border-solid hover:border-gray-200 focus:outline-none" onClick={ () => dispatch({ type: "INCREMENT" }) }>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 6v12M6 12h12" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Counter;