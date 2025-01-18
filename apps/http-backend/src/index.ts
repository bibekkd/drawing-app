import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";

const app = express();

app.get("/", (req:any, res:any) => {
    res.json({
        message: "this is me bibek"
    })
})

app.post("/signup", (req, res) => {
    
    const data = CreateUserSchema.safeParse(req.body);
    
    if (!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    res.json({
        message: "You are signed Up!",
    })

})

app.post("/signin", (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    
    if (!data.success) {
        res.json({
            message: "Incorrect Credentials"
        })
        return;
    }
    const userId = 1;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        token
    })
})

app.post("/room", middleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    
    if (!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    // db call

    res.json({
        roomId: 123
    })
})


app.listen(3001)