import { createClient, SupabaseClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { AppointmentConfirmation } from '../dtos/AppointmentConfirmationDto';

dotenv.config();

export class SupabaseRepository {
    private supabaseUrl = process.env.VITE_SUPABASE_URL as string;
    private supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY as string;
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(this.supabaseUrl, this.supabaseAnonKey)
    }

    public async getByUser(cpf: string, password: string) {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('cpf', cpf)
            .eq('code', password)
            .single();

        if (error || !data) {
            throw new Error("CPF ou senha inválidos");
        }

        return data
    }

    public async getInformationByExamAndSchedulingQueue(appointment_id?: string) {
        const { data, error } = await this.supabase
            .from('appointments')
            .select(`
                        id,
                        appointment_time,
                        facility: facilities (
                        id,
                        name,
                        address,
                        cnpj,
                        phone
                        ),
                        schedulingqueue: schedulingqueue (
                        id,
                        created_at,
                        prioritylevel: prioritylevels (
                            id,
                            description,
                            color
                        ),
                        exam: exams (
                            id,
                            name,
                            exam_type_id
                        ),
                        user: users (
                            id,
                            name,
                            cpf,
                            address,
                            phone,
                            code,
                            email
                        )
                        )
                `)
            .eq('id', appointment_id)
            .single<AppointmentConfirmation>();
        
        if (error || !data) {
            throw new Error("Erro ao buscar exames");
        }

        return data
    }
}
