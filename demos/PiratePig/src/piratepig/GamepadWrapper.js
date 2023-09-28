import GameInputControl from "openfl/ui/GameInputControl";
import GameInputDevice from "openfl/ui/GameInputDevice";


export class GamepadWrapper {
	
	
	constructor (device) {
		
		this.device = device;
		
		this.up = new ButtonState ();
		this.down = new ButtonState ();
		this.left = new ButtonState ();
		this.right = new ButtonState ();
		
		this.a = new ButtonState ();
		this.b = new ButtonState ();
		this.x = new ButtonState ();
		this.y = new ButtonState ();
		
	}
	
	
	destroy () {
		
		this.device = null;
		
	}
	
	
	update () {
		
		for (var i = 0; i < this.device.numControls; i++) {
			
			var control = this.device.getControlAt (i);
			
			var state;
			
			switch (control.id) {
				
				case "BUTTON_11": state = this.up; break;
				case "BUTTON_12": state = this.down; break;
				case "BUTTON_13": state = this.left; break;
				case "BUTTON_14": state = this.right; break;
				case "BUTTON_0": state = this.a; break;
				case "BUTTON_1": state = this.b; break;
				case "BUTTON_2": state = this.x; break;
				case "BUTTON_3": state = this.y; break;
				
			}
			
			if (state != null) {
				
				if (control.value <= 0) {
					
					state.release ();
					
				} else {
					
					state.press ();
				}
				
			}
			
		}
		
	}
	
}


class ButtonState {
	
	
	pressed;
	justPressed;
	justReleased;
	
	
	constructor () {
		
		this.pressed = false;
		this.justPressed = false;
		this.justReleased = false;
		
	}
	
	
	press () {
		
		if (!this.pressed) {
			
			this.justPressed = true;
			
		} else {
			
			this.justPressed = false;
			
		}
		
		this.pressed = true;
		this.justReleased = false;
		
	}
	
	
	release () {
		
		if (this.pressed) {
			
			this.justReleased = true;
			
		} else {
			
			this.justReleased = false;
			
		}
		
		this.pressed = false;
		this.justPressed = false;
		
	}
	
	
	update () {
		
		this.justPressed = false;
		this.justReleased = false;
		
	}
	
	
}


export default GamepadWrapper;