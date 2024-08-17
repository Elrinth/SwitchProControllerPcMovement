const gamepads = {};
var start = null;

function gamepadHandler(event, connected) {
  const gamepad = event.gamepad;
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connected) {
    gamepads[gamepad.index] = gamepad;
    start = requestAnimationFrame(gameLoop);
  } else {
    delete gamepads[gamepad.index];
  }
}

window.addEventListener(
  "gamepadconnected",
  (e) => {
    gamepadHandler(e, true);
  },
  false,
);
window.addEventListener(
  "gamepaddisconnected",
  (e) => {
    gamepadHandler(e, false);
  },
  false,
);


window.addEventListener("gamepadconnected", (e) => {
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index,
      e.gamepad.id,
      e.gamepad.buttons.length,
      e.gamepad.axes.length,
    );
    var ye = document.getElementsByClassName("scheisse");
    if (ye.length != 0) {
        ye[0].innerHTML = "lez do it";
    }
    const gp = navigator.getGamepads()[e.gamepad.index];
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index,
    gp.id,
    gp.buttons.length,
    gp.axes.length,
  );
  });
  var gpOfInterest = null;

  function gameLoop() {
    const gamepads = navigator.getGamepads();
    if (!gamepads) {
      return;
    }
  
    var gpCnt = 0;
    gamepads.forEach(gp => {
      if (gp) {
        if (gpOfInterest == null || gpOfInterest == gpCnt) {
            //console.log("we got a gamepad");
            var cnt = 0;
            var theElement = document.getElementsByClassName("A");
            //console.log("we got an element", theElement.length);
            
            var btnCnt = 0;
            gp.buttons.forEach(but => {
                var element = document.getElementsByClassName("btn-" + btnCnt)[0];
                if (element) {
                    if (but.pressed) {
                        if (gpOfInterest == null)
                          gpOfInterest = gpCnt;
                        element.classList.add("pressed");
                    }
                    else   
                        element.classList.remove("pressed");
                }
                btnCnt++;
            });
            var axCnt = 0;
            // left thumb
            // -1 to 1
            var leftThumb = document.getElementsByClassName("left-stick")[0];
            leftThumb.style.left = (147 + (gp.axes[0]*30)) + "px";
            leftThumb.style.top = (135 + (gp.axes[1]*30)) + "px";

            var rightThumb = document.getElementsByClassName("right-stick")[0];
            rightThumb.style.left = (507 + (gp.axes[2]*30)) + "px";
            rightThumb.style.top = (257 + (gp.axes[3]*30)) + "px";
            gpCnt++;
        }
      }
    });
    
  
    start = requestAnimationFrame(gameLoop);
  }