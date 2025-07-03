import { Request, RequestHandler, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login: RequestHandler = async (req: Request, res: Response) => {
    const { cpf, password } = req.body;

    try {
      const {token, user} = await this.userService.generateToken(cpf, password);
      res.status(200).json({ token, userData: user });
    } catch (error) {
      res.status(400).json({ error: 'CPF ou senha inválidos' });
    }
  }

}