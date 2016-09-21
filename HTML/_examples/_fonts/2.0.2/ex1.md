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
		<span>Korolev Compressed Bold</span>

		<p>
			<span style="font-size:54px;" class="brand-font">
				ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
				0 1 2 3 4 5 6 7 8 9
			</span>
		</p>
	{% endif %}
	{% if page.brand == 'BSA' %}
		<span>Sans serif system font</span>

		<p>
			<span style="font-size:42px;" class="brand-font">
				ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
				abcdefghijklmnopqrstuvwxyz<br>
				0 1 2 3 4 5 6 7 8 9
			</span>
		</p>
	{% endif %}
	{% if page.brand == 'STG' %}
		<span>Dragon Bold</span>

		<p>
			<span style="font-size:42px;" class="brand-font">
				ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
				abcdefghijklmnopqrstuvwxyz<br>
				0 1 2 3 4 5 6 7 8 9
			</span>
		</p>
	{% endif %}
	{% if page.brand == 'WBC' %}
		<span>Chronicle Semibold</span>

		<p>
			<span style="font-size:42px;" class="brand-font">
				ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
				abcdefghijklmnopqrstuvwxyz<br>
				0 1 2 3 4 5 6 7 8 9
			</span>
		</p>
	{% endif %}
	{% if page.brand == 'WBG' %}
		<span>Times New Roman</span>

		<p>
			<span style="font-size:42px;" class="brand-font">
				ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
				abcdefghijklmnopqrstuvwxyz<br>
				0 1 2 3 4 5 6 7 8 9
			</span>
		</p>
	{% endif %}
	{% if page.brand == 'BT' %}
		<span>Sans serif system font</span>

		<p>
			<span style="font-size:42px;" class="brand-font">
				ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
				abcdefghijklmnopqrstuvwxyz<br>
				0 1 2 3 4 5 6 7 8 9
			</span>
		</p>
	{% endif %}
</div>