import { OvertimeData } from '@/types/overtime';

/**
 * Gera o nome do arquivo baseado no nome e datas dos registros
 */
export function generateFileName(data: OvertimeData): string {
  const sanitizedName = data.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]/g, '_');

  // Se houver registros, pega a primeira e última data
  if (data.entries.length > 0) {
    const sortedDates = [...data.entries].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const firstDate = sortedDates[0].date.replace(/-/g, '_');
    const lastDate = sortedDates[sortedDates.length - 1].date.replace(/-/g, '_');

    if (firstDate === lastDate) {
      return `${firstDate}_${sanitizedName}.json`;
    }
    return `${firstDate}_a_${lastDate}_${sanitizedName}.json`;
  }

  return `${sanitizedName}_horas_extras.json`;
}

/**
 * Exporta dados para arquivo JSON
 */
export function exportToJson(data: OvertimeData): void {
  const fileName = generateFileName(data);
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Importa dados de arquivo JSON
 */
export function importFromJson(file: File): Promise<OvertimeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as OvertimeData;

        // Validações básicas
        if (!data.name || !data.cpf || !Array.isArray(data.entries)) {
          throw new Error('Formato de arquivo inválido');
        }

        resolve(data);
      } catch (error) {
        reject(new Error('Erro ao ler o arquivo JSON'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo'));
    };

    reader.readAsText(file);
  });
}
