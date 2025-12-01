'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OvertimeData } from '@/types/overtime';
import { exportToJson, importFromJson } from '@/utils/fileHandlers';
import { Download, Upload } from 'lucide-react';

interface FileActionsProps {
  data: OvertimeData;
  onImport: (data: OvertimeData) => void;
}

export function FileActions({ data, onImport }: FileActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleExport = () => {
    setError('');
    setSuccess('');

    // Validar campos obrigatórios
    if (!data.name || !data.cpf || !data.month || !data.year) {
      setError('Preencha nome, CI/CPF, mês e ano para salvar o arquivo');
      return;
    }

    try {
      exportToJson(data);
      setSuccess('Arquivo exportado com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Erro ao exportar arquivo');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSuccess('');

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await importFromJson(file);
      onImport(importedData);
      setSuccess('Arquivo importado com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao importar arquivo');
    }

    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleExport}
            className="flex-1"
            variant="default"
            disabled={!data.name || !data.cpf}
          >
            <Download className="h-4 w-4 mr-2" />
            Salvar JSON
          </Button>

          <Button
            onClick={handleImportClick}
            className="flex-1"
            variant="outline"
          >
            <Upload className="h-4 w-4 mr-2" />
            Carregar JSON
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {error && (
          <div className="mt-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 text-sm text-green-600 bg-green-50 dark:bg-green-950 p-3 rounded-md">
            {success}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
