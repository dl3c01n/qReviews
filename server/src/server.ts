import express, {Request, Response} from 'express'
import { AppDataSource } from './data-source'
import { ErrorRoute } from './routes/error'
import { ReviewRoutes } from './routes/review'
import { UserRoutes } from './routes/user'
const app = express()
const PORT = 3001
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

app.get('/', (_, res: Response) => {
    res.send('Hello from API')
})

app.use(ReviewRoutes, UserRoutes, ErrorRoute)


app.listen(PORT, () => {
    AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
    console.log('Listening on port : '.concat(PORT.toString()))
})