import { Request, Response } from "express"
import auth from "../middleware/auth"
import {Router} from 'express'
import User from './../entities/User';
import Post from "../entities/Post";
import Vote from "../entities/Vote";
import Comment from "../entities/Comment";

const vote = async (req:Request,res:Response) => {
    const {identifier,slug,commentIdentifier,value }=req.body

    //Validate vote value 

    if(![-1,0,1].includes(value)){
        return res.status(400).json({value:"Value must be -1, 0 or 1"})
    }
    try {
        const user :User = res.locals.user
        let post = await Post.findOneOrFail({identifier,slug})
        let vote :Vote | undefined
        let comment :Comment | undefined 
        
        if(commentIdentifier){
            // IF there is a comment identitifer find vote by comment
            comment = await Comment.findOneOrFail({identifier:commentIdentifier})
            vote = await Vote.findOne({user,comment})
        } else {
            //Else find vote by post
            vote = await Vote.findOne({user,post})


        }
        if(!vote && value ===0){
            // if no vote exist  and value = 0 return error because you can't reset a vote that doesn't exist
            return res.status(404).json({error:"Vote not found"})
        } else if(!vote){
            //if you don't have a vote but got a value that is not 0 which is (-1 or 1) 
            //then create a vote and assign that value to it
            vote = new Vote({user,value})
            //deciding whether we vote on a post or comment and persist to our DB
            if(comment) vote.comment= comment
            else vote.post = post
            await vote.save()
        } else if (value===0){
        //If vote exists and value = 0 remove vote from DB
        await vote.remove()
        } else if (vote.value !==value){
           // If vote and value has changed , update vote
           vote.value = value
           await vote.save() 
        }
        post = await Post.findOneOrFail({identifier,slug},{ relations: ['comments', 'comments.votes', 'sub', 'votes']})
        post.setUserVote(user)
        post.comments.forEach(c=>c.setUserVote(user))
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:"Something Went Wrong"})
        
    }

}

const router = Router()
router.post("/vote",auth,vote)

export default router