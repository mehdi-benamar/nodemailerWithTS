"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const nodemail_1 = __importDefault(require("../utils/nodemail"));
const router = express_1.default.Router();
let datas = require("../../db/datas.json");
const listToken = [];
router.get("/test/:id", (req, res) => {
});
router.get("/test", (req, res) => {
    res.json(listToken);
});
router.post("/reset", (req, res) => {
    const { email } = req.body;
    const user = datas.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: "ce user n'existe pas !" });
    }
    const token = crypto_1.default.randomBytes(32).toString("hex");
    const resetLink = `${req.protocol}://${req.get("host")}/reset?id=${user.id}&token=${token}`;
    listToken.push({
        userId: user.id,
        token
    });
    (0, nodemail_1.default)(`<a href="${resetLink}">${resetLink}</a>`, user.email);
    res.status(200).json(listToken);
});
router.put("/reset", (req, res) => {
    const { id, token } = req.query;
    if (!id && !token)
        return res.json({ message: "paramètres manquant pour réinitialiser le mdp" });
    const userToken = listToken.find(t => t.userId.toString() === id);
    if (userToken && (userToken.token === token || userToken.userId.toString() === id)) {
        const user = datas.find(u => u.id === userToken.userId);
        if (user) {
            if (!req.body.password || req.body.password === "")
                return res.json({ message: "mot de passe obligatoire" });
            user.password = req.body.password;
            res.json({ message: "mot de passe à jour" });
        }
    }
    else {
        res.json({ message: "id ou le token n'est pas bon !" });
    }
});
exports.default = router;
