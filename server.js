const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.send({ erro: true, msg: "Rota não definida no servidor." })
});

app.post('/home', function (req, res) {

    const salvar = JSON.stringify(req.body)

    fs.writeFileSync(`${req.body.email}.json`, salvar, (err) => {

        if (err) {

            res.json({ message: err })

        }

    })

    res.json({ message: 'ok' })



})

app.get('/lista', function (req, res) {

    fs.readdir(__dirname, (err, files) => {

        var dados = files.filter(file => file.includes('@') && file.includes('.json'))

        res.json(dados)

    })

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