var digit = 0;
var codeTyped = [''];
var open = false;
var codeStarted = false;
var s = require("servo").connect(B3);
var passphraseEncrypted = '1122287887126168932401488510822216238195157';
var salt = 'sad88hfoiwhe38405';
var crypto = require("crypto");


// Different led messages via LED
// 1: Ready - 3 medium blink
// 2: Key input - 1 short blink
// 3: Correct code - 1 long blink
// 4: Locking - 1 long blink
// Or 3 LEDs - one for error and two for input feedback
// 1: Show that it takes input - LED2 is lighting

function resetCodeInput() {
  codeTyped = [''];
  codeStarted = false;
  console.log('codeTyped: ' + codeTyped);
  console.log('open: ' + open);
  console.log('codeStarted: ' + codeStarted);
}

function onKey(key) {
  var character = '123456789*0#'[key];
  console.log('key: ' + character);
  if (character === '*' && open === true) {
    s.move(1);
    console.log('*** locking safe ***');
    open = false;
  } else if (character === '*' && codeStarted === false && open === false) {
    // start register code
    codeStarted = true;
    console.log('ready for code');
  } else if (character === '*' && codeStarted === true) {
    var encrypted8array = crypto.PBKDF2(codeTyped, salt);
    console.log(encrypted8array);
    encrypted = [].slice.call(encrypted8array);
    encrypted = encrypted.join('');
    console.log(encrypted);
    // check if codeTyped === code
    if (encrypted === passphraseEncrypted) {
      s.move(0);
      open = true;
      console.log('*** correct code, opening safe ****');
      resetCodeInput();
    } else {
      console.log('*** wrong code, try again ****');
      resetCodeInput();
    }
  } else if (codeStarted === true ) {
    codeTyped += character;
    console.log('codeTyped: ' + codeTyped);
    // check against our code
  }
}

require("KeyPad").connect([B15,B14,B13],[B10,B1,A7,A6], function(key) {
  onKey(key);
});
