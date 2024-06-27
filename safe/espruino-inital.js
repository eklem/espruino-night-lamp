require("KeyPad").connect([B15,B14,B13],[B10,B1,A7,A6], function(e) {
  console.log("key pressed: " + "123456789*0#"[e]);
});

var code = "*123*";
var digit = 0;

function setLocked(isLocked) {
  // output red or green depending on whether we're locked or not
  digitalWrite([LED1,LED2], isLocked ? 0b100 : 0b010);
  // then two seconds later turn it off
  setTimeout(function() {
    digitalWrite([LED1,LED2], 0);
  }, 4000);
  // Now operate a servo motor - give it 1 second of pulses (50 * 20ms) to move it to the new location
  var servoPos = isLocked ? 0 : 1;
  var servoPulses = 0;
  var interval = setInterval(function() {
    digitalPulse(B3, 1, 1+servoPos);
    servoPulses++;
    if (servoPulses>50) clearInterval(interval);
  }, 20);
}

// Different led messages via LED
// 1: Ready - 3 medium blink
// 2: Key input - 1 short blink
// 3: Correct code - 1 long blink
// 4: Locking - 1 long blink
// Or 3 LEDs - one for error and two for input feedback
// 1: Show that it takes input - LED2 is lighting

function onKey(key) {
  var ch = "123456789*0#"[key];
  // check against our code
  if (ch == code[digit]) {
    digit++; // go to next digit
    if (digit >= code.length) {
      console.log("We're at the end of the code - unlock!");
      setLocked(false);
      // and go to the begining of the code again
      digit = 0;
    } else {
      console.log("Digit correct - next digit!");
    }
  } else {
    console.log("Wrong! Go back to the start");
    setLocked(true);
    digit = 0;
  }
}

require("KeyPad").connect([B15,B14,B13],[B10,B1,A7,A6], onKey);
