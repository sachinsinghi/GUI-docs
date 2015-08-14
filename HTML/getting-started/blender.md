---
layout: default
title: The Blender
weight: "010.-0.010"
brand: [Brand]
parent: Getting Started
---

<div class="row">
	<div class="col-sm-10 col-sm-offset-1">
		<h2 class="body-font">How to blend</h2>
		<p class="lead">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veritatis incidunt mollitia doloremque consequatur quo itaque ipsam vero vel, porro
			laboriosam, provident, assumenda eveniet! Saepe ad velit ab atque possimus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit optio
			voluptatum reprehenderit. Quas aut aliquid doloribus autem reprehenderit. Earum amet quibusdam neque non fugit possimus esse dolorum facilis harum cumque.
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum accusamus placeat, delectus corrupti veniam ab facilis saepe assumenda ad adipisci at
			ducimus quas blanditiis quis obcaecati rerum. Minus, amet, ipsa. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, libero incidunt velit
			veniam animi magni quos architecto itaque sint minus odit, necessitatibus dolor! Dolorem excepturi enim, aliquam officiis accusantium suscipit!
		</p>
	</div>

	<div class="col-sm-7 col-sm-offset-2">
		<h3 class="body-font">First you choose</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt beatae dolorum, optio fugiat porro officiis consectetur explicabo cumque, pariatur
			iusto alias, reiciendis libero, quia nobis itaque obcaecati omnis aut molestias.
		</p>
	</div>

	<div class="col-sm-12 example">
		{% capture ID %}blender1{% endcapture %}
		{% capture category %}getting-started/blender{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 0 %}
		{% capture example %}Here comes the gist{% endcapture %}
		{% capture HTML %}{{ example }}{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}{% endcapture %}

		{% include exampleBox.liquid %}
	</div>

	<div class="col-sm-7 col-sm-offset-2">
		<h3 class="body-font">First you choose</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt beatae dolorum, optio fugiat porro officiis consectetur explicabo cumque, pariatur
			iusto alias, reiciendis libero, quia nobis itaque obcaecati omnis aut molestias.
		</p>
	</div>

	<div class="col-sm-12 example">
		{% capture ID %}blender2{% endcapture %}
		{% capture category %}getting-started/blender{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 1 %}
		{% capture example %}Here comes another gist{% endcapture %}
		{% capture HTML %}{{ example }}{% endcapture %}
		{% capture CSS %}yo yo yo{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}{% endcapture %}

		{% include exampleBox.liquid %}
	</div>
</div>