import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express()

app.use(morgan('dev'));
app.use(express.json());

app.use(routes);

app.get('/test', ( request, response) => {
    return response.json({ message: "Hello Wooorld!" })

})

app.listen(3333, () => {
    console.log('Server started on port 3333!')
})

