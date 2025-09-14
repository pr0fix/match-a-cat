import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET as string;
const TOKEN_EXPIRATION = "1h";

const generateToken = (user: { id: string; username: string }) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username });

    if (user) await user.updateOne({ $set: { lastActive: Date.now() } });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return { error: "Invalid username or password" };
    }

    const updatedUser = await User.findOne({ username });
    
    if (!updatedUser) {
      throw new Error("User not found after update");
    }

    const token = generateToken({
      id: updatedUser._id.toString(),
      username: updatedUser.username,
    });

    return {
      token,
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Error during login");
  }
};

const signup = async (username: string, name: string, password: string) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username already taken");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();

    const token = generateToken({
      id: savedUser._id.toString(),
      username: savedUser.username,
    });

    return {
      token,
      user: {
        username: savedUser.username,
        name: savedUser.name,
      },
    };
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error("An error occurred while saving the user");
  }
};

export default { login, signup };
