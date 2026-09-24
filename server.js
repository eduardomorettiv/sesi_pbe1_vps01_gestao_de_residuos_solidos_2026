const express = require("express")
const dados = require("./dados.json")

//Funções
const mostrar = (req, res) =>{
    res.json(dados)
}

const mostrarespecifico = (req, res)=>{
    const id=req.query.id
    const inventario=inventario.find((itens)=>itens.id==id)

    if(inventario){
        res.send(inventario)
    }else{
        res.status(404).send("Dado não encontrado")
    }
}

const adicionar = (req, res)=>{
    if(req.body){
        dados.push(req.body)
        res.send("dados adicionados")
    }else{
        res.send("erro ao adicionar seu dados")
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
const porta = 3000

//rotas
app.get("/", mostrar)
app.get("/", mostrarespecifico)
app.post("/", adicionar)
app.put("/:id", alterar)
app.delete("/", excluir)

//porta do servidor
app.listen(porta, ()=>{
    console.log(`servidor: http://localhost${porta}`)
})