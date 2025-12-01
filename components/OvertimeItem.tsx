'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { OvertimeEntry } from '@/types/overtime';
import { formatHours, getDayOfWeek } from '@/utils/calculations';
import { Trash2 } from 'lucide-react';

interface OvertimeItemProps {
  entry: OvertimeEntry;
  month: number;
  year: number;
  onRemove: (id: string) => void;
}

export function OvertimeItem({ entry, month, year, onRemove }: OvertimeItemProps) {
  const dayOfWeek = getDayOfWeek(entry.day, month, year);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRemove = () => {
    onRemove(entry.id);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
        <div className="flex md:block">
          <span className="md:hidden font-medium mr-2">Dia:</span>
          <span className="font-semibold">{entry.day} ({dayOfWeek})</span>
        </div>
        <div className="flex md:block">
          <span className="md:hidden font-medium mr-2">Entrada:</span>
          <span>{entry.startTime}</span>
        </div>
        <div className="flex md:block">
          <span className="md:hidden font-medium mr-2">Saída:</span>
          <span>{entry.endTime}</span>
        </div>
        <div className="flex md:block">
          <span className="md:hidden font-medium mr-2">Horas:</span>
          <span className="font-semibold text-primary">{formatHours(entry.hours)}</span>
        </div>
        <div className="flex justify-end">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowConfirm(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remover
          </Button>
        </div>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar remoção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover o registro do dia <strong>{entry.day}</strong>?
              <br />
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>Remover</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
