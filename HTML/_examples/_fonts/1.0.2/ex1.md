---
layout: examples
weight: "-0"
brand: [Brand]
js: false
svg: false
---

<div>
	{% if page.brand == 'BOM' %}
		<h1 class="text-primary" style="font-weight:500;">I&rsquo;m Stag medium</h1>

		<h1 class="text-primary" style="font-weight:300;">I&rsquo;m Stag light</h1>
	{% endif %}
	{% if page.brand == 'BSA' %}
		<h1 class="text-primary" style="font-weight:700;">I&rsquo;m your system font bold</h1>

		<h1 class="text-primary" style="font-weight:400;">I&rsquo;m your system font regular</h1>

		<h1 class="text-primary" style="font-weight:300;">I&rsquo;m your system font light</h1>
	{% endif %}
	{% if page.brand == 'STG' %}
		<h1 class="text-primary" style="font-weight:400;">I&rsquo;m Dragon bold</h1>
	{% endif %}
	{% if page.brand == 'WBC' %}
		<h1 class="text-primary" style="font-weight:700;">I&rsquo;m Times New Roman bold</h1>

		<h1 class="text-primary" style="font-weight:400;">I&rsquo;m Times New Roman regular</h1>
	{% endif %}
</div>