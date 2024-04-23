const argon2 = require("argon2");

const plainPassword = process.argv[2]; // Takes the password from the command line argument

const hashPassword = async () => {
  try {
    const hashedBuffer = await argon2.hash(plainPassword, {
      type: argon2.argon2id,
    });
    const hashedPassword = Buffer.from(hashedBuffer).toString("base64");
    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

hashPassword();
