import express, {Router, Response, Request} from "express"
import crypto from "crypto"
import mail from "../utils/nodemail"
const router:Router = express.Router()

type Voitures = Voiture<Object>[]
type HTMLMessage = string

interface Voiture<X> {
    id: string,
    obj: X
}

let datas: Voitures = []

router.get("/test/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const result = datas.find(voit => voit.id === id)
  return res.json(result)
})

router.get("/test", (req: Request, res: Response) => {
  return res.json(datas)
})


router.post("/test", (req: Request, res: Response) => {
  const voiture: Voiture<{marque: string, couleur: string}> = {
    id: crypto.randomUUID(),
    ...req.body
  }

  const message: HTMLMessage = `
  <h1 style='color: white'>Vous venez d'ajouter une voiture à votre liste avec l'identifiant suivant: <strong>"${voiture.id}"</strong></h1>
    <ul>
      <li style='color: white'>Marque de la voiture: ${req.body.marque}</li>
      <li style='color: white'>Couleur de la voiture: ${req.body.couleur}</li>
    </ul>
  `

  datas.push(voiture)

  mail(message, "mbenamar@test.fr")
  return res.json(voiture)
})

export default router