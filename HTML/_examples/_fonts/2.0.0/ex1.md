---
layout: [example, demo]
permalink: ":layout/"
weight: "-0"
brand: [Brand]
js: false
svg: false
---

<div>
	{% if page.brand == 'BOM' %}
		<h1 class="text-primary h1" style="font-weight:500;">I&rsquo;m your brand font medium</h1>

		<h1 class="text-primary h1" style="font-weight:300;">I&rsquo;m your brand font light</h1>
	{% endif %}
	{% if page.brand == 'BSA' %}
		<h1 class="text-primary h1" style="font-weight:700;">I&rsquo;m your brand font bold</h1>

		<h1 class="text-primary h1" style="font-weight:400;">I&rsquo;m your brand font regular</h1>

		<h1 class="text-primary h1" style="font-weight:300;">I&rsquo;m your brand font light</h1>
	{% endif %}
	{% if page.brand == 'STG' %}
		<h1 class="text-primary h1" style="font-weight:400;">I&rsquo;m Dragon bold</h1>
	{% endif %}
	{% if page.brand == 'WBC' %}
		<h1 class="text-primary h1" style="font-weight:700;">I&rsquo;m your brand font bold</h1>

		<h1 class="text-primary h1" style="font-weight:400;">I&rsquo;m your brand font regular</h1>
	{% endif %}
</div>