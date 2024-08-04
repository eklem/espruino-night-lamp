var digit = 0;
var codeTyped = [''];
var open = false;
var codeStarted = false;
var s = require("servo").connect(B3);
var passphraseEncrypted = '1122287887126168932401488510822216238195157';
var salt = 'sad88hfoiwhe38405';
var crypto = require("crypto");

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
    message('locking');
    s.move(1);
    console.log('*** locking safe ***');
    open = false;
  } else if (character === '*' && codeStarted === false && open === false) {
    // start register code
    message('ready');
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
      message('codeCorrect');
      resetCodeInput();
    } else {
      console.log('*** wrong code, try again ****');
      message('codeWrong');
      resetCodeInput();
    }
  } else if (codeStarted === true ) {
    message('codeInput');
    codeTyped += character;
    console.log('codeTyped: ' + codeTyped);
    // check against our code
  }
}

function message(type) {
  // LED info messages - two LEDs red & green
  const green = 'B7';
  const red = 'A8';
  if (type === 'booted') {
    digitalPulse(green,1,[1000,0]);
  }
  if (type === 'ready') {
    digitalPulse(green,1,[100,100,100,100,100]);
  }
  if (type === 'codeInput') {
    digitalPulse(green,1,[50,0]);
  }
  if (type === 'codeCorrect') {
    digitalPulse(green,1,[1000,0]);
  }
  if (type === 'codeWrong') {
    digitalPulse(red,1,[100,100,100,100,100,100,100,100,100,100,100]);
  }
  if (type === 'locking') {
    digitalPulse(green,1,[1000,0]);
    digitalPulse(red,1,[1000,0]);
  }
}

message('booted');

require("KeyPad").connect([B15,B14,B13],[B10,B1,A7,A6], function(key) {
  onKey(key);
});
  