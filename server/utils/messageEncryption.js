const crypto = require('node:crypto');
// Generate a random symmetric encryption key
const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Encrypt a message
exports.encryptedencryptMessage = (message) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decrypt a message
exports.decryptMessage = (encryptedMessage) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}