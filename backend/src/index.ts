import express from "express"
import { router } from "./routes/v1";
var cors = require('cors')
const port  = 3001 

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.listen(process.env.PORT || port)

console.log('Server started at http://localhost:' + port);