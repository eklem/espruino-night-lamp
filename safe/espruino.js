var code = '123'
var digit = 0
var codeString = ''

// Different led messages via LED
// 1: Ready - 3 medium blink
// 2: Key input - 1 short blink
// 3: Correct code - 1 long blink
// 4: Locking - 1 long blink
// Or 3 LEDs - one for error and two for input feedback
// 1: Show that it takes input - LED2 is lighting

function onKey(key, codeString) {
  var character = '123456789*0#'[key]
  console.log('key: ' + character)

  codeString = codeString + character

  console.log('string: ' + codeString)
  // check against our code

}

require("KeyPad").connect([B15,B14,B13],[B10,B1,A7,A6], function(key) {
  onKey(key, codesString)
})
