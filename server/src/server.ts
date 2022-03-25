import express, {Request, Response} from 'express'
import { userRoutes } from './controllers/userController'
import { AppDataSource } from './data-source'
const app = express()
const PORT = 3001
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

app.get('/', (_, res: Response) => {
    res.send('Nothing Here !!!')
})

app.use(userRoutes)


app.listen(PORT, () => {
    
    console.log('Listening on port : '.concat(PORT.toString()))
})