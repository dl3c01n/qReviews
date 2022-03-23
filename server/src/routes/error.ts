import express, { Response } from 'express'

const router = express.Router()

export const ErrorRoute = router.get('*', (_, res: Response) => {
    res.send("404, qu'est-ce que tu veux ?!")
})