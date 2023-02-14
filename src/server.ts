import express, {Express} from "express"
import router from "./routes/route"

const app:Express = express()
app.use(express.json())


app.use("/", router)
const PORT = process.env.PORT || 5000


app.listen(PORT, ():void => console.log("connecté sur le port " + PORT))