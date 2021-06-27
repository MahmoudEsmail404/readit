import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express'
import morgan from 'morgan'


import authRoutes from './routes/auth'

import trim from "./middleware/trim"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(trim)

app.get("/",(_,res)=>{
    res.send("hello world")
})

app.use("/api/auth",authRoutes)

app.listen(5000,async ()=>{
    console.log("Server running at http://localhost:5000")

    try {
        await createConnection()
        console.log("Database connected!")
        
    } catch (err) {
        console.log(err)
        
    }

})