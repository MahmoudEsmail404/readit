import { IsEmail, Length } from "class-validator";
import {Entity as TOEntity,  Column, Index, CreateDateColumn, BeforeInsert, ManyToOne, JoinColumn} from "typeorm";
import bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";

import Entity from './Entity'
import User from "./User";
import { makeId, slugify } from "../util/helpers";

@TOEntity("posts")
export class Post extends Entity {

    constructor(post :Partial<Post>){
        super()
        Object.assign(this,post)
    }

    @Index()
    @Column()
    identifier:string // 7 Character Id

    @Column()
    title:string 

    @Index()
    @Column()
    slug:string 

    @Column({nullable:true,type:"text"})
    body:string


    @Column()
    subName:string


    @ManyToOne(()=>User,user=>user.posts)
    @JoinColumn({name:"username",referencedColumnName:"username"})
    user : User

    
@BeforeInsert()
makeIdAndSlug(){
  this.identifier=makeId(7)
  this.slug=slugify(this.title)
}


    

}
