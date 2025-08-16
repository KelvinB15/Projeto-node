const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Configuração do body parser para formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // coloque seu usuário MySQL
    password: "1234", // coloque sua senha MySQL
    database: "cadastro_dados"
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL");
    }
});

// Rota POST para salvar os dados
app.post("/salvar", (req, res) => {
    const { nome, email } = req.body;

    db.query(
        "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
        [nome, email],
        (err) => {
            if (err) {
                console.error("Erro ao inserir:", err);
                res.send("Erro ao salvar");
            } else {
                // Redireciona para a página de sucesso
                res.redirect("/sucesso");
            }
        }
    );
});

// Rota para exibir a página de sucesso
app.get("/sucesso", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "sucesso.html"));
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});