/**
 * 
 * fart.js
 * A javascript library for adding fart sounds to your web experience
 * 
 * 
 * @author 	Tel Smith
 * @tweet 	@74656c
 * @web 	http://jsfart.com/
 * @github 	https://github.com/74656c/fart.js/
 * 
 * version 1.0.2
 * 
 * 
 */


/**
 * Here are the main fart sounds.
 * fart name : fart file (minus extension)
 */

var farts = {
	toot : 'fart1',
	ripper : 'fart2',
	plop : 'fart3',
	squit : 'fart4',
	raspberry : 'fart5',
	squat : 'fart6',
	tuppence : 'fart7',
	liftoff : 'fart8',
	trumpet : 'fart9',
	fizzler : 'fart10',
	windy : 'fart11',
	eine : 'fart12'
};

/**
* This is the description for my class.
*
* @class Fart
* @constructor
* 
* @param {Object} options Default Sound, Loop and Volume 
*/
function Fart(options) {
	this.sound = this.default_sound;
	this.fart_player = null;
	this.old_player = false;
	this.options = $.extend({
		default_sound : farts.raspberry,
		loop : false,
		volume : 50	// 0 - 100
	}, options);
	this.init();
}

/**
* Init the player. Figure out if the old player should be loaded by checking if the audio element has the canPlayType() method 
*
* @method init
*/
Fart.prototype.init = function() {
	this.fart_player = document.createElement("audio");
	if ( typeof (this.fart_player.canPlayType) == 'undefined') {
		this.load_old_player();
	}
	this.preload();
};

/**
* If the browser is too old to load an AUDIO element, its probably ie7/8 
*
* @method load_old_player
*/
Fart.prototype.load_old_player = function() {
	$('body').append('<div style="display:none;"><object id="contentPlayer" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="100" height="100"><param name="volume" value="100%" /><param name="windowlessVideo" value="true"><param name="AnimationatStart" value="0" /><param name="autostart" value="1" /></object></div>');
	this.fart_player = document.getElementById('contentPlayer');
	this.fart_old_player = true;
};

/**
* Play the sound via the browser. 
* If a valid $sound is passed, it will play, otherwise it will default to the defaut sound
*
* @method play
* @param {String} foo The name of the sound to play
* @param {String} foo A callback for once the sound has ended
*/
Fart.prototype.play = function(sound, callback) {
	var fart = (sound) ? (farts[sound]) ? farts[sound] : sound: this.options.default_sound;
	callback = callback || null;
	if (!this.fart_old_player) {
		var ext = (this.fart_player.canPlayType('audio/mp3')) ? '.mp3' : '.wav';
		this.fart_player.setAttribute('src', "/farts/" + fart + ext);
		this.fart_player.loop = this.options.loop;
		this.fart_player.volume = (this.options.volume / 100);
		this.fart_player.play();
		$(this.fart_player).on("ended", function() {
			if (callback) {
				callback();
				$(this.fart_player).off("ended");
			}
		});
	} else {
		this.fart_player.URL = "/farts/" + fart + '.mp3';
	}
};

/**
* Stop the sound from playing 
*
* @method stop
*/
Fart.prototype.stop = function() {
	this.fart_player.pause();
};

/**
* Remove the element from the DOM 
*
* @method remove
*/
Fart.prototype.remove = function() {
	this.fart_player.remove();
};

/**
* Play a random fart from the list 
*
* @method random
*/
Fart.prototype.random = function() {
	var keys = Object.keys(farts);
	var fart = keys[keys.length * Math.random() << 0];
	this.play(fart);
};

/**
* Try and preload the sounds. This was useful when the sound files where on a remote server
*
* @method preload
*/
Fart.prototype.preload = function() {
	var fart_player = this.fart_player;
	if (!this.fart_old_player) {
		$.each(farts, function(index, fart) {
			var ext = (fart_player.canPlayType('audio/mp3')) ? '.mp3' : '.wav';
			fart_player.setAttribute('src', "/farts/" + fart + ext);
		});
	}
};
