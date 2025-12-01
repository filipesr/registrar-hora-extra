'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { OvertimeData } from '@/types/overtime';
import { exportToJson } from '@/utils/fileHandlers';
import { Download, Trash2 } from 'lucide-react';

interface FileActionsProps {
  data: OvertimeData;
  onClearAll: () => void;
}

export function FileActions({ data, onClearAll }: FileActionsProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleExport = () => {
    setError('');
    setSuccess('');

    // Validar campos obrigatórios
    if (!data.name || !data.cpf || !data.month || !data.year || data.entries.length === 0) {
      setError('Preencha nome, CI/CPF, mês e ano para exportar o arquivo');
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

  const handleClearAll = () => {
    onClearAll();
    setShowClearConfirm(false);
    setSuccess('Todos os registros foram removidos!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleExport}
              className="flex-1"
              variant="default"
              disabled={!data.name || !data.cpf || data.entries.length === 0  }
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Para Enviar
            </Button>

            <Button
              onClick={() => setShowClearConfirm(true)}
              className="flex-1"
              variant="destructive"
              disabled={data.entries.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remover todos os registros
            </Button>
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

      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar limpeza de dados</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja limpar <strong>TODOS os registros</strong>?
              <br />
              <br />
              Esta ação irá remover todos os registros de horas extras salvos.
              Os dados pessoais (nome e CI/CPF) serão mantidos.
              <br />
              <br />
              <strong className="text-destructive">Esta ação não pode ser desfeita.</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll} className="bg-destructive hover:bg-destructive/90">
              Limpar Tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
