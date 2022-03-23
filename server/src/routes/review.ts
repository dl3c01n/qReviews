import express, { Response, Request } from 'express'
import { pool } from '../database/Pool'
import { Review } from '../sqlModels/Review'

const router = express.Router()

const getReviews = router.get('/reviews', async (_, res: Response) => {
    const client = await pool.connect()
    const reviews = await client.query('SELECT * FROM "Review"')

    res.status(200).send(reviews.rows)
})

const getReview = router.get('/review/:id', async (req: Request, res: Response) => {
    const client = await pool.connect()
    const review = await client.query('SELECT * FROM "Review" WHERE id=$1', [req.params.id])

    res.status(200).send(review.rows)
})

const createReview = router.post('/create-review', async (req: Request, res: Response) => {
    const client = await pool.connect()
    const createReview = req.body as Review
    console.log('body', createReview)
    try {
        await client.query('INSERT INTO "Review"("comment", "userId") VALUES ($1, $2)', [createReview.comment, createReview.user.id])
        return res.send('Review inserted !')  
    } catch (error) {
        return res.send(error)
    }
})

const deleteReview = router.delete('/delete-review', async(req: Request, res: Response) => {
    const client = await pool.connect()
    try{
        await client.query('DELETE FROM "Review" WHERE id=$1', [req.query.id])
        return res.send('Deleted !')
    } catch(e){
        return e
    }
})

export const ReviewRoutes = [getReview, getReviews, createReview, deleteReview]