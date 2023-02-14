import React, { useState } from "react";

function UserInterface() {
	const [ input, setInput ] = useState("");
	const [ output, setOutput ] = useState("");

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Call the API to get the response from the AI language model
		fetch(`http://localhost:5000/api/response?input=${ input }`)
			.then((res) => res.json())
			.then((data) => {
				setOutput(data.response);
			});
	};

	return (
		<div className="bg-gray-900 p-6 h-full">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={ handleSubmit }>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="input">
						Input
					</label>
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="input"
						rows="5"
						value={ input }
						onChange={ handleInputChange }
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<p className="text-gray-700 font-bold mb-2">Response:</p>
				<p className="text-gray-700 p-4 font-mono">{ output }</p>
			</div>
		</div>
	);
}

export default UserInterface;
