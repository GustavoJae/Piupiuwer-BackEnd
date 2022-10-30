import { request, response, Router } from "express";
import { uuid } from "uuidv4";

const userRouter = Router();


interface User { //aqui crio o modelo do objeto User, que possui um id name e email
    id: string
    name: string;
    birthDate: string;
    cpf: string;
    telephone: string;
    creationDate: Date;
    updateDate: Date;
    email: string;

}

export const users = [] as User[];


userRouter.post('/', (request, response) => {               //cria (post) um novo usuario
    const { name, birthDate, cpf, telephone, email } = request.body; //pega os presentinhos q eles me deram e uso


    if (!name){
        return response.status(400).json({message: "You cannot create a user without a name."})
    };

    if (!birthDate){
        return response.status(400).json({message: "You cannot create a user without a birth date."})
    };

    if (!cpf){
        return response.status(400).json({message: "You cannot create a user without a CPF."})
    };

    if (!telephone){
        return response.status(400).json({message: "You cannot create a user without a telephone."})
    };

    if (!email){
        return response.status(400).json({message: "You cannot create a user without an email."})
    };

    if (users.find(user => user.cpf === cpf)){
        return response.status(400).json({ message: "There is another user with this CPf"})
    };
    
    const user = { //caso esteja tudo maravilindo, entao eu crio um perfil com os coisos q eu recebi
        id: uuid(),
        name,
        birthDate,
        cpf,
        telephone,
        creationDate: new Date(),
        updateDate: new Date(),
        email,
        } as User; //utilizo o modelin

    users.push(user);//push serve aqui como o vetor.append(x) do python.

    return response.json(user); //printa na tela como um json esse user

});

userRouter.get('/', (request, response) => { //retorna tudo q tem na caixa
    return response.json(users);
});

userRouter.get('/:id', (request, response) => { //pescador de user, usa chave id
    const { id } = request.params; //RECEBA!! a chave de id como uma variavel

    const user = users.find(user => user.id === id); //procura users com o msm id

    if (!user) return response.status(404).json({ message: "User not found" });

    response.json(user);// se n tiver eu printo esse user procurado ai
});

userRouter.put('/:id', (request, response) => {
    const { id } = request.params;
    const { name, birthDate, cpf, telephone, email} = request.body;

    if (!name){
        return response.status(400).json({message: "You cannot create a user without a name."})
    };

    if (!birthDate){
        return response.status(400).json({message: "You cannot create a user without a birth date."})
    };

    if (!cpf){
        return response.status(400).json({message: "You cannot create a user without a CPF."})
    };

    if (!telephone){
        return response.status(400).json({message: "You cannot create a user without a telephone."})
    };

    if (!email){
        return response.status(400).json({message: "You cannot create a user without an email."})
    };

    const userWithSameCpf = users.find(user => user.cpf === cpf && user.id !== id);
    if (userWithSameCpf) return response.status(400).json({ message: "There is another user with this Cpf" });


    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return response.status(404).json({ message: "User with the Id informed does not exist" })

    users[userIndex].name = name;
    users[userIndex].birthDate = birthDate;
    users[userIndex].cpf = cpf;
    users[userIndex].telephone = telephone;
    users[userIndex].email = email;
    users[userIndex].updateDate = new Date();

    return response.json(users[userIndex]);
});

userRouter.delete('/:id', (request, response) => {
    const { id } = request.params;
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex !== -1){
        users.splice(userIndex,1);
    } else{
        return response.status(400).json({ message: "User with the informed Id not found" })
    };
    return response.status(200).json({ message: "Your delete was sucessful!" });
});

export default userRouter;
