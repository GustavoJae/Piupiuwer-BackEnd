import { response, Router } from "express";
import { uuid } from 'uuidv4';
import { users } from "./user.routes";

const piuRouter = Router();

interface Piu {         //cria um modelin do piu com suas caracteristicas
    id: string
    userId: string;
    text: string;
    creationDate: Date;
    updateDate: Date;
};

const pius = [] as Piu[];          //cria um banco de dados fake q é um array q acumula pius

piuRouter.post('/', (request, response) => {
    const { userId, text } = request.body;

    if (!text){
        return response.status(400).json({ message: "You cannot create an empty piu."})
    };

    if(text.length >= 140){
        return response.status(400).json({ message: "You cannot create a piu with more than 140 characters" })
    };
    const user = users.find(user => user.id === userId);
    if (!user) return response.status(404).json({ message: "User with the Id informed does not exist"})

    const piu = {
        id: uuid(),
        userId,
        text,
        creationDate: new Date(),
        updateDate: new Date(),
    }

    pius.push(piu);

    return response.json(piu);
});

piuRouter.get('/:id', (request, response) => {          //pescador de pius com chave sendo um Id
    const { id } = request.params;              //pega o id q tu ta procurando como parametro

    const piu = pius.find(piu => piu.id === id); //pergunta se tem alguem com o mesmo boné dentro da caixa

    if(!piu) return response.status(404).json({ message: "Piu not found"})          //se nao tiver, eh porque nao achamos um sapeca com o id que pedimos
    response.json(piu);          // se nao achamos, é porque ele é unico!! brabo
});



piuRouter.get('/', (request, response) => {         //fala tudo q tem no array, muito sapeca
    return response.json(pius)           //retorna o json do array, sabichao
});


piuRouter.put('/:id', (request, response) => {
    const { text } = request.body;
    const { id } = request.params;

    if (!text){
        return response.status(400).json({ message: "You cannot create an empty piu."})
    };

    if(text.length >= 140){
        return response.status(400).json({ message: "You cannot create a piu with more than 140 characters" })
    };
    
    const piuIndex = pius.findIndex(piu => piu.id === id)
    if (piuIndex === -1) return response.status(404).json({ message: "Piu with the Id informed does not exist"})
    
    pius[piuIndex].text = text;
    pius[piuIndex].updateDate = new Date();
})

export default piuRouter;


// achar o userIndex com o metodo findIndex (igual a linha 71)
//users.splice(userIndex,1)