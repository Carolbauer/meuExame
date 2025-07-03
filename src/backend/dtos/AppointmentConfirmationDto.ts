export interface AppointmentConfirmation {
    id: number;
    appointment_time: string;
    facility: {
        id: number;
        name: string;
        address: string;
        cnpj: string;
        phone: string;
    };
    schedulingqueue: {
        id: number;
        created_at: string;
        prioritylevel: {
            id: number;
            description: string;
            color: string;
        };
        exam: {
            id: number;
            name: string;
            exam_type_id: number;
        };
        user: {
            id: number;
            name: string;
            cpf: string;
            address: string;
            phone: string;
            code: number;
            email?: string;
        };
    };
}