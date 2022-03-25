
import express, { NextFunction, Response, Request } from "express";
import { destroyUser, findUser, findUsers } from "../services/userService";
const router = express.Router()

export interface UserPayload {
  firstName: string;
  lastName: string;
}

export const getUsers = async (_: any, res: Response) => {
    try {
      const users = await findUsers();
      res.send(users);
    } catch (err) {
      return res.send(500)
    }
  };

  export const getUser = async (req: Request, res: Response) => {
    try {
      const user = await findUser(Number(req.query.id))
      res.send(user);
    } catch (err) {
      return res.status(500)
    }
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    try{
       await destroyUser(Number(req.query.id))
      return res.send('Deleted !')
    }catch(e){
      return res.status(500)
    }
  }




export const userRoutes = [
  router.get('/users', getUsers),
  router.get('/user', getUser),
  router.delete('/user', deleteUser),
]