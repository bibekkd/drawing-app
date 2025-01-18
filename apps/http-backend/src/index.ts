import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";

const app = express();

interface SigninProps {
    email: String,
    password: String
}

app.get("/", (req:any, res:any) => {
    res.json({
        message: "this is me bibek"
    })
})

app.post("/signup", (req, res) => {
    const {email, password}: SigninProps =  req.body;

    res.json({
        message: "You are signed Up!",
        email: email
    })

})

app.post("/signin", (req, res) => {
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        token
    })
})

app.post("/room", middleware, (req, res) => {
    // db call

    res.json({
        roomId: 123
    })
})


app.listen(3001)