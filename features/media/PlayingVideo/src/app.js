"use strict";
import Actuate from "motion/Actuate";
import Sprite from "openfl/display/Sprite";
import Stage from "openfl/display/Stage";
import AsyncErrorEvent from "openfl/events/AsyncErrorEvent";
import MouseEvent from "openfl/events/MouseEvent";
import NetStatusEvent from "openfl/events/NetStatusEvent";
import Video from "openfl/media/Video";
import NetConnection from "openfl/net/NetConnection";
import NetStream from "openfl/net/NetStream";


class App extends Sprite {
	
	
	constructor () {
		
		super ();
		
		this.video = new Video ();
		this.addChild (this.video);
		
		var netConnection = new NetConnection ();
		netConnection.connect (null);
		
		this.netStream = new NetStream (netConnection);
		this.netStream.client = { onMetaData: this.client_onMetaData };
		this.netStream.addEventListener (AsyncErrorEvent.ASYNC_ERROR, this.netStream_onAsyncError); 
		
		this.overlay = new Sprite ();
		this.overlay.graphics.beginFill (0, 0.5);
		this.overlay.graphics.drawRect (0, 0, 560, 320);
		this.overlay.addEventListener (MouseEvent.MOUSE_DOWN, this.overlay_onMouseDown);
		this.addChild (this.overlay);
		
		netConnection.addEventListener (NetStatusEvent.NET_STATUS, this.netConnection_onNetStatus);
		
	}
	
	
	client_onMetaData = (metaData) => {
		
		this.video.attachNetStream (this.netStream);
		
		this.video.width = this.video.videoWidth;
		this.video.height = this.video.videoHeight;
		
	}
	
	
	netStream_onAsyncError = (event) => {
		
		console.error ("Error loading video");
		
	}
	
	
	netConnection_onNetStatus = (event) => {
		
		if (event.info.code == "NetStream.Play.Complete") {
			
			Actuate.tween (this.overlay, 1, { alpha: 1 });
			
		}
		
	}
	
	
	overlay_onMouseDown = (event) => {
		
		Actuate.tween (this.overlay, 2, { alpha: 0 });
		this.netStream.play ("assets/example.mp4");
		
	}
	
	
}


var stage = new Stage (550, 400, 0xFFFFFF, App);
document.body.appendChild (stage.element);