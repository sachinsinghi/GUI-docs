---
layout: examples
weight: "-0"
brand: [Brand]
js: false
svg: false
---

<div>
	{% if page.brand == 'BT' %}
		<h1 class="brand-font">I’m a Heading using the pull quote font</h1>

		<h1 class="body-font">I’m a Heading using the body font</h1>
	{% else %}
		<h1 class="brand-font">I’m a Heading using the brand font</h1>

		<h1 class="body-font">I’m a Heading using the body font</h1>
	{% endif %}
</div>