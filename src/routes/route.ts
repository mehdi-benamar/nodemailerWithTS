import express, {Router, Response, Request} from "express"
import crypto from "crypto"
import mail from "../utils/nodemail"
const router:Router = express.Router()
let datas: {id: number, email: string, password: string}[] = require("../../db/datas.json")

type liste = {userId: number, token: string}[]
const listToken: liste = []

router.get("/test/:id", (req: Request, res: Response) => {
  
})

router.get("/test", (req: Request, res: Response) => {
  res.json(listToken)
})


router.post("/reset", (req: Request, res: Response) => {
  const { email } = req.body
  const user = datas.find(u => u.email === email)
  
  if(!user){
    return res.status(400).json({message: "ce user n'existe pas !"})
  }

  const token = crypto.randomBytes(32).toString("hex")
  const resetLink = `${req.protocol}://${req.get("host")}/reset?id=${user.id}&token=${token}`

  listToken.push({
    userId: user.id,
    token
  })

   mail(`<a href="${resetLink}">${resetLink}</a>`, user.email) 

  res.status(200).json(listToken)
  
})

router.put("/reset", (req: Request, res: Response) => {

  const {id, token} =  req.query

  if(!id && !token) return res.json({message: "paramètres manquant pour réinitialiser le mdp"})

  const userToken = listToken.find(t => t.userId.toString() === id)

  if(userToken && (userToken.token === token || userToken.userId.toString() === id)){
    const user = datas.find(u => u.id === userToken.userId)

    if(user){
      if(!req.body.password || req.body.password === "") return res.json({message: "mot de passe obligatoire"})

      user.password = req.body.password
      res.json({message: "mot de passe à jour"})

    }

    }else{
      res.json({message: "id ou le token n'est pas bon !"})
    }
})

export default router