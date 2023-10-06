const express = require('express');
const db = require('./db');
const app = express();
const port = 8080;


app.use(express.urlencoded({ extended: true }));

app.post('/createUser', function (req, res) {

    if (!req.body.nome == " ") {
        let dados = db.createUsers(req.body).catch(console.dir);
        res.send(dados);
    }else{
        res.send("Inválido");
    }

    
})

app.get('/lista', function (req, res) {

    let dados = db.listarUsers();

    console.log(dados);

})

app.get('/dados/:email', (req, res) => {

    var dados = req.params

    var dadosfinais = JSON.parse(fs.readFileSync(dados.email))

    res.json(dadosfinais)

})

app.get('/apagar/:email', (req, res) => {

    var dados = req.params

    if (fs.existsSync(dados.email)) {

        fs.rmSync(dados.email)

    }

    res.json({ message: 'ok' })

})





app.listen(port, () => {

    console.log("rodou :)")

})