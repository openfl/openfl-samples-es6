import Quad from "motion/easing/Quad";
import Actuate from "motion/Actuate";
import Bitmap from "openfl/display/Bitmap";
import Sprite from "openfl/display/Sprite";
import Assets from "openfl/utils/Assets";


export class Tile extends Sprite {
	
	
	constructor (imagePath) {
		
		super ();
		
		var image = new Bitmap (Assets.getBitmapData (imagePath));
		image.smoothing = true;
		this.addChild (image);
		
		this.mouseChildren = false;
		this.buttonMode = true;
		
		this.graphics.beginFill (0x000000, 0);
		this.graphics.drawRect (-5, -5, 66, 66);
		
	}
	
	
	initialize () {
		
		this.moving = false;
		this.removed = false;
		
		this.mouseEnabled = true;
		this.buttonMode = true;
		
		this.scaleX = 1;
		this.scaleY = 1;
		this.alpha = 1;
		
	}
	
	
	moveTo (duration, targetX, targetY) {
		
		this.moving = true;
		
		Actuate.tween (this, duration, { x: targetX, y: targetY } ).ease (Quad.easeOut).onComplete (this.this_onMoveToComplete);
		
	}
	
	
	remove (animate = true) {
		
		if (!this.removed) {
			
			if (animate) {
				
				this.mouseEnabled = false;
				this.buttonMode = false;
				
				this.parent.addChildAt (this, 0);
				Actuate.tween (this, 0.6, { alpha: 0, scaleX: 2, scaleY: 2, x: this.x - this.width / 2, y: this.y - this.height / 2 } ).onComplete (this.this_onRemoveComplete);
				
			} else {
				
				this.this_onRemoveComplete ();
				
			}
			
		}
		
		this.removed = true;
		
	}
	
	
	
	
	// Event Handlers
	
	
	
	
	this_onMoveToComplete = () => {
		
		this.moving = false;
		
	}
	
	
	this_onRemoveComplete = () => {
		
		this.parent.removeChild (this);
		
	}
	
	
}


export default Tile;