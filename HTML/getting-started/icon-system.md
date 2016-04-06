---
layout: default
title: Icon system
weight: "010.-0.060"
brand: [Brand]
parent: Getting Started
---

<div class="row">
	<div class="col-sm-12 col-md-10 col-md-offset-1 content-textblock">
		<h2 class="body-font">What is different?</h2>
		<p class="lead">
			The new icon system (GUI 2.*) is based on the new svg <a href="http://www.grunticon.com/" target="_blank">Grunticon</a> system from the genius
			<a href="https://www.filamentgroup.com/" target="_blank">Filament group</a>.
		</p>
		<p class="lead">
			GUI 1.* uses an icon font where each icon is a character in the font. Although this works well, there are a couple of drawbacks, including accessibility
			and file size. Using the new icon system, we can now display semantic, accessible icons when required.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-sm-10 col-md-8 col-md-offset-2 col-sm-offset-1 content-textblock">
		<h3 class="body-font">Embedding icons</h3>
		<p class="content-text">
			There are two ways to use svg&rsquo;s: as a background image or direct embedding. Both methods are valid however it&rsquo;s important to understand the
			implications. For example using the background method is not semantic or accessible whereas direct embedding is accessible as every svg comes
			with a title attribute that reflects its name. Embedded icons can be manipulated with CSS or JavaScript.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-md-10 col-md-offset-1 example">
		{% capture ID %}blender1{% endcapture %}
		{% capture category %}getting-started/icon-system{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 0 %}
		{% capture example %}
			<span class="icon icon-size-lg icon-message" data-grunticon-embed></span>
			<hr>
			<span class="icon icon-size-lg icon-info" data-grunticon-embed></span>
			<hr>
			<span class="icon icon-size-lg icon-umbrella" data-grunticon-embed></span>
		{% endcapture %}
		{% capture HTML %}
	<span class="icon icon-size-lg icon-message" data-grunticon-embed></span>
		{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}{% endcapture %}

		{% include exampleBox.liquid %}
	</div>

</div>


<div class="row">

	<div class="col-sm-10 col-md-8 col-md-offset-2 col-sm-offset-1 content-textblock">
		<h3 class="body-font">Icons as background image</h3>
		<p class="content-text">
			In certain cases where an icon does not add direct value, you may not want a screen reader to detect the icon. In these instances, you still have the
			option to use the icon as a background image. Doing so will mean that the image will not be read out by assistive technologies, nor will it easily print.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-md-10 col-md-offset-1 example">
		{% capture ID %}blender1{% endcapture %}
		{% capture category %}getting-started/icon-system{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 1 %}
		{% capture example %}
			<span class="icon icon-size-lg icon-message"></span>
			<hr>
			<span class="icon icon-size-lg icon-info"></span>
			<hr>
			<span class="icon icon-size-lg icon-umbrella"></span>
		{% endcapture %}
		{% capture HTML %}
	<span class="icon icon-size-lg icon-message"></span>
		{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}{% endcapture %}

		{% include exampleBox.liquid %}
	</div>
</div>