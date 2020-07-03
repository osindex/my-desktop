<script type="text/javascript">
module.exports = {
	name: 'osi-svg',
	mounted() {
		console.log('mounted in osi')
		// anime({
		// 	targets: '#osi-svg path',
		// 	// strokeDashoffset: [anime.setDashoffset, 0],
		// 	strokeDashoffset: function(el) { var svgLength = anime.setDashoffset(el); return [svgLength, 0]; },
		// 	// strokeDashoffset: function(el) { var svgLength = anime.setDashoffset(el); return [svgLength*0.5, 0]; },
		// 	easing: 'linear',
		// 	duration: 1500,
		// 	// delay: function(el, i) { return i * 250 },
		// 	direction: 'alternate',
		// 	loop: true
	 //    });
		 var path = anime.path('path');

		 anime({
		   targets: '.point',
		   translateX: path,
		   translateY: path,
		   rotate: path,
		   duration: 3000,
		   loop: true,
		   easing: 'linear'
		 });

		 anime({
		   targets: 'path',
		   opacity: 0,
		   duration: 6000,
		   loop: true,
		   direction: 'alternate',
		   easing: 'easeInOutExpo'
		 });
	    anime({
	      targets: '#osi-svg rect',
	      translateX: 270,
	      direction: 'alternate',
	      loop: true,
	      duration: 2000,
	      easing: function(el, i, total) {
	        return function(t) {
	          return Math.pow(Math.sin(t * (i + 1)), total);
	        }
	      }
	    });
	}
}
</script>
<style type="text/css">
	#osi-svg {
		text-align: center;
	}
	#osi-svg svg {
		margin-top: 2rem;
	}
	#osi-svg .point {
		  position: absolute;
		  top: .5rem;
		  left: .5rem;
		  width: 1rem;
		  height: 1rem;
	      background: #dd3;
	      border-radius: .5rem;
	}
</style>
<template>
	<div id="osi-svg">
		<slot></slot>
		<svg x="0px" y="0px"
			 width="200px" height="200px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve">
		<path d="M3.125,104.078C4.023,51.031,41.172,13.281,86.641,7.164c54.219-7.266,99.844,29.609,108.594,78.555
			c8.32,46.406-17.188,89.844-59.219,107.031c-3.633,1.484-5.625,0.664-7.031-3.008c-6.953-18.086-13.906-36.186-20.859-54.297
			c-1.211-3.164-0.391-5.156,2.734-6.563c9.453-4.297,15.352-11.484,16.914-21.797c2.371-15.235-8.057-29.508-23.292-31.88
			c-0.632-0.098-1.267-0.175-1.903-0.229c-15.234-1.328-28.047,9.258-30.273,23.32c-2.031,12.891,4.336,24.883,16.367,30.352
			c3.75,1.719,4.492,3.359,3.047,7.188c-6.992,18.203-13.984,36.42-20.977,54.648c-1.016,2.695-3.242,3.633-6.055,2.539
			c-20.547-7.93-39.609-23.828-51.094-46.484C3.867,127.32,3.75,112.281,3.125,104.078L3.125,104.078z M11.289,103.336
			c0.156,2.578,0.234,5.586,0.508,8.633c2.461,28.086,19.375,56.055,51.172,71.523c1.25,0.586,1.719,0.313,2.188-0.898
			c5.82-15.273,11.68-30.547,17.578-45.82c0.508-1.289,0.234-1.875-0.938-2.617c-12.344-7.773-18.477-18.945-17.813-33.594
			c0.391-8.438,3.633-15.82,9.297-21.992C85,65.797,103.359,63.023,118.398,71.695c12.432,7.168,19.381,21.067,17.656,35.313
			c-1.406,11.953-7.539,21.055-17.852,27.266c-1.055,0.625-1.367,1.133-0.898,2.344c5.938,15.313,11.822,30.639,17.656,45.977
			c0.469,1.211,0.938,1.484,2.188,0.898c13.867-6.484,25.469-15.742,34.414-28.125c13.594-18.828,19.18-39.805,16.523-62.891
			c-5.352-45.898-46.641-83.906-99.805-77.344C46.836,20.211,11.992,55.172,11.289,103.336L11.289,103.336z"/>
		<rect x="88.375" y="86.125" width="24" height="4.25"/>
		<rect x="88.375" y="90.375" width="4.25" height="10"/>
		<rect x="88.375" y="99.875" width="24" height="4.25"/>
		<rect x="88.375" y="113.75" width="24" height="4.25"/>
		<rect x="108.125" y="103.75" width="4.25" height="10"/>
		<rect x="108.125" y="86.125" width="4.25" height="10"/>
		<rect x="88.375" y="108" width="4.25" height="10"/>
		</svg>
		<!-- <div class="point"></div> -->
	</div>
</template>