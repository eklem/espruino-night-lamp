
var passphrase = '';
var passphraseEncrypted = '1122287887126168932401488510822216238195157';
var salt = 'sad88hfoiwhe38405';
var crypto = require("crypto");

var encrypted8array = crypto.PBKDF2(passphrase, salt);
console.log(encrypted8array);

var encrypted = [].slice.call(encrypted8array);
encrypted = encrypted.join('');
console.log(encrypted);

if (encrypted === passphraseEncrypted) {
  console.log('safe ready to be unlocked');
}
