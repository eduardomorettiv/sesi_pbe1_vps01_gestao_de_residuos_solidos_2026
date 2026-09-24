const express = require("express")
const dados = require("./dados.json")

//Funções
const listarOuBuscar = (req, res) => {
    const { id, local, tipo_residuo } = req.query;

    let resultado = dados;
    if (id) {
        resultado = resultado.filter((dado) => dado.id == id);
    }

    if (local) {
        resultado = resultado.filter((dado) => 
            dado.local.toLowerCase().includes(local.toLowerCase())
        );
    }

    if (tipo_residuo) {
        resultado = resultado.filter((dado) => 
            dado.tipo_residuo.toLowerCase() === tipo_residuo.toLowerCase()
        );
    }

    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send("Dado encontrado");
    }
}

function autoIncrement() {
    return Number(dados[dados.length - 1].id) + 1
}

const adicionar = (req, res)=>{
    if(req.body){
        req.body.id = autoIncrement()
        dados.push(req.body)
        res.send("dados adicionados")
    }else{
        res.send("erro ao adicionar seus dados")
    }
}

const alterar = (req, res)=>{
    const id=req.params.id
    const novo=req.body

    dados.forEach((dado, indice)=>{
        if(dado.id==id){
            dado.id=novo.id
            dado.local=novo.local
            dado.tipo_residuo=novo.tipo_residuo
            dado.nivel_risco=novo.nivel_risco
            dado.data_registro=novo.data_registro
            dado.status=novo.status
        }
    })
    res.send("dados alterados")
}

const excluir=(req, res)=>{
    const id = req.query.id;

    dados.forEach=(dado, indice) => {
        if(dado.id == id){
            dados.splice(indice, 1);
        }
    }
    res.send("dados excluídos")
}

//configurações
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const porta = 3000

//rotas
app.get("/", listarOuBuscar)
app.post("/", adicionar)
app.put("/:id", alterar)
app.delete("/", excluir)

//porta do servidor
app.listen(porta, ()=>{
    console.log(`servidor: http://localhost:${porta}`)
    console.log(`cliente: http://127.0.0.1:5500/cliente/index.html`)
})