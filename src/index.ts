import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import { router } from "./router";
import {authMiddleware} from "./middlewares/auth.middleware";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(authMiddleware)
app.use('/hs_01/api', router);

app.all('*', function(req, res) {
    res.send(400)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
