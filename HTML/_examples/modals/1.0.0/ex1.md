---
layout: examples
weight: "-0"
brand: [Brand]
js: true
svg: true
bottom: "140px"
---

<button class="btn btn-primary js-modal" data-modal="#myModal" aria-label="Open sesame! Hit enter to open modal">Open sesame!</button>

<hr>

<button class="btn btn-primary js-modal" data-modal="#myModal2" aria-label="Open a big one. Hit enter to open modal">Open a big one</button>

<hr>

<button class="btn btn-primary js-modal" data-modal="#myModal3" aria-label="Open a small one. Hit enter to open modal">Open a small one</button>


<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="modal-header-title1" aria-describedby="modal-body1" aria-hidden="true">
	<div class="modal-header">
		<button class="modal-header-close js-modalclose icon icon-size-sm icon-cross">Close modal and return to GUI page</button>
		<span class="modal-header-title" id="modal-header-title1">Modal title</span>
	</div>
	<div class="modal-body" id="modal-body1">
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
		<button type="button" class="btn btn-hero">Save changes</button>
	</div>
</div>

<div class="modal modal-lg" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="modal-header-title2" aria-describedby="modal-body2" aria-hidden="true">
	<div class="modal-header">
		<button class="modal-header-close js-modalclose icon icon-size-sm icon-cross">Close modal and return to GUI page</button>
		<span class="modal-header-title" id="modal-header-title2">Modal title</span>
	</div>
	<div class="modal-body" id="modal-body2">
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
		<button type="button" class="btn btn-hero">Save changes</button>
	</div>
</div>

<div class="modal modal-sm" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="modal-header-title3" aria-describedby="modal-body3" aria-hidden="true">
	<div class="modal-header">
		<button class="modal-header-close js-modalclose icon icon-size-sm icon-cross">Close modal and return to GUI page</button>
		<span class="modal-header-title" id="modal-header-title3">Modal title</span>
	</div>
	<div class="modal-body" id="modal-body3">
		&lsquo;It was much pleasanter at home&rsquo;, thought poor Alice, &lsquo;when one wasn&rsquo;t always growing larger and smaller, and being ordered
		about by mice and rabbits. I almost wish I hadn&rsquo;t gone down that rabbit-hole&hellip; &rsquo;
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-faint js-modalclose">
			Close
			<span class="modal-sronly">modal and return to test-page</span>
		</button>
		<button type="button" class="btn btn-hero">Save changes</button>
	</div>
</div>