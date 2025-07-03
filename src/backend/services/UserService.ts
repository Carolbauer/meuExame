import { SupabaseRepository } from "../repository/SupabaseRepository";
import jwt from 'jsonwebtoken'

export class UserService {
    private supabaseRepository: SupabaseRepository

    constructor() {
        this.supabaseRepository = new SupabaseRepository();
    }

    public async generateToken(cpf: string, password: string) {
        const user = await this.supabaseRepository.getByUser(cpf, password);
        const token = jwt.sign({ id: user.id, cpf: user.cpf }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        return {token, user};
    }
}