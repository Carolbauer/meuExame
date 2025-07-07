import { supabase } from "../../libs/supabaseClient";

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw new Error("Usuário não encontrado");
  return data;
}

export async function getExamsForUser(userId: string) {
  const { data: queueData, error } = await supabase
    .from("schedulingqueue")
    .select(`
      id,
      created_at,
      exam_id,
      exams(name),
      prioritylevels(id, description, color),
      schedulingqueuestatus(description)
    `)
    .eq("user_id", userId);

  if (error) throw new Error("Erro ao carregar exames");

  const exams = await Promise.all(
    queueData.map(async (item) => {
      const status = item.schedulingqueuestatus?.description || "Status indefinido";
      const diff = Date.now() - new Date(item.created_at).getTime();
      const daysInQueue = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

      const { data: allInQueue } = await supabase
        .from("schedulingqueue")
        .select(`id, created_at, prioritylevels(id), schedulingqueuestatus(description)`)
        .eq("exam_id", item.exam_id);

      const validInQueue = allInQueue.filter((q) => {
        const qStatus = q.schedulingqueuestatus?.description;
        return !["Desmarcado", "Concluído", "Confirmado"].includes(qStatus);
      });

      validInQueue.sort((a, b) => {
        const prioA = a.prioritylevels?.id ?? 99;
        const prioB = b.prioritylevels?.id ?? 99;
        return prioA !== prioB
          ? prioA - prioB
          : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });

      const position = validInQueue.findIndex((q) => q.id === item.id) + 1;

      const { data: appointment } = await supabase
        .from("appointments")
        .select("id, appointment_time")
        .eq("scheduling_queue_id", item.id)
        .single();

      return {
        exam_id: item.exam_id,
        name: item.exams.name,
        priority: item.prioritylevels.description,
        color: item.prioritylevels.color,
        avgWaitTime: "60 dias",
        timeInQueue: `${daysInQueue} dias`,
        position,
        isScheduled: Boolean(appointment?.appointment_time),
        status,
        appointmentId: appointment?.id,
      };
    })
  );

  return exams;
}
