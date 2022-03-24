import { AppDataSource } from "../data-source"
import { User } from "../models/User"

  export const findUsers = async (): Promise<Array<User>> => {
    const userRepository = AppDataSource.getRepository(User)
    
    return userRepository.find();
  };

  export const findUser = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User)
    return await userRepository.findOne({
      where: {
        "id": id
      }
    })
  }

  export const destroyUser = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
      where: {
        "id": id
      }
    })
    if(!user) throw Error('No user found !')
    return await userRepository.remove(user)
  }