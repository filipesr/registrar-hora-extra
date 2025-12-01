'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

// Gerar arrays de horas e minutos
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

export function OvertimeForm({ onAdd, existingDays }: OvertimeFormProps) {
  const [day, setDay] = useState('1');
  const [startHour, setStartHour] = useState('00');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('00');
  const [endMinute, setEndMinute] = useState('00');
  const [description, setDescription] = useState('');
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

    if (!startHour || !startMinute) {
      setError('Selecione hora e minuto de entrada');
      return;
    }

    if (!endHour || !endMinute) {
      setError('Selecione hora e minuto de saída');
      return;
    }

    if (!description.trim()) {
      setError('Descrição da tarefa é obrigatória');
      return;
    }

    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;
    const overtimeHours = calculateOvertimeHours(startTime, endTime);

    const entry: OvertimeEntry = {
      id: uuidv4(),
      day: dayNum,
      startTime,
      endTime,
      hours: overtimeHours,
      description: description.trim(),
    };

    // Verifica se excede 4 horas
    if (exceedsHourLimit(overtimeHours)) {
      setPendingEntry(entry);
      setShowAlert(true);
    } else {
      addEntry(entry);
    }
  };

  const addEntry = (entry: OvertimeEntry) => {
    onAdd(entry);
    // setDay('');
    // setStartHour('');
    // setStartMinute('');
    // setEndHour('');
    // setEndMinute('');
    // setDescription('');
    // setPendingEntry(null);
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
                <Select value={day} onValueChange={setDay} required>
                  <SelectTrigger id="day" className="h-12 text-base">
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <SelectItem key={d} value={d.toString()}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium">
                  Hora Entrada
                </label>
                <div className="flex gap-2">
                  <Select value={startHour} onValueChange={setStartHour} required>
                    <SelectTrigger id="startTime" className="h-12 text-base">
                      <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={startMinute} onValueChange={setStartMinute} required>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium">
                  Hora Saída
                </label>
                <div className="flex gap-2">
                  <Select value={endHour} onValueChange={setEndHour} required>
                    <SelectTrigger id="endTime" className="h-12 text-base">
                      <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={endMinute} onValueChange={setEndMinute} required>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-end">
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descrição da Tarefa <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="description"
                placeholder="Descreva a tarefa realizada durante as horas extras..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
              />
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
