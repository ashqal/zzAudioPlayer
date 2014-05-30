zzAudioPlayer
=============

a muti platform simple audio player to play wav/mp3 using html5(tested on chrome/safari/firefox/android/ios) and embed mediaplayer(just for ie).


# HOW TO USE IT?
* head import jquery-1.8.2.min.js
* head import jquery.timers.min.js
* head import audioplayer.js
* set the audio class = "whateveryoulike"
* add code on document.ready() function.

``` javascript
$(document).ready(function(){
	var config = {id:"zzAuidoPlayArea",playingCSS:"playing",defaultText:"PLAY"};
	$(".whateveryoulike").each(function(){
		$(this).zzAudioPlay(config);
	});
});
```
* enjoy it!


# SCREENSHOT
![screenshot](https://raw.githubusercontent.com/ashqal/zzAudioPlayer/master/SCREENSHOT1.png)
![screenshot](https://raw.githubusercontent.com/ashqal/zzAudioPlayer/master/SCREENSHOT2.png)
![screenshot](https://raw.githubusercontent.com/ashqal/zzAudioPlayer/master/SCREENSHOT3.png)


# NOTICE
this code based on http://blog.csdn.net/fdipzone/article/details/8170337
