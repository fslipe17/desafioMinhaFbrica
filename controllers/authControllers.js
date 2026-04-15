import authService from "../services/authService.js";

export async function login(req, res) {
    try{
        const result = await authService.login(req.body);
        res.json(result);
    } catch (err){
        res.status(400).json({message: err.message})
    }

}