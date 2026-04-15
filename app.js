import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"

const app = express();

app.use(express.json());

app.get("/teste", (req, res) => {
  res.send("APP OK");
});

//Conexão com o banco de dados
mongoose.connect("mongodb://admin:231026@ac-isg4wjv-shard-00-00.xuenu8i.mongodb.net:27017,ac-isg4wjv-shard-00-01.xuenu8i.mongodb.net:27017,ac-isg4wjv-shard-00-02.xuenu8i.mongodb.net:27017/?ssl=true&replicaSet=atlas-mlpak6-shard-0&authSource=admin&appName=Cluster0")
    .then(() => {
        console.log("MongoDB conectado");

        app.listen(5000, () => {
            console.log("Servidor rodando na porta 5000");
        })
    })
    .catch(err => {
        console.log("Erro ao conectar no MongoDB..", err);
    });

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API RODANDO ....");
});



