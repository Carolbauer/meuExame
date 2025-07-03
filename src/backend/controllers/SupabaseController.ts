import { Request, RequestHandler, Response } from "express";
import { SupabaseService } from "../services/SupabaseService";

export class SupabaseController {
    private supabaseService: SupabaseService;

    constructor(){
        this.supabaseService = new SupabaseService();
    }

    public getInformationByExamAndSchedulingQueue: RequestHandler = async (req: Request, res: Response) => {
        try {
            const examInformation = await this.supabaseService.getInformationByExamAndSchedulingQueue(req.params.appointmentId);
            res.status(200).json({examInformation})
        } catch (error) {
            res.status(400).json({ error: 'Exame não encontrado!' });
        }
    }
}