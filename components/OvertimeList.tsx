'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { OvertimeItem } from './OvertimeItem';
import { List, Trash2 } from 'lucide-react';

interface OvertimeListProps {
  entries: OvertimeEntry[];
  month: number;
  year: number;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function OvertimeList({ entries, month, year, onRemove, onClearAll }: OvertimeListProps) {
  const sortedEntries = [...entries].sort((a, b) => a.day - b.day);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearAll = () => {
    onClearAll();
    setShowClearConfirm(false);
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              Registros do Mês
            </CardTitle>
            {entries.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remover Todos
              </Button>
            )}
          </div>
        </CardHeader>
      <CardContent>
        {sortedEntries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum registro adicionado ainda
          </div>
        ) : (
          <div className="space-y-2">
            <div className="hidden md:grid grid-cols-5 gap-4 pb-2 border-b font-medium text-sm text-muted-foreground">
              <div>Dia</div>
              <div>Hora Entrada</div>
              <div>Hora Saída</div>
              <div>Horas Extras</div>
              <div className="text-right">Ações</div>
            </div>
            {sortedEntries.map((entry) => (
              <OvertimeItem key={entry.id} entry={entry} month={month} year={year} onRemove={onRemove} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>

    <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar remoção de todos os registros</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover <strong>TODOS os {entries.length} registros</strong> deste mês?
            <br />
            <br />
            Os dados pessoais (nome e CI/CPF) serão mantidos.
            <br />
            <br />
            <strong className="text-destructive">Esta ação não pode ser desfeita.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClearAll} className="bg-destructive hover:bg-destructive/90">
            Remover Todos
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
  );
}
