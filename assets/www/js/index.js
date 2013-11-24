/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
		// Application Constructor
		initialize: function() {
			this.bindEvents();
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
			var supportsOrientationChange = "onorientationchange" in window,
			orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

			window.addEventListener(orientationEvent, this.setScreenBounds, false);
		},
		// deviceready Event Handler
		//
		// The scope of 'this' is the event. In order to call the 'receivedEvent'
		// function, we must explicity call 'app.receivedEvent(...);'
		onDeviceReady: function() {
			app.setScreenBounds();
			app.receivedEvent('deviceready');
			app.alignTabContent();
		},
		// Update DOM on a Received Event
		receivedEvent: function(id) {
			myTabs = $('.tabs').swiper({
				mode:'horizontal',
				slidesPerView : 1.5,
				initialSlide : 2,
				offsetSlidesBefore : 0.25,
				offsetPxAfter : 100,
				shortSwipes : true,
				onSlideChangeEnd: app.onTabChanged,
				loop: false
			}); 

			mySwiper = $('.swiper-container').swiper({
				mode:'horizontal',
				initialSlide : 2,
				shortSwipes : true,
				pagination: document.getElementById("pagination"),
				createPagination : true,
				paginationClickable: true,
				onSlideChangeEnd: app.onSlideChanged,
				loop: false
			}); 
		},

		onSlideChanged : function(e){
			myTabs.swipeTo(mySwiper.activeIndex, 0, false);
			app.alignTabContent();	
		},
		
		onTabChanged : function(e){
			mySwiper.swipeTo(myTabs.activeIndex, 0, false);	
			
			app.alignTabContent();
		},

		alignTabContent : function(){
			var _activeIndex = myTabs.activeIndex;
			if(_activeIndex != mySwiper.getFirstSlide().index()){
				var prevEle = myTabs.getSlide(_activeIndex-1);				
				$(prevEle).css('text-align','right').trigger("true", 500);
				$(prevEle).css('color','gray').trigger("true");
			}
			if(_activeIndex != mySwiper.getLastSlide().index()){
				var nextEle = myTabs.getSlide(_activeIndex+1);				
				$(nextEle).css('text-align','left').trigger("true", 500);	
				$(nextEle).css('color','gray').trigger("true");
			}
			var currEle = myTabs.getSlide(_activeIndex);
			$(currEle).css('text-align','center').trigger("true", 500);
			$(currEle).css('color','black').trigger("true");
		},
		
		setScreenBounds: function(){
			var availableWidth = window.screen.availWidth;
			var availableHeight = window.screen.availHeight;

			var height = availableHeight > availableWidth ? availableHeight : availableWidth;

			if(window.orientation != 0){
				var height = availableHeight > availableWidth ? availableWidth : availableHeight;
			}

			$(".tabs").css("height", 50+"px").trigger("true");
			$(".swiper-container").css("height", (height-52)+"px").trigger("true");
		}    
};
