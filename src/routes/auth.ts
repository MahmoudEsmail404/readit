import { Request, Response, Router } from "express";
import { User } from "../entities/User";
import { validate, Validate } from "class-validator";
const register = async (req:Request,res:Response) => {
  const {email,username,password} = req.body

  try {

    // TODO Validate data
    let errors : any = {}
    const emailUser = await User.findOne({email})
    const usernameUser = await User.findOne({username})

    if(emailUser) errors.email = "Email is already taken"
    if(usernameUser) errors.username = "username is already taken"

    if(Object.keys(errors).length>0){
      return res.status(400).json(errors)
    }
    // TODO Create the user

    const user = new User({email,username,password})
     errors = await validate(user)
    if(errors.length>0) return res.status(400).json({errors})
    await user.save()
    return res.json(user)

    // TODO Return the user
    
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
    
  }
}

const router = Router()

router.post("/register",register)

export default router