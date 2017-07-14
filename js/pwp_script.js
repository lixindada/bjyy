PWP = function () {
	var moduleData={},
		eventData={},
		debug=false,
		ec=0,
		createInstance = function ( moduleId ) {
			var instance = moduleData[moduleId].creator( new Sandbox() ),
				name, method;
			if( debug === true ) {
				for( name in instance ) {
					method = instance[name];
					if( typeof method == 'function' ) {
						instance[name] = function ( method, name ) {
							return function () {
								try { return method.apply( this, arguments ); }
								catch( err ) { PWP.log( moduleId + ' - ' + name + '(): ' + err.message ); }
							};
						}( method, name );
					}
				}
			}
			return instance;
		};
	return {
		register: function ( moduleId, creator ) {
			moduleData[moduleId] = {
				creator: creator,
				instance: null
			};
		},
		start: function ( moduleId ) {
			moduleData[moduleId].instance = createInstance( moduleId );
			moduleData[moduleId].instance.init();
		},
		stop: function ( moduleId ) {
			var data = moduleData[moduleId];
			if( !!data.instance ) {
				data.instance.destroy();
				data.instance = null;
			}
		},
		startAll: function () {
			var moduleId;
			for( moduleId in moduleData ) {
				if( moduleData.hasOwnProperty(moduleId) ) {
					this.start( moduleId );
				}
			}
		},
		stopAll: function () {
			var moduleId;
			for( moduleId in moduleData ) {
				if( moduleData.hasOwnProperty(moduleId) ) {
					this.stop( moduleId );
				}
			}
		},
		addListener: function ( events, handler, ctx, allowDupes ) {
			var l = events.length,
				i = 0;
			for( i; i < l; i++ ) {
				var j = 0,
					found=false,
					m;

				if( !eventData[events[i]] ) {
					eventData[events[i]] = [];
				}

				m = eventData[events[i]].length;

				for( j; j < m; j++ ) {
					if( handler == eventData[events[i]].handler && ctx == eventData[events[i]].ctx && !allowDupes ) {
						found = true;
					}
				}
				if( !found ) {
					eventData[events[i]].push({
						handler: handler,
						ctx: ctx
					});
				}
			}
		},
		dispatchEvent: function ( msgObj ) {
			var e = msgObj.e,
				data = [],
				i = 0,
				ev, l, prop;

			for( prop in msgObj.data ) {
				data.push( msgObj.data[prop] );
			}
			for( ev in eventData ) {
				if( ev == e ) {
					l = eventData[ev].length;
					for( i; i < l; i++ ) {
						var ce = eventData[ev][i];
						ce.handler.apply( ce.ctx, data );
					}
				}
			}
		},
		removeListener: function ( e, handler, ctx ) {
			var i = 0,
				l, ce;
			if( eventData[e] ) {
				l = eventData[e].length;
				for( i; i < l; i++ ) {
					ce = eventData[e][i];

					if( ce.handler == handler && ce.ctx == ctx ) {
						eventData[e].splice( i, 1 );
						break;
					}
				}
			}
		},
		clearEventType: function ( type ) {
			if( eventData[type] ) {
				eventData[type] = [];
			}
		},
		log: function ( msg ) {
			var ret, $c;
			ec++;
			ret = 'err' + ec + ': ' + msg;
			$c = $('#console');
			if( $c.length > 0 ) {
				var orig = $c.html();
				$c.html( orig + "\n" + ret );
			}
			else if( console ) {
				console.log( ret );
			}
			else {
				return ret;
			}
		}
	};
}();

Sandbox = function () {

	return {
		listen: function ( events, handler, ctx, allowDupes ) {
			events = typeof events == 'string' ? [events] : events;
			PWP.addListener( events, handler, ctx, allowDupes );
		},
		notify: function ( msgObj ) {
			PWP.dispatchEvent( msgObj );
		},
		kill: function ( e, handler, ctx ) {
			PWP.removeListener( e, handler, ctx );
		},
		killType: function ( e ) {
			PWP.clearEventType( e );
		},
		refresh: function () {
			PWP.stopAll();
			PWP.startAll();
		}
	};
};


