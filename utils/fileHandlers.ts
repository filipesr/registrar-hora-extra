import { OvertimeData } from '@/types/overtime';

/**
 * Gera o nome do arquivo no formato ano_mes_nome.json
 */
export function generateFileName(year: number, month: number, name: string): string {
  const sanitizedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]/g, '_');

  const monthStr = String(month).padStart(2, '0');
  return `${year}_${monthStr}_${sanitizedName}.json`;
}

/**
 * Exporta dados para arquivo JSON
 */
export function exportToJson(data: OvertimeData): void {
  const fileName = generateFileName(data.year, data.month, data.name);
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
        if (!data.name || !data.cpf || !data.month || !data.year || !Array.isArray(data.entries)) {
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
