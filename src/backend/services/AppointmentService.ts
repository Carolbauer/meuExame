import { supabase } from "../../libs/supabaseClient";

export async function getAppointmentById(id: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      id,
      appointment_time,
      facility: facilities (
        id, name, address, cnpj, phone
      ),
      schedulingqueue (
        id, created_at,
        prioritylevel: prioritylevels (
          id, description, color
        ),
        scheduling_status: schedulingqueuestatus (
          id, description
        ),
        exam: exams (
          id, name, exam_type_id
        ),
        user: users (
          id, name, cpf, address, phone, code, email
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateSchedulingStatus(queueId: number, statusId: number) {
  const { error } = await supabase
    .from("schedulingqueue")
    .update({ scheduling_queue_status_id: statusId })
    .eq("id", queueId);

  if (error) throw new Error(error.message);
}
