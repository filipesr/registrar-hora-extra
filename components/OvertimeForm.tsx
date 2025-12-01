'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { calculateOvertimeHours, isValidTimeFormat, exceedsHourLimit, formatHours } from '@/utils/calculations';
import { Plus, AlertTriangle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface OvertimeFormProps {
  onAdd: (entry: OvertimeEntry) => void;
  existingDays: number[];
}

export function OvertimeForm({ onAdd, existingDays }: OvertimeFormProps) {
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [pendingEntry, setPendingEntry] = useState<OvertimeEntry | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    const dayNum = parseInt(day);
    if (!day || dayNum < 1 || dayNum > 31) {
      setError('Dia deve estar entre 1 e 31');
      return;
    }

    if (existingDays.includes(dayNum)) {
      setError('Já existe um registro para este dia');
      return;
    }

    if (!isValidTimeFormat(startTime)) {
      setError('Formato de hora de entrada inválido (HH:MM)');
      return;
    }

    if (!isValidTimeFormat(endTime)) {
      setError('Formato de hora de saída inválido (HH:MM)');
      return;
    }

    const hours = calculateOvertimeHours(startTime, endTime);

    const entry: OvertimeEntry = {
      id: uuidv4(),
      day: dayNum,
      startTime,
      endTime,
      hours,
    };

    // Verifica se excede 4 horas
    if (exceedsHourLimit(hours)) {
      setPendingEntry(entry);
      setShowAlert(true);
    } else {
      addEntry(entry);
    }
  };

  const addEntry = (entry: OvertimeEntry) => {
    onAdd(entry);
    setDay('');
    setStartTime('');
    setEndTime('');
    setPendingEntry(null);
  };

  const handleConfirmHighHours = () => {
    if (pendingEntry) {
      addEntry(pendingEntry);
    }
    setShowAlert(false);
  };

  const handleCancelHighHours = () => {
    setPendingEntry(null);
    setShowAlert(false);
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Adicionar Registro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label htmlFor="day" className="text-sm font-medium">
                  Dia
                </label>
                <Input
                  id="day"
                  type="number"
                  min="1"
                  max="31"
                  placeholder="1-31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium">
                  Hora Entrada
                </label>
                <Input
                  id="startTime"
                  type="time"
                  placeholder="HH:MM"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium">
                  Hora Saída
                </label>
                <Input
                  id="endTime"
                  type="time"
                  placeholder="HH:MM"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-end">
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
              Atenção: Muitas horas extras
            </AlertDialogTitle>
            <AlertDialogDescription>
              Este registro contém <strong>{pendingEntry && formatHours(pendingEntry.hours)}</strong> de
              horas extras, o que excede o limite recomendado de 4 horas.
              <br />
              <br />
              Deseja confirmar este registro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelHighHours}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmHighHours}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
