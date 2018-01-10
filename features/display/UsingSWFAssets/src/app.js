"use strict";
import MovieClip from "openfl/display/MovieClip";
import Sprite from "openfl/display/Sprite";
import Stage from "openfl/display/Stage";
import Event from "openfl/events/Event";
import AssetLibrary from "openfl/utils/AssetLibrary";
import layoutPath from "./../assets/layout.swf";


class App extends Sprite {
	
	
	constructor () {
		
		super ();
		
		AssetLibrary.loadFromFile (layoutPath).onComplete ((library) => {
			
			this.layout = library.getMovieClip ("Layout");
			this.addChild (this.layout);
			
			this.columnOffsetHeight = (this.layout["Column"].height - this.layout.height);
			this.headerOffsetWidth = (this.layout["Header"].width - this.layout.width);
			
			this.resize ();
			this.stage.addEventListener (Event.RESIZE, this.resize);
			
		});
		
	}
	
	
	resize = (event = null) => {
		
		this.layout.Background.width = this.stage.stageWidth;
		this.layout.Background.height = this.stage.stageHeight;
		
		var columnHeight = this.stage.stageHeight + this.columnOffsetHeight;
		this.layout.Column.height = (columnHeight > 0 ? columnHeight : 0);
		
		var headerWidth = this.stage.stageWidth + this.headerOffsetWidth;
		this.layout.Header.width = (headerWidth > 0 ? headerWidth : 0);
		
	}
	
	
}


var stage = new Stage (0, 0, 0xFFFFFF, App);
document.body.appendChild (stage.element);