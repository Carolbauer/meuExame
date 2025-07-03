import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { AppointmentConfirmation } from "../backend/dtos/AppointmentConfirmationDto";
import logoUrl from '../assets/image/logo_meu_exame.png';

export async function generateExamesPDF(exame: AppointmentConfirmation) {
    const res = await fetch(logoUrl);
    const logoBytes = await res.arrayBuffer();
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();

    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(0.2);
    let y = height - 50;

    page.drawImage(logoImage, {
        x: 50,
        y: y - logoDims.height,
        width: logoDims.width,
        height: logoDims.height,
    });

    page.drawText("Informações do Agendamento", {
        x: 50 + logoDims.width + 50,
        y: y - 10,
        size: 18,
        font,
        color: rgb(0, 0, 0),
    });

    y -= logoDims.height + 40;

    const paciente = exame.schedulingqueue.user;
    const exameInfo = exame.schedulingqueue.exam;
    const prioridade = exame.schedulingqueue.prioritylevel;
    const unidade = exame.facility;

    page.drawText("Dados do Paciente", { x: 50, y: y, size: 14, font });
    y -= 20;
    page.drawText(`Nome: ${paciente.name}`, { x: 50, y: y, size: 12, font });
    y -= 16;
    page.drawText(`CPF: ${paciente.cpf}`, { x: 50, y: y, size: 12, font });
    y -= 16;
    page.drawText(`Endereço: ${paciente.address}`, { x: 50, y: y, size: 12, font });
    y -= 16;
    page.drawText(`Telefone: ${paciente.phone}`, { x: 50, y: y, size: 12, font });

    y -= 30;
    page.drawText("Informações do Exame", { x: 50, y: y, size: 14, font });
    y -= 20;
    page.drawText(`Exame: ${exameInfo.name}`, { x: 50, y: y, size: 12, font });
    y -= 16;
    page.drawText(`Prioridade: ${prioridade.description}`, { x: 50, y: y, size: 12, font });
    y -= 16;
    page.drawText(`Data/Hora: ${new Date(exame.appointment_time).toLocaleString()}`, { x: 50, y: y, size: 12, font });

    y -= 30;
    page.drawText("Unidade de Atendimento", { x: 50, y: y, size: 14, font });
    y -= 20;
    page.drawText(`Nome: ${unidade.name}`, { x: 50, y: y, size: 12, font });
    y -= 16;
    page.drawText(`Endereço: ${unidade.address}`, { x: 50, y: y, size: 12, font });
    y -= 16;
    page.drawText(`Telefone: ${unidade.phone}`, { x: 50, y: y, size: 12, font });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}
