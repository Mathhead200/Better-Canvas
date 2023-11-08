const DEBUG_PREFIX = "Better Canvas (speed_grader.js):";
console.log(DEBUG_PREFIX, "title = ", document.head.querySelector("title").innerText);  // DEBUG

// create buttons for "full marks" and "zero (0)"
let questions_div = document.querySelector("#questions");
let grade_inputs = document.querySelectorAll(".question_input_hidden");
if (questions_div && grade_inputs.length !== 0) {
	console.log(DEBUG_PREFIX, "Yes #questions");  // DEBUG

	let point_totals = [...document.querySelectorAll(".question_points")]
		.map(span => span.innerText)
		.map(text => +text.substr(text.indexOf("/") + 1));  // parse number after slash; e.g., " / 5" -> 5

	// helper functions
	const create_btn = (innerHTML, className, onclick) => {
		let btn = document.createElement("button");
		btn.innerHTML = innerHTML;
		btn.className = className;
		btn.addEventListener("click", onclick);
		return btn;
	};
	
	// buttons
	let full_marks_btn = create_btn("Full Marks &#x2713;", "full_marks", () => {
		for (let i = 0; i < grade_inputs.length; i++)
			grade_inputs[i].value = point_totals[i];
	});
	let zero_btn = create_btn("Zero (0)", "zero", () => {
		grade_inputs.forEach(input => input.value = 0);
	});
	
	// append buttons
	let buttons = document.createElement("div");
	buttons.classList.add("better_canvas", "buttons");
	buttons.append(full_marks_btn, zero_btn);
	questions_div.after(buttons);
} else {
	console.log(DEBUG_PREFIX, "No #questions");  // DEBUG
}