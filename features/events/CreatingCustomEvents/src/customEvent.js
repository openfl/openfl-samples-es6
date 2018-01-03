"use strict";
import Event from "openfl/events/Event";


class CustomEvent extends Event {
	
	
	static TYPED_CUSTOM_EVENT = "typedCustomEvent";
	
	
	constructor (type, customData, bubbles = false, cancelable = false) {
		
		super (type, bubbles, cancelable);
		
		this.customData = customData;
		
	}
	
	
	clone () {
		
		return new CustomEvent (this.type, this.customData, this.bubbles, this.cancelable);
		
	}
	
	
	toString () {
		
		return "[CustomEvent type=\"" + this.type + "\" bubbles=" + this.bubbles + " cancelable=" + this.cancelable + " eventPhase=" + this.eventPhase + " customData=" + this.customData + "]";
		
	}
	
	
}


export default CustomEvent;