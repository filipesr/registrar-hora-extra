'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { calculateOvertimeHours, exceedsHourLimit, formatHours } from '@/utils/calculations';
import { Plus, AlertTriangle, Calendar } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '@/contexts/LanguageContext';

interface OvertimeFormProps {
  onAdd: (entry: OvertimeEntry) => void;
  existingDates: string[];
}

// Gerar arrays de horas e minutos
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

export function OvertimeForm({ onAdd, existingDates }: OvertimeFormProps) {
  const { t } = useLanguage();
  const [date, setDate] = useState('');
  const [startHour, setStartHour] = useState('00');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('00');
  const [endMinute, setEndMinute] = useState('00');
  const [description, setDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [pendingEntry, setPendingEntry] = useState<OvertimeEntry | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!date) {
      setError(t('selectDate'));
      return;
    }

    if (!startHour || !startMinute) {
      setError(t('selectEntryTime'));
      return;
    }

    if (!endHour || !endMinute) {
      setError(t('selectExitTime'));
      return;
    }

    if (!description.trim()) {
      setError(t('taskDescriptionRequired'));
      return;
    }

    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;
    const overtimeHours = calculateOvertimeHours(startTime, endTime);

    const entry: OvertimeEntry = {
      id: uuidv4(),
      date,
      startTime,
      endTime,
      hours: overtimeHours,
      description: description.trim(),
    };

    // Verifica se é data duplicada
    if (existingDates.includes(date)) {
      setPendingEntry(entry);
      setShowDuplicateAlert(true);
      return;
    }

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
    // setDate('');
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

  const handleConfirmDuplicate = () => {
    if (pendingEntry) {
      // Se também excede 4 horas, mostra o alerta de high hours
      if (exceedsHourLimit(pendingEntry.hours)) {
        setShowDuplicateAlert(false);
        setShowAlert(true);
      } else {
        addEntry(pendingEntry);
        setShowDuplicateAlert(false);
      }
    }
  };

  const handleCancelDuplicate = () => {
    setPendingEntry(null);
    setShowDuplicateAlert(false);
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {t('addRecord')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  {t('date')}
                </label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium">
                  {t('entryTime')}
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
                  {t('exitTime')}
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
                  {t('add')}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                {t('taskDescription')} <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="description"
                placeholder={t('describeTask')}
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
              {t('attentionHighHours')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('recordContains')} <strong>{pendingEntry && formatHours(pendingEntry.hours)}</strong> {t('ofOvertime')}
              <br />
              <br />
              {t('confirmRecord')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelHighHours}>
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmHighHours}>
              {t('confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDuplicateAlert} onOpenChange={setShowDuplicateAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-blue-600">
              <Calendar className="h-5 w-5" />
              {t('duplicateDateTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('duplicateDateWarning')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDuplicate}>
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDuplicate}>
              {t('confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
