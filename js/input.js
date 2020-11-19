function Input() {
    self = this;

    self.isLeftPressed = false;
    self.isRightPressed = false;
    self.isUpPressed = false;
    self.isDownPressed = false;
    self.isLeftPressed1 = false;
    self.isRightPressed1 = false;
    self.isUpPressed1 = false;
    self.isDownPressed1 = false;

    function handleKeyEvent(e, isKeyDown) {
        if(e.keyCode == 65) {
            self.isLeftPressed = isKeyDown;
        }
        if(e.keyCode == 68) {
            self.isRightPressed = isKeyDown;
        }
        if(e.keyCode == 87) {
            self.isUpPressed = isKeyDown;
        }
        if(e.keyCode == 83) {
            self.isDownPressed = isKeyDown;
        }
        if(e.keyCode == 37) {
            self.isLeftPressed1 = isKeyDown;
        }
        if(e.keyCode == 39) {
            self.isRightPressed1 = isKeyDown;
        }
        if(e.keyCode == 38) {
            self.isUpPressed1 = isKeyDown;
        }
        if(e.keyCode == 40) {
            self.isDownPressed1 = isKeyDown;
        }
    }

    document.addEventListener("keydown", function(e) {handleKeyEvent(e, true)})
    document.addEventListener("keyup", function(e) {handleKeyEvent(e, false)})
}