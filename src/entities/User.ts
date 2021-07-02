import { IsEmail, Length } from "class-validator";
import {Entity as TOEntity,  Column, Index, BeforeInsert, OneToMany} from "typeorm";
import bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";

import Entity from './Entity'
import  Post  from "./Post";

@TOEntity("users")
export default class User extends Entity {

    constructor(user :Partial<User>){
        super()
        Object.assign(this,user)
    }

    

    @Index()
    @IsEmail(undefined,{message:"Please enter a valid email address"})
    @Length(1,255,{message:"Email is Empty"})
    @Column({unique:true})
    email:string

    @Index()
    @Length(3,255,{message:"must be atleast 3 characters long"})
    @Column({unique:true})
    username: string

    @Exclude()
    @Column()
    @Length(6,255,{message:"Must be atleast 6 characters long"})
    password:string

    

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,6)
    }


    @OneToMany(()=>Post,post =>post.user)

    posts:Post[]

    

}
