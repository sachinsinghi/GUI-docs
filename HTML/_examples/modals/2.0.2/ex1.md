---
layout: [example, demo]
permalink: ":layout/"
weight: "-0"
brand: [Brand]
js: true
svg: true
padding: "0 0 140px 0"
---

<button class="btn btn-primary js-modal js-docs" data-modal="#myModal{{ version[0] | handleize }}" aria-label="Open sesame! Hit enter to open modal">Open sesame!</button>

<hr>

<button class="btn btn-primary js-modal" data-modal="#myModal2{{ version[0] | handleize }}" aria-label="Open a big one. Hit enter to open modal">Open a big one</button>

<hr>

<button class="btn btn-primary js-modal" data-modal="#myModal3{{ version[0] | handleize }}" aria-label="Open a small one. Hit enter to open modal">Open a small one</button>


<div class="modal js-modalbody" id="myModal{{ version[0] | handleize }}" tabindex="-1" role="dialog" aria-labelledby="modal-header-title1" aria-describedby="modal-body1" aria-hidden="true">
	<div class="modal-header">
		<button class="modal-header-close js-modalclose icon icon-size-sm icon-cross">Close modal and return to GUI page</button>
		<span class="modal-header-title" id="modal-header-title1{{ version[0] | handleize }}">Modal title</span>
	</div>
	<div class="modal-body" id="modal-body1{{ version[0] | handleize }}">
		&lsquo;It was much pleasanter at home&rsquo;, thought poor Alice, &lsquo;when one wasn&rsquo;t always growing larger and smaller, and being ordered
		about by mice and rabbits. I almost wish I hadn&rsquo;t gone down that rabbit-hole — and yet — and yet — it&rsquo;s rather curious, you know, this sort
		of life! I do wonder what can have happened to me! When I used to read fairy-tales, I fancied that kind of thing never happened, and now here I am in
		the middle of one! There ought to be a book written about me, that there ought!&rsquo;
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-faint js-modalclose">
			Close
			<span class="modal-sronly">modal and return to GUI page</span>
		</button>
		<button type="button" class="btn btn-primary">Save changes</button>
	</div>
</div>

<div class="modal modal-lg" id="myModal2{{ version[0] | handleize }}" tabindex="-1" role="dialog" aria-labelledby="modal-header-title2" aria-describedby="modal-body2" aria-hidden="true">
	<div class="modal-header">
		<button class="modal-header-close js-modalclose icon icon-size-sm icon-cross">Close modal and return to GUI page</button>
		<span class="modal-header-title" id="modal-header-title2{{ version[0] | handleize }}">Modal title</span>
	</div>
	<div class="modal-body" id="modal-body2{{ version[0] | handleize }}">
		&lsquo;It was much pleasanter at home&rsquo;, thought poor Alice, &lsquo;when one wasn&rsquo;t always growing larger and smaller, and being ordered
		about by mice and rabbits. I almost wish I hadn&rsquo;t gone down that rabbit-hole — and yet — and yet — it&rsquo;s rather curious, you know, this sort
		of life! I do wonder what can have happened to me! When I used to read fairy-tales, I fancied that kind of thing never happened, and now here I am in
		the middle of one! There ought to be a book written about me, that there ought!&rsquo;
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-faint js-modalclose">
			Close
			<span class="modal-sronly">modal and return to GUI page</span>
		</button>
		<button type="button" class="btn btn-primary">Save changes</button>
	</div>
</div>

<div class="modal modal-sm" id="myModal3{{ version[0] | handleize }}" tabindex="-1" role="dialog" aria-labelledby="modal-header-title3" aria-describedby="modal-body3" aria-hidden="true">
	<div class="modal-header">
		<button class="modal-header-close js-modalclose icon icon-size-sm icon-cross">Close modal and return to GUI page</button>
		<span class="modal-header-title" id="modal-header-title3{{ version[0] | handleize }}">Modal title</span>
	</div>
	<div class="modal-body" id="modal-body3{{ version[0] | handleize }}">
		&lsquo;It was much pleasanter at home&rsquo;, thought poor Alice, &lsquo;when one wasn&rsquo;t always growing larger and smaller, and being ordered
		about by mice and rabbits. I almost wish I hadn&rsquo;t gone down that rabbit-hole&hellip; &rsquo;
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-faint js-modalclose">
			Close
			<span class="modal-sronly">modal and return to test-page</span>
		</button>
		<button type="button" class="btn btn-primary">Save changes</button>
	</div>
</div>

<script type="text/javascript">
	document.addEventListener("DOMContentLoaded", function() {
		GUI.modals.lastFocus = $('js-docs');
		GUI.modals.toggelModal( false, $('#myModal{{ version[0] | handleize }}'), '#myModal{{ version[0] | handleize }}' );
	});
</script>