/* Controller object for handling keyboard input */
var pauseTheGame = false;
var calledPause = false;
var pressUp = false;

var controller = {
    left: false,
    right: false,
    up: false,
    pause: false,
    menu: true,
    keyListener: function(event) {
        let state;
        if (event.type == "keydown")                       
            state = true;
        else
            state = false;

        switch(event.keyCode) {                 
            case 65:    
                if (controller.menu == false) {
                    if (startTimer >= 10)
                        controller.left = state;   
                }
                break;
            case 68: 
                if (controller.menu == false) {
                    if (startTimer >= 10)
                        controller.right = state;
                }
                break;
            case 87:   
                if (controller.menu == false) {
                    if (startTimer >= 10) {
                        controller.up = state;
                        if (pressUp == false) {
                            pressUp = true;
                        }
                        else {
                            pressUp = false;
                        }
                    } 
                }
            break;
            case 80:
                if (controller.menu == false) {
                    controller.pause = state;
                    if (calledPause == false) {
                        calledPause = true;
                        pauseGame(); 
                    }
                }  
        }
    }
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