PWP.register('home-carousel', function( sandbox ) {
	var _,

		container,
		offset,
		images,
		len,
		homeImage,
		captions,
		titles,
		arrowLeft,
		arrowRight,
		homeImage,
		arrowContainer,
		anim=false,
		currentIndex = 0,
		timer,
		duration,
		fade,
		imageOffset,
		footer,
		_w=0;

	return {
		init: function () {
			_ = this;

			homeImage = $('#home-image');

			if( !homeImage[0] ) return false;
			captions = $('.image-link');
			arrowContainer = $('.arrow-container');
			footer = $('#home-footer');
			container = $('.image-container').css('overflow','hidden');
			imageOffset = container.offset().top;
			MIN_WIDTH = 1050;
			MIN_HEIGHT = 450-imageOffset-70;


			images = container.find('img');
			len = images.length;

			_.preload();

			sandbox.listen('adjust',_.adjust,_);

			arrowLeft=$('.image-link-arrow.left').css('z-index',9999).bind('click',_.prevItem);
			arrowRight=$('.image-link-arrow.right').css('z-index',9999).bind('click',_.nextItem);
			homeImage = $('#home-image');
			offset = homeImage.offset().left;

			_.timerAdvance();

			$(window).bind('adjust',_.adjust);
			$(window).bind('keydown',_.keydown);
		},
		preload: function () {
			var i,img;
			for( i=0; i<len; i++ ) {
				var img = new Image();
				img.src = images.eq(i).attr('src');
			}
		},
		timerAdvance: function () {
			timer = setInterval(_.nextItem, 5000);
		},
		keydown: function ( e ) {
			switch( e.keyCode ) {
				case 39:
					_.nextItem( e );
					break;
				case 37:
					_.prevItem( e );
					break;
			}
		},
		nextItem: function ( e ) {
			_.setCurrentIndex( currentIndex+1 );
			if( e ) {
				e.preventDefault();
				clearInterval(timer);
			}
		},
		prevItem: function ( e ) {
			_.setCurrentIndex( currentIndex-1 );
			if( e ) {
				e.preventDefault();
				clearInterval(timer);
			}
		},
		setCurrentIndex: function ( index ) {
			if ( currentIndex == index || anim == true ){
				return false;
			}
			anim = true;
			currentIndex = index;
			_.controlCurrentIndex();
			_.updateData();
		},
		controlCurrentIndex: function () {
			if( currentIndex >= len ) {
				currentIndex = 0;
			}
			else if ( currentIndex < 0 ) {
				currentIndex = len-1;
			}
		},
		updateData: function () {
			var current = images.filter('.active'),
				next = images.eq(currentIndex),
				currentCaption,nextCaption;
				
			current.css({
				zIndex: 0,
				position: 'absolute'
			});

			next.css({
				zIndex: 10,
				display: 'block',
				position: 'relative',
				opacity: 0,
				bottom: 0
			}).animate({
				opacity: 1
			}, 450, function () {
				current.css({
					zIndex: 1,
					display: 'none',
					position: 'relative',
					bottom: 0
				}).removeClass('active');
				next.css({
					zIndex: 1,
					position: 'relative'
				}).addClass('active');
				anim = false;
			} );
			
			currentCaption = captions.eq(current.parent().index()),
			nextCaption = captions.eq(next.parent().index());
			
			currentCaption.fadeOut(450, function(){
				$(this).removeClass('active')
			});
			nextCaption.fadeIn(450, function(){
				$(this).addClass('active')
			});
		},
		adjust: function ( w, h ) {
			MAX_WIDTH = w-100;
			MAX_HEIGHT = h-imageOffset-70;
			_w = w;
			//MAX_WIDTH = AX_WIDTH < MIN_WIDTH ? MIN_WIDTH : MAX_WIDTH;
			//MAX_HEIGHT = MAX_HEIGHT < MIN_HEIGHT ? MIN_HEIGHT : MAX_HEIGHT;
			images.each(_.resize);
		},
		resize: function (key, object) {
			var w, h, r;
			img = $(object);
			w = img.data('width');
			h = img.data('height');
			a = MAX_WIDTH/MAX_HEIGHT;
			ia = w/h;
			
			if( a<ia ) {
				img.css({
					width: MAX_WIDTH,
					height: 'auto'
				});
				footer.css({
					position: 'absolute',
					right: _w-MAX_WIDTH-50
				});
			}
			else {
				img.css({
					height: MAX_HEIGHT,
					width: 'auto'
				});
				r = MAX_HEIGHT/h;
				footer.css({
					position: 'absolute',
					right: _w-(w*r)-50
				});
			}
		},
		destroy: function () {
			
		}
	};
} );

