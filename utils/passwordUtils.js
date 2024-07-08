const crypto = require("crypto");

const encryptText = (password) => {
  try {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    const cipher = crypto.createCipher("aes-256-cbc", secretKey);
    let encrypted = cipher.update(password, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Encryption failed");
  }
};

const decryptText = (encPassword) => {
  try {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
    let decrypted = decipher.update(encPassword, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed");
  }
};

module.exports = { encryptText, decryptText };
