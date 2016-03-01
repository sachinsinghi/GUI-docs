---
layout: examples
weight: "-0"
brand: [Brand]
js: true
svg: true
---

<div class="btn-dropdown" aria-haspopup="true">
	<button type="button" class="btn btn-primary js-button-dropdown" aria-label="Primary with buttons. Hit enter to open dropdown">
		<span class="btn-dropdown-caret">Primary with buttons</span>
	</button>
	<ul class="dropdown-menu" role="menu" aria-label="Hit the Esc key to close dropdown" tabindex="-1">
		<li class="dropdown-menu-headline">Headline</li>
		<li><button class="btn btn-link">Action 1</button></li>
		<li><button class="btn btn-link">Another action</button></li>
		<li class="dropdown-menu-headline dropdown-menu-divider">Headline 2</li>
		<li><button class="btn btn-link">Action 3</button></li>
		<li><button class="btn btn-link">Last action</button></li>
	</ul>
</div>

<hr>

<div class="btn-dropdown" aria-haspopup="true">
	<button type="button" class="btn btn-hero js-button-dropdown" aria-label="Hero with buttons. Hit enter to open dropdown">
		<span class="btn-dropdown-caret">Hero with buttons</span>
	</button>
	<ul class="dropdown-menu" role="menu" aria-label="Hit the Esc key to close dropdown" tabindex="-1">
		<li class="dropdown-menu-headline">Headline</li>
		<li><button class="btn btn-link">Action 1</button></li>
		<li><button class="btn btn-link">Another action</button></li>
		<li class="dropdown-menu-headline dropdown-menu-divider">Headline 2</li>
		<li><button class="btn btn-link">Action 3</button></li>
		<li><button class="btn btn-link">Last action</button></li>
	</ul>
</div>

<hr>

<div class="btn-dropdown" aria-haspopup="true">
	<button type="button" class="btn btn-neutral js-button-dropdown" aria-label="Neutral with links. Hit enter to open dropdown">
		<span class="btn-dropdown-caret">Neutral with links</span>
	</button>
	<ul class="dropdown-menu" role="menu" aria-label="Hit the Esc key to close dropdown" tabindex="-1">
		<li class="dropdown-menu-headline">Headline</li>
		<li><a href="{{ page.title | handleize }}/#url">Action 1</a></li>
		<li><a href="{{ page.title | handleize }}/#url">Another action</a></li>
		<li class="dropdown-menu-headline dropdown-menu-divider">Headline 2</li>
		<li><a href="{{ page.title | handleize }}/#url">Action 3</a></li>
		<li><a href="{{ page.title | handleize }}/#url">Last action</a></li>
	</ul>
</div>

<hr>

<div class="btn-dropdown" aria-haspopup="true">
	<button type="button" class="btn btn-faint js-button-dropdown" aria-label="Faint with links. Hit enter to open dropdown">
		<span class="btn-dropdown-caret">Faint with links</span>
	</button>
	<ul class="dropdown-menu" role="menu" aria-label="Hit the Esc key to close dropdown" tabindex="-1">
		<li class="dropdown-menu-headline">Headline</li>
		<li><a href="{{ page.title | handleize }}/#url">Action 1</a></li>
		<li><a href="{{ page.title | handleize }}/#url">Another action</a></li>
		<li class="dropdown-menu-headline dropdown-menu-divider">Headline 2</li>
		<li><a href="{{ page.title | handleize }}/#url">Action 3</a></li>
		<li><a href="{{ page.title | handleize }}/#url">Last action</a></li>
	</ul>
</div>