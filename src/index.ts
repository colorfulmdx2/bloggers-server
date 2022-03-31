import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import { router } from "./router";

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use('/hs_01/api', router);
app.all('*', function(req, res) {
    res.send(400)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
