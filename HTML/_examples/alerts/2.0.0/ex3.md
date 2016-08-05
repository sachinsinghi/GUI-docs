---
layout: [example, demo]
permalink: ":layout/"
weight: "-0"
brand: [Brand]
js: true
svg: true
---

<div class="alert-form has-warning">
	<input type="text" class="input-field" placeholder="I'm a default text input" aria-describedby="txt4">
	<p id="txt4" class="alert-form-msg">Warning! Are you sure this is what you want to do?</p>
</div>


<div class="alert-form has-danger">
	<div class="input-field-select-wrapper">
		<select class="input-field-select" aria-describedby="txt7">
			<option>Please select</option>
			<option>Option A</option>
			<option>Option B</option>
			<option>Option C</option>
			<option>Option D</option>
			<option>Option E</option>
			<option>Option F</option>
			<option>Option G</option>
		</select>
	</div>

	<p id="txt7" class="alert-form-msg">Hey, wait! You need to select something.</p>
</div>