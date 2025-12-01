export interface OvertimeEntry {
  id: string;
  day: number;
  startTime: string; // Formato HH:MM
  endTime: string;   // Formato HH:MM
  hours: number;     // Horas calculadas em decimal
}

export interface OvertimeData {
  name: string;
  cpf: string;
  month: number;
  year: number;
  entries: OvertimeEntry[];
}

export interface FormData {
  name: string;
  cpf: string;
  month: number;
  year: number;
}
