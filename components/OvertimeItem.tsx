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
      <div className="p-2 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
        <div className="grid grid-cols-2 md:grid-cols-10 gap-2 items-center relative">
          <div className="flex md:block justify-center">
            <span className="md:hidden font-medium mr-2">Dia:</span>
            <span className="font-semibold">{entry.day} ({dayOfWeek})</span>
          </div>
          <div className="flex md:block justify-center">
            <span className="md:hidden font-medium mr-2">Entrada:</span>
            <span>{entry.startTime}</span>
          </div>
          <div className="flex md:block justify-center">
            <span className="md:hidden font-medium mr-2">Saída:</span>
            <span>{entry.endTime}</span>
          </div>
          <div className="flex md:block justify-center">
            <span className="md:hidden font-medium mr-2">Horas:</span>
            <span className="font-semibold text-primary">{formatHours(entry.hours)}</span>
          </div>
          <div className="col-span-2 md:col-span-5">
            <span className='text-sm text-muted-foreground line-clamp-1 text-ellipsis '>
              {entry.description}
            </span>
          </div>
          <div className="flex justify-end col-span-2 md:col-span-1">
            <Button
              variant="destructive"
              size="sm"
              className='w-full md:w-auto'
              onClick={() => setShowConfirm(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
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
