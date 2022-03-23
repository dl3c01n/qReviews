import express, { Response, Request } from 'express'
import { pool } from '../database/Pool'
import { User } from '../sqlModels/User'


const router = express.Router()

const getUsers = router.get('/users', async (_, res: Response) => {
    const client = await pool.connect()
    const users = await client.query('SELECT * FROM "User"')

    res.status(200).send(users.rows)
})

const getUser = router.get('/user/:id', async (req: Request, res: Response) => {
    const client = await pool.connect()
    const user = await client.query('SELECT * FROM "User" WHERE id=$1', [req.params.id])

    res.status(200).send(user.rows)
})

const createUser = router.post('/create-user', async (req: Request, res: Response) => {
    const client = await pool.connect()
    const createUser = req.body as User
    try {
        await client.query('INSERT INTO "User"("firstName", "lastName") VALUES ($1, $2)', [createUser.firstName, createUser.lastName])
        return res.send('User inserted !')  
    } catch (error) {
        return res.send(error)
    }
})

const updateUser = router.put('/update-user',async (req: Request, res: Response) => {
    const client = await pool.connect()
    const body = req.body as User
    try {
        await client.query('UPDATE "User" SET "firstName" = $1, "lastName" = $2 WHERE id=$3', [body.firstName, body.lastName, req.query.id])
        return res.send('Updated !')
    } catch (error) {
        return error
    }
})

const deleteUser = router.delete('/delete-user', async(req: Request, res: Response) => {
    const client = await pool.connect()
    try{
        await client.query('DELETE FROM "User" WHERE id=$1', [req.query.id])
        return res.send('Deleted!')
    }catch(e){
        return e
    }
})
export const UserRoutes = [getUser,updateUser, getUsers, createUser, deleteUser]