"use strict";
import Sprite from "openfl/display/Sprite";
import Stage from "openfl/display/Stage";
import AsyncErrorEvent from "openfl/events/AsyncErrorEvent";
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
		this.netStream.play ("assets/example.mp4");
		
	}
	
	
	client_onMetaData = (metaData) => {
		
		this.video.attachNetStream (this.netStream);
		
		this.video.width = this.video.videoWidth;
		this.video.height = this.video.videoHeight;
		
	}
	
	
	netStream_onAsyncError = (event) => {
		
		console.error ("Error loading video");
		
	}
	
	
}


var stage = new Stage (550, 400, 0xFFFFFF, App);
document.body.appendChild (stage.element);