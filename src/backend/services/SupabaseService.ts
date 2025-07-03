import { SupabaseRepository } from "../repository/SupabaseRepository";

export class SupabaseService {
    private supabaseRepository: SupabaseRepository;

    constructor(){
        this.supabaseRepository = new SupabaseRepository();
    }

    public async getInformationByExamAndSchedulingQueue(appointment_id?: string){
        return await this.supabaseRepository.getInformationByExamAndSchedulingQueue(appointment_id);
    }
}