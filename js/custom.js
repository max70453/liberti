(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();

	//------- makeTimer js --------//  
	function makeTimer() {
console.log('maketimer');

		//		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
		var endTime = new Date("30 Apr 2025 12:56:00 GMT+01:00");
		endTime = (Date.parse(endTime) / 1000);
	
		var now = new Date();
		now = (Date.parse(now) / 1000);
	
		var timeLeft = endTime - now;
	
		var days = Math.floor(timeLeft / 86400);
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
	
		if (hours < "10") {
		  hours = "0" + hours;
		}
		if (minutes < "10") {
		  minutes = "0" + minutes;
		}
		if (seconds < "10") {
		  seconds = "0" + seconds;
		}
	
		$("#days").html("<span>Дни</span>" + days);
		$("#hours").html("<span>Часы</span>" + hours);
		$("#minutes").html("<span>минуты</span>" + minutes);
		$("#seconds").html("<span>Секунды</span>" + seconds);
	
	  }
	// click counter js
	(function() {
	 
	  window.inputNumber = function(el) {
	
		var min = el.attr('min') || false;
		var max = el.attr('max') || false;
	
		var els = {};
	
		els.dec = el.prev();
		els.inc = el.next();
	
		el.each(function() {
		  init($(this));
		});
	
		function init(el) {
	
		  els.dec.on('click', decrement);
		  els.inc.on('click', increment);
	
		  function decrement() {
			var value = el[0].value;
			value--;
			if(!min || value >= min) {
			  el[0].value = value;
			}
		  }
	
		  function increment() {
			var value = el[0].value;
			value++;
			if(!max || value <= max) {
			  el[0].value = value++;
			}
		  }
		}
	  }
	})();
	
	inputNumber($('.input-number'));
	
	  setInterval(function () {
		makeTimer();
	  }, 1000);

	//  product list slider
	 var product_list_slider = $('.product_list_slider');
	 if (product_list_slider.length) {
	   product_list_slider.owlCarousel({
		 items: 1,
		 loop: true,
		 dots: false,
		 autoplay: true,
		 autoplayHoverPause: true,
		 autoplayTimeout: 5000,
		 nav: true,
		 navText: ["Следующий", "Предыдущий"],
		 smartSpeed: 1000,
		 responsive: {
		   0: {
			 margin: 15,
			 nav: false,
			 items: 1
		   },
		   600: {
			 margin: 15,
			 items: 1,
			 nav: false
		   },
		   768: {
			 margin: 30,
			 nav: true,
			 items: 1
		   }
		 }
	   });
	 }
})()