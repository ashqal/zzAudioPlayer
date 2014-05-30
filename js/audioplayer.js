
// JavaScript Document

(function ($) {
	var g_isPlaying = false;
    $.ZZAuidoPlay = function ( obj , params ) {
		
        if( obj == "undefined" || obj == null )
		{
			alert("obj can't be null");	
		}
		var defaultParams = {id:"zzAuidoPlayArea",playingCSS:"playing",defaultText:"play"};
		if( params == null )
		{
			params = defaultParams;
		}
		else
		{
			if( params.id == null ) 	params.id = defaultParams.id;
			if( params.playingCSS == null ) 	params.playingCSS = defaultParams.playingCSS;
			if( params.defaultText == null ) 	params.defaultText = defaultParams.defaultText;
			//if( params.OnShow == null ) 	params.OnShow = defaultShow;
			//if( params.OnHide == null ) 	params.OnHide = defaultHide;
		}
		
	
		var button = $(obj);
		
		button.text(params.defaultText);
		var file  =  button.attr("data-audio") ;
		button.click(function(){
			Play(params.id,file);
		});


		// JavaScript Document
		/** 
		 * @param obj 	id
		 * @param file 	mp3: ogg:
		 */
		function audioplayer(id, file, loop)
		{
			var audioplayer = document.getElementById(id);
			var prevObj;
			if( audioplayer != 'undefined' && isPlaying(id) )
			{
				audioplayer.isRemoved = true;
				//console.log("audioplayer isPlaying true:" + audioplayer.controls.Stop() == 'undefined' );
				if( isIE() )
				{
					$(obj).stopTime();
					audioplayer.controls.Stop();
				}
				else
				{
					audioplayer.pause();
				}
				

				prevObj = audioplayer.prevObj;
				
				document.body.removeChild(audioplayer);  
				

				if( prevObj != 'undefined' )
				{
					
					$(prevObj).removeClass( params.playingCSS );
					$(prevObj).text(params.defaultText);
				}

				
				
					
			}
			
			if(typeof(file)!='undefined'){
				$(obj).addClass( params.playingCSS );
				
				var player;
				if( isIE() ){	// IE
				
				/***
<object classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6" id="player">
	<param name="filename" value="sample.wav">
</object>
				*/
					player = document.createElement('object');

					player.id = id;
					//classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"
					//player.classid = "CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6";
					player.setAttribute("classid", "clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6");
					player.url =  file;

					player.style.width = 0;
					player.style.height = 0;
	
					
					document.body.appendChild(player);

					addListener(player, "PlayStateChange",function(status){
					 	onIEStateChange(status,player);

					} );

				
				}
				else
				{	// Other FF Chome Safari Opera
				
					player = document.createElement('audio');
					player.prevObj = obj;
					
					player.id = id;
					player.setAttribute('autoplay','autoplay');
					if(loop){
						player.setAttribute('loop','loop');
					}
					document.body.appendChild(player);
					
					var music = document.createElement('source');
					music.src = file;
					music.type= 'audio/wav';
					player.appendChild(music);
					
					//addListener(player,"play",onStartPlay);
					addListener(player,"timeupdate",onPlaying);
					addListener(player,"ended",onEndPlay);

					player.play();

				}
				player.isRemoved = false;
				player.prevObj = obj;
				if( prevObj != null )
				{
					$(prevObj).removeClass( params.playingCSS );	
				}
				
			}
		};
		function onIEStateChange(e,player)
		{
			//var target;
			var event = {};
			switch( e )
			{
				case 1: //wmppsStopped
                	//console.log("stoped");
                	break;
            	case 2:  //wmppsPaused
               		//this.onPaused();
                	break;
            	case 3:  //wmppsPlaying
            		$(obj).stopTime();
            		$(obj).everyTime('0.1s' , function(){
            			player.currentTime = player.controls.currentPosition;
	            		player.duration = player.currentMedia.duration;
	            		event.target = player;
	            		onPlaying(event);
            		});
               		break;
            	case 4:  //wmppsScanForward
                	break;
            	case 5:  //wmppsScanReverse
                	break;

            	case 8:  //wmppsMediaEnded
            		onEndPlay(event);
            		break;
                	//this.onMediaEnded();
			}
		};

		function addListener( target , event , callback )
		{
			if (typeof target.attachEvent != "undefined") 
			{
				target.attachEvent(event,callback);
			}
			else
			{
				target.addEventListener(event,callback);
			}

		}
		function onStartPlay(e)
		{
			
			var player = e.target;
			displayTheProcess( player, player.currentTime,player.duration );
		};
		
		function onEndPlay(e)
		{
			Stop(params.id);
		};
		
		function displayTheProcess( player, current , total )
		{
			if( !player.isRemoved )
				$(obj).text (current.toFixed(1) + "/" + total.toFixed(1)) ;	
		};
		
		function onPlaying(e)
		{
			var player = e.target;
			var player = e.target;
			displayTheProcess( player, player.currentTime,player.duration );
		};
		
		function Stop(id)
		{
			if( isPlaying(id) )
			{
				audioplayer(id); // 停止 
				g_isPlaying = false;
			}
			
		};
		
		function isPlaying(id)
		{
			return g_isPlaying;
		};
		
		function getPrevObj(id)
		{
			var audioplayer = document.getElementById(id);
			if( audioplayer == null ) return null;
			var prevObj = audioplayer.prevObj;
			if( prevObj != 'undefined'  )
				return prevObj;
			else 
				return null;
		}
		
		function Play(id, file)
		{
			var prevObj = getPrevObj(id);
			if( !isPlaying(id) )
			{
				audioplayer(id,file,false);
				g_isPlaying = true;
			}
				
			else
			{
				Stop(id);
				if( obj != prevObj )
				{
					audioplayer(id,file,false);
					g_isPlaying = true;
				}
			}
				
		};

		function isIE( )
		{
			if( navigator.userAgent.indexOf("MSIE")>0 ) return true;
			else return false;

		}
		function getBrowserInfo()
		{
			var agent = navigator.userAgent.toLowerCase() ;
			var ie = agent.match(/msie ([\d.]+)/)[1];
			return ie;
		};
		
		return {};
    };
	$.fn.extend({
		zzAudioPlay:function( params ){
			var instance = new $.ZZAuidoPlay( $(this), params );
			return instance;
		}
	});
	
})(jQuery);



