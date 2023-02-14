"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const nodemail_1 = __importDefault(require("../utils/nodemail"));
const router = express_1.default.Router();
let datas = [];
router.get("/test/:id", (req, res) => {
    const { id } = req.params;
    const result = datas.find(voit => voit.id === id);
    return res.json(result);
});
router.get("/test", (req, res) => {
    return res.json(datas);
});
router.post("/test", (req, res) => {
    const voiture = Object.assign({ id: crypto_1.default.randomUUID() }, req.body);
    const message = `
  <h1 style='color: white'>Vous venez d'ajouter une voiture à votre liste avec l'identifiant suivant: <strong>"${voiture.id}"</strong></h1>
    <ul>
      <li style='color: white'>Marque de la voiture: ${req.body.marque}</li>
      <li style='color: white'>Couleur de la voiture: ${req.body.couleur}</li>
    </ul>
  `;
    datas.push(voiture);
    (0, nodemail_1.default)(message, "mbenamar@test.fr");
    return res.json(voiture);
});
exports.default = router;
