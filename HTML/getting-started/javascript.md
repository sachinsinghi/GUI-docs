---
layout: default
title: Javascript framework
weight: "010.-0.030"
brand: [Brand]
parent: Getting Started
---

<div class="row">
	<div class="col-sm-12 col-md-10 col-md-offset-1 content-textblock">
		<h2 class="body-font">Using the JavaScript framework</h2>
		<p class="lead">
			The GUI <a href="getting-started/core-modules">core</a> module <a href="helpers/#_javascript-helpers">_javascript-helpers</a> comes with some
			great things you can use in your project and a framework you can easily extend to fit your needs.
		</p>
	</div>

</div>


<div class="row">

	<div id="debugflag" class="col-sm-10 col-md-8 col-md-offset-2 col-sm-offset-1 content-textblock has-id">
		<h3 class="body-font">The DEBUG flag</h3>
		<p class="content-text">
			The DEBUG flag determines whether we write debug messages to the console and can be toggled with <code class="classes">GUI.DEBUG</code>.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-md-10 col-md-offset-1 example">
		{% capture ID %}javascript1{% endcapture %}
		{% capture category %}getting-started/javascript{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 1 %}
		{% capture example %}{% endcapture %}
		{% capture HTML %}{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}
			Switch DEBUG on with: <code class="classes">GUI.DEBUG = true;</code><br>
			Switch DEBUG off with: <code class="classes">GUI.DEBUG = false;</code>
		{% endcapture %}

		{% include exampleBox.liquid %}
	</div>

</div>


<div class="row">

	<div id="debounce" class="col-sm-10 col-md-8 col-md-offset-2 col-sm-offset-1 content-textblock has-id">
		<h3 class="body-font">The Debounce method</h3>
		<p class="content-text">
			Debouncing ensures that a function can only be called after passing an x amount of time of it's last call. This is important for performance and
			will make sure events that, by their nature, are called several times per second only execute after the bulk of it has passed to keep processing
			to a minimum. An example use-case would be when you add a listener to the resize event of the browser window. When the browser is then resized the
			event would fire many times during the resizing, executing your listener each time. Adding the debouncer to the event listener will ensure your listener
			will only fire after the resize is seemingly done. Read more <a href="https://css-tricks.com/the-difference-between-throttling-and-debouncing/"
			target="_blank">here</a>.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-md-10 col-md-offset-1 example">
		{% capture ID %}javascript2{% endcapture %}
		{% capture category %}getting-started/javascript{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 2 %}
		{% capture example %}{% endcapture %}
		{% capture HTML %}{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}
			<p>
				<code class="classes">
					$(window).on('resize', GUI.debounce(YourFunction, 30) );
				</code>
			</p>

			The method comes with three parameters:
<pre>
@param   func       [function]  Function to be executed
@param   wait       [integer]   Wait for next iteration for n in milliseconds
@param   immediate  [boolean]   Trigger the function on the leading edge [true], instead of the trailing [false]
</pre>
		{% endcapture %}

		{% include exampleBox.liquid %}
	</div>

</div>


<div class="row">

	<div id="throttle" class="col-sm-10 col-md-8 col-md-offset-2 col-sm-offset-1 content-textblock has-id">
		<h3 class="body-font">The Throttle method</h3>
		<p class="content-text">
			Throttling ensures that a function is only called an x amount of time within a timespan. Same as the debounce function, this is important for performance
			and will throttle a continues call of a function to a more sensible amount. An example use-case here would be the scroll event. While the browser
			scrolls it fires the scroll event for each pixel which results in a lot of processing if you attach some logic. By using the throttle method you limit
			the times the event is executing your function and free resources for the browser to spend somewhere else. Read more
			<a href="https://css-tricks.com/the-difference-between-throttling-and-debouncing/" target="_blank">here</a>.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-md-10 col-md-offset-1 example">
		{% capture ID %}javascript3{% endcapture %}
		{% capture category %}getting-started/javascript{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 3 %}
		{% capture example %}{% endcapture %}
		{% capture HTML %}{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}
			<p>
				<code class="classes">
					$(window).on('resize', GUI.throttle(YourFunction, 30) );
				</code>
			</p>

			The method comes with three parameters:
<pre>
@param   func       [function]  Function to be executed
@param   wait       [integer]   Run as much as possible without ever going more than once per [n in milliseconds] duration
</pre>
		{% endcapture %}

		{% include exampleBox.liquid %}
	</div>

