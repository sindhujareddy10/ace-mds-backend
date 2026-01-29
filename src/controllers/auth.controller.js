const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * REGISTER
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      }
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: user.id
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * LOGIN
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      isOnboarded: Boolean(user.targetYear)
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
  register,
  login
};