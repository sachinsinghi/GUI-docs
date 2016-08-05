---
layout: [example, demo]
permalink: ":layout/"
weight: "-0"
brand: [Brand]
js: false
svg: false
---

<div>
	<span>
		{% if page.brand == 'BOM' %}
			Stag
		{% endif %}
		{% if page.brand == 'BSA' %}
			Sans serif system font
		{% endif %}
		{% if page.brand == 'STG' %}
			Dragon Bold
		{% endif %}
		{% if page.brand == 'WBC' %}
			Times New Roman
		{% endif %}
		{% if page.brand == 'WBG' %}
			Times New Roman
		{% endif %}
		{% if page.brand == 'BT' %}
			Sans serif system font
		{% endif %}
	</span>

	<p>
		<span style="font-size:42px;" class="brand-font">
			ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
			abcdefghijklmnopqrstuvwxyz<br>
			0123456789
		</span>
	</p>
</div>