</div>


<div class="row">

	<div id="debug" class="col-sm-10 col-md-8 col-md-offset-2 col-sm-offset-1 content-textblock has-id">
		<h3 class="body-font">The Debug method</h3>
		<p class="content-text">
			In the GUI we use this method to debug our code and make sure everything runs as expected. You can call it with four different categories to make
			readability easier. <code class="classes">report</code> for default messages, <code class="classes">error</code> for error reports,
			<code class="classes">interaction</code> for user interactions, <code class="classes">send</code> for ajax requests and
			<code class="classes">receive</code> for data arrivals.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-md-10 col-md-offset-1 example">
		{% capture ID %}javascript4{% endcapture %}
		{% capture category %}getting-started/javascript{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 4 %}
		{% capture example %}{% endcapture %}
		{% capture HTML %}{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}
			<p>
				<code class="classes">
					GUI.debugging( 'Your own debug message', 'report' );
				</code>
			</p>

			The method comes with three parameters:
<pre>
@param   text  [string]  Text to be printed to debugger
@param   code  [string]  The urgency as a string: ['report', 'error', 'interaction', 'send', 'receive']
</pre>
		{% endcapture %}

		{% include exampleBox.liquid %}
	</div>

</div>


<div class="row">

	<div id="jquery-trap-input" class="col-sm-10 col-md-8 col-md-offset-2 col-sm-offset-1 content-textblock has-id">
		<h3 class="body-font">The jQuery plugin for trapping focus</h3>
		<p class="content-text">
			We include one jQuery plugin for trapping focus. We use it to ensure a great accessibility experience in popups and dropdowns. Read about it
			<a href="https://github.com/julienw/jquery-trap-input" target="_blank">here</a>.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-md-10 col-md-offset-1 example">
		{% capture ID %}javascript5{% endcapture %}
		{% capture category %}getting-started/javascript{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 5 %}
		{% capture example %}{% endcapture %}
		{% capture HTML %}{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}
			To trap focus inside an element, run: <code class="classes">$(".js-your-selector").trap();</code>
		{% endcapture %}

		{% include exampleBox.liquid %}
	</div>

</div>


<div class="row">

	<div id="extending" class="col-sm-10 col-md-8 col-md-offset-2 col-sm-offset-1 content-textblock has-id">
		<h3 class="body-font">Extending the framework</h3>
		<p class="content-text">
			You can use the javascript framework as a starting point and add your own module. See below an example of an empty module. Run this code after the GUI
			JavaScript.
		</p>
	</div>

</div>


<div class="row">

	<div class="col-md-10 col-md-offset-1 example">
		{% capture ID %}javascript6{% endcapture %}
		{% capture category %}getting-started/javascript{% endcapture %}
		{% capture thisVersion %}1{% endcapture %}
		{% assign count = 6 %}
		{% capture example %}{% endcapture %}
		{% capture HTML %}{% endcapture %}
		{% capture CSS %}{% endcapture %}
		{% capture LESS %}{% endcapture %}
		{% capture JS %}
{% highlight javascript linenos=table %}
(function(GUI) {

	var module = {};
	//create an object to assign to GUI

	//------------------------------------------------------------------------
	// private function: module internal stuff
	//
	// @param   input1  [string]  Description of input1
	// @param   input2  [array]   Description of input2
	//
	// @return  [string]  Description of output
	//------------------------------------------------------------------------
	function dostuff( input1, input2 ) {
		App.debugging( 'YOURMODULE: Running dostuff with ' + input1, 'report' );

		// YOUR CODE
	}


	//------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------
	module.init = function() {
		GUI.debugging( 'YOURMODULE: Initiating', 'report' );

		dostuff( 'test', ['one', 'two'] ); //run private function

		GUI.YOURMODULE.yourmethod(); //run public method

		// YOUR CODE
	};


	//------------------------------------------------------------------------
	// another public method
	//------------------------------------------------------------------------
	module.yourmethod = function() {
		GUI.debugging( 'YOURMODULE: Running yourmethod', 'report' );

		// YOUR CODE
	};


	GUI.YOURMODULE = module;
	//add your code to the GUI. make sure you mind
	//the namespace that is already there.


	GUI.YOURMODULE.init();
	//run the modules init method

}(GUI));
{% endhighlight %}
		{% endcapture %}

		{% include exampleBox.liquid %}
	</div>

</div>