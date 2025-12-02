export interface OvertimeEntry {
  id: string;
  date: string;      // Formato ISO YYYY-MM-DD
  startTime: string; // Formato HH:MM
  endTime: string;   // Formato HH:MM
  hours: number;     // Horas calculadas em decimal
  description: string; // Descrição da tarefa realizada
}

export interface OvertimeData {
  name: string;
  cpf: string;
  entries: OvertimeEntry[];
}

export interface FormData {
  name: string;
  cpf: string;
}