PWP.register('mini-player',function(sandbox) {
	var _,
		vimeos,
		cheech,
		currentVideo,
		currentClose;
	return {
		init: function () {
			_ = this;
			vimeos= $('.video');
			cheech = $('#video-cheech');
			vimeos.find('img,.play-button').css('cursor','pointer').bind('click',_.initPlayer);
		},
		initPlayer: function ( e ) {
			var img = $(this),
				item = img.parent().parent('.news-item'),
				p = item.parent('.news-list'),
				video, anchor;
			
			video = document.createElement('iframe');
		

			$(video).css({
				position: 'absolute',
				top: p.offset().top,
				left: img.offset().left,
				zIndex: 9999999
			});

			currentVideo = video;

			anchor = document.createElement('a');

			anchor.href = "#";
			anchor.innerHTML = 'Close';
			anchor.className = "vimeo-close";

			$(anchor).css({
				position: 'absolute',
				top: p.offset().top - 12,
				left: img.offset().left + p.innerWidth() - 29,
				zIndex: 9999999
			}).bind('click',_.closeVideo);
			currentClose = anchor;

			cheech.stop().css({
				display: 'block',
				opacity: 0
			}).animate({
				opacity: 1
			}).bind('click',function(e){
				_.closeVideo(undefined,$(anchor));
			});

			p.css({
				zIndex: 99999
			});

			$('body').prepend(anchor,video);

			e.preventDefault();
		},
		closeVideo: function ( e,anchor ) {
			var btn = e !== undefined ? $(this) : anchor,
				data = btn.data('hold'),
				parent = btn.parent('.news-list');
			
			parent.css({
				zIndex: 1,
				position: 'relative',
				overflow: 'hidden'
			});

			$(currentVideo).remove();
			currentVideo = undefined;
			$(currentClose).remove();
			currentClose = undefined;
			cheech.stop().animate({
				opacity: 0
			}, function () {
				cheech.css('display','none');
			})
			
				
			e.preventDefault();
		},
		destroy: function () {
			
		}
	}
} );

PWP.register( 'google-map', function ( sandbox ) {
	var self,
		map,
		lat,
		lng,
		canvas,
		location,
		mapStyle = [{
			featureType: 'all',
				stylers: [
					{saturation: -100},
					{gamma: 0.50},
					{lightness: 25}
				]
			},
			{
				featureType: 'all',
				elementType: 'labels',
				stylers: [
					{lightness: -10},
					{color: 000000}
				]
			}],
		opts = {
			mapTypeControlOptions: {
				mapTypeIds: ['Greyscale']
			},
			mapTypeControl: false,
			zoom: 15,
			mapTypeId: 'Greyscale'
		},
		marker,
		markerHeight,
		markerWidth,
		size,
		origin,
		anchor,
		point,
		styledMapType,
		scaled;
	return {
		init: function () {
			self = this;

			if( !document.getElementById('pwp-map') ) return false;
			styledMapType = new google.maps.StyledMapType(mapStyle, {name:'Greyscale'});

			map = $('#pwp-map');

			lat = map.data('latitude');
			lng = map.data('longitude');
			marker = map.data('marker');
			markerWidth = map.data('markerwidth');
			markerHeight = map.data('markerheight');

			
			size = new google.maps.Size( markerWidth, markerHeight );
			origin = new google.maps.Point( 0, 0 );
			anchor = new google.maps.Point( markerWidth/2, markerHeight/2 );
			scaled = new google.maps.Size( markerWidth, markerHeight );

			markerImage = new google.maps.MarkerImage( marker, size, origin, anchor, scaled );

			opts.center = new google.maps.LatLng(lat,lng);

			self.load();
		},
		load: function () {
			canvas = new google.maps.Map( document.getElementById('pwp-map'), opts );
			canvas.mapTypes.set('Greyscale', styledMapType);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat,lng),
				map: canvas,
				icon: markerImage
			});

		},
		destroy: function () {

		}
	}
} );

$(function(){
	$('html').removeClass('no-js');
	PWP.startAll();
	$(window).trigger('resize');
	$(window).trigger('scroll');
});