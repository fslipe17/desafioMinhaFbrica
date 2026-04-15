import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js";

console.log("Auth carregado");

const router = express.Router();

router.get("/profile", authMiddleware, async (req,res) => {
    res.json({ message: "você acessou uma rota protegida!", userId: req.userId });
});

router.get("/teste", (req, res) => {
    res.send("Rota funcionando");
});

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({ message: "Usuário criado com sucesso" });
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user._id },
      "segredo123",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.log("Erro no login:", err);
    res.status(500).json({ message: "Erro interno" });
  }
});

export default router;