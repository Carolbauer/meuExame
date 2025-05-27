import { Request, RequestHandler, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import jwt from 'jsonwebtoken';

class UserController{
    public login: RequestHandler = async (req: Request, res: Response) => {
        const { cpf, password } = req.body;
        
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('cpf', cpf)
            .eq('code', password)
            .single();
        
          if (error || !data) {
            res.status(400).json({ error: 'CPF ou senha inválidos' });
          }
        
          const token = jwt.sign({ id: data.id, cpf: data.cpf }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
          });
        
          res.status(200).json({ token, userData: data });
    }

}

export const userController = new UserController();