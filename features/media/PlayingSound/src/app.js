"use strict";
import Quad from "motion/easing/Quad";
import Actuate from "motion/Actuate";
import Sprite from "openfl/display/Sprite";
import Stage from "openfl/display/Stage";
import Event from "openfl/events/Event";
import MouseEvent from "openfl/events/MouseEvent";
import Sound from "openfl/media/Sound";
import SoundChannel from "openfl/media/SoundChannel";
import SoundTransform from "openfl/media/SoundTransform";
import AssetLibrary from "openfl/utils/AssetLibrary";
import AssetManifest from "openfl/utils/AssetManifest";
import Assets from "openfl/utils/Assets";


class App extends Sprite {
	
	
	constructor () {
		
		super ();
		
		Actuate.defaultEase = Quad.easeOut;
		
		this.background = new Sprite ();
		this.background.alpha = 0.1;
		this.background.buttonMode = true;
		this.background.addEventListener (MouseEvent.MOUSE_DOWN, this.this_onMouseDown);
		this.addChild (this.background);
		
		this.sound = Assets.getSound ("assets/stars.ogg");
		this.position = 0;
		
		this.resize ();
		this.stage.addEventListener (Event.RESIZE, this.stage_onResize);
		
		this.play ();
		
	}
	
	
	pause (fadeOut = 1.2) {
		
		if (this.playing) {
			
			this.playing = false;
			
			Actuate.transform (this.channel, fadeOut).sound (0, 0).onComplete (stop);
			Actuate.tween (this.background, fadeOut, { alpha: 0.1 });
			
		}
		
	}
	
	
	play (fadeIn = 3) {
		
		this.stop ();
		
		this.playing = true;
		
		if (fadeIn <= 0) {
			
			this.channel = this.sound.play (this.position);
			
		} else {
			
			this.channel = this.sound.play (this.position, 0, new SoundTransform (0, 0));
			Actuate.transform (this.channel, fadeIn).sound (1, 0);
			
		}
		
		this.channel.addEventListener (Event.SOUND_COMPLETE, this.channel_onSoundComplete);
		Actuate.tween (this.background, fadeIn, { alpha: 1 });
		
	}
	
	
	resize () {
		
		this.background.graphics.clear ();
		this.background.graphics.beginFill (0x24afc4);
		this.background.graphics.drawRect (0, 0, this.stage.stageWidth, this.stage.stageHeight);
		
	}
	
	
	stop () {
		
		this.playing = false;
		
		Actuate.stop (this.channel);
		
		if (this.channel != null) {
			
			this.position = this.channel.position;
			this.channel.removeEventListener (Event.SOUND_COMPLETE, this.channel_onSoundComplete);
			this.channel.stop ();
			this.channel = null;
			
		}
		
	}
	
	
	
	
	// Event Handlers
	
	
	
	
	channel_onSoundComplete = (event) => {
		
		this.pause ();
		this.position = 0;
		
	}
	
	
	stage_onResize = (event) => {
		
		this.resize ();
		
	}
	
	
	this_onMouseDown = (event) => {
		
		if (!this.playing) {
			
			this.play ();
			
		} else {
			
			this.pause ();
			
		}
		
	}
	
	
}


var manifest = new AssetManifest ();
manifest.addSound ([ "assets/stars.ogg", "assets/stars.mp3" ]);

AssetLibrary.loadFromManifest (manifest).onComplete ((library) => {
	
	Assets.registerLibrary ("default", library);
	
	var stage = new Stage (550, 400, 0xFFFFFF, App);
	document.body.appendChild (stage.element);
	
}).onError ((e) => {
	
	console.error (e);
	
});