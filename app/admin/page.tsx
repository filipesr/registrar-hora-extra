'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OvertimeData, OvertimeEntry } from '@/types/overtime';
import { calculateOvertimeHours, formatHours, getDayOfWeek } from '@/utils/calculations';
import { Upload, Edit, Printer, Save, Trash2, X, Download } from 'lucide-react';

export default function AdminPage() {
  const [data, setData] = useState<OvertimeData | null>(null);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text) as OvertimeData;
      setData(jsonData);
      setEditingRowIndex(null);
      setHasChanges(false);
    } catch (error) {
      alert('Erro ao carregar arquivo. Verifique se é um JSON válido.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleRowEdit = (index: number) => {
    setEditingRowIndex(editingRowIndex === index ? null : index);
  };

  const deleteEntry = (index: number) => {
    if (!data) return;
    if (!confirm('Tem certeza que deseja excluir este registro?')) return;

    const updatedEntries = data.entries.filter((_, i) => i !== index);
    setData({ ...data, entries: updatedEntries });
    setEditingRowIndex(null);
    setHasChanges(true);
  };

  const updateMonth = (month: string) => {
    if (!data) return;
    setData({ ...data, month: parseInt(month) });
    setHasChanges(true);
  };

  const updateYear = (year: string) => {
    if (!data) return;
    setData({ ...data, year: parseInt(year) });
    setHasChanges(true);
  };

  const updateEntry = (index: number, field: keyof OvertimeEntry, value: string | number) => {
    if (!data) return;

    const updatedEntries = [...data.entries];
    const entry = { ...updatedEntries[index] };

    if (field === 'day') {
      entry.day = parseInt(value as string);
    } else if (field === 'startTime' || field === 'endTime') {
      entry[field] = value as string;
      // Recalculate hours when time changes
      entry.hours = calculateOvertimeHours(entry.startTime, entry.endTime);
    } else if (field === 'description') {
      entry.description = value as string;
    }

    updatedEntries[index] = entry;
    setData({ ...data, entries: updatedEntries });
    setHasChanges(true);
  };

  const handleSaveAdjustedJSON = () => {
    if (!data) return;

    // Sanitize name for filename
    const sanitizedName = data.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_');

    const monthStr = String(data.month).padStart(2, '0');
    const filename = `${data.year}_${monthStr}_${sanitizedName}_ajustado.json`;

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setHasChanges(false);
  };

  const totalHours = data?.entries.reduce((sum, entry) => sum + entry.hours, 0) || 0;
  const averageHours = data?.entries.length ? totalHours / data.entries.length : 0;

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Carregar Registros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4 py-8">
                <p className="text-muted-foreground text-center">
                  Selecione um arquivo JSON com os registros de horas extras para visualizar e editar.
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json"
                  className="hidden"
                />
                <Button onClick={() => fileInputRef.current?.click()} size="lg">
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar Arquivo JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 print:bg-white">
        <div className="max-w-7xl mx-auto pt-4">
          <div className="no-print mb-4 flex gap-2 justify-end">
            <Button onClick={() => fileInputRef.current?.click()} variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Carregar Outro Arquivo
            </Button>
            {hasChanges && (
              <Button onClick={handleSaveAdjustedJSON} variant="default">
                <Download className="h-4 w-4 mr-2" />
                Salvar JSON
              </Button>
            )}
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          <Card className="print:shadow-none print:border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Relatório de Horas Extras</CardTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <div>
                  <span className="font-semibold">Nome:</span> {data.name}
                </div>
                <div>
                  <span className="font-semibold">CPF:</span> {data.cpf}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Mês:</span>
                  <Input
                    type="number"
                    value={data.month}
                    onChange={(e) => updateMonth(e.target.value)}
                    className="w-16 h-8 print:border-0 print:bg-transparent print:p-0"
                    min={1}
                    max={12}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Ano:</span>
                  <Input
                    type="number"
                    value={data.year}
                    onChange={(e) => updateYear(e.target.value)}
                    className="w-20 h-8 print:border-0 print:bg-transparent print:p-0"
                    min={2000}
                    max={2100}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-primary">
                      <th className="text-left p-2">Dia</th>
                      <th className="text-left p-2">Dia Semana</th>
                      <th className="text-left p-2">Entrada</th>
                      <th className="text-left p-2">Saída</th>
                      <th className="text-left p-2">Horas</th>
                      <th className="text-left p-2">Descrição</th>
                      <th className="text-left p-2 no-print">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.entries.map((entry, index) => {
                      const dayOfWeek = getDayOfWeek(entry.day, data.month, data.year);
                      const isEditingRow = editingRowIndex === index;
                      return (
                        <tr key={entry.id} className="border-b border-muted">
                          <td className="p-2">{entry.day}</td>
                          <td className="p-2">{dayOfWeek}</td>
                          <td className="p-2">
                            {isEditingRow ? (
                              <Input
                                type="time"
                                value={entry.startTime}
                                onChange={(e) => updateEntry(index, 'startTime', e.target.value)}
                                className="w-24"
                              />
                            ) : (
                              entry.startTime
                            )}
                          </td>
                          <td className="p-2">
                            {isEditingRow ? (
                              <Input
                                type="time"
                                value={entry.endTime}
                                onChange={(e) => updateEntry(index, 'endTime', e.target.value)}
                                className="w-24"
                              />
                            ) : (
                              entry.endTime
                            )}
                          </td>
                          <td className="p-2 font-semibold">{formatHours(entry.hours)}</td>
                          <td className="p-2">
                            {isEditingRow ? (
                              <Textarea
                                value={entry.description}
                                onChange={(e) => updateEntry(index, 'description', e.target.value)}
                                rows={2}
                                className="min-w-[300px]"
                              />
                            ) : (
                              <span className="text-sm">{entry.description}</span>
                            )}
                          </td>
                          <td className="p-2 no-print">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant={isEditingRow ? "default" : "outline"}
                                onClick={() => toggleRowEdit(index)}
                              >
                                {isEditingRow ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteEntry(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-primary font-semibold bg-muted/30">
                      <td colSpan={4} className="p-2 text-right">Total:</td>
                      <td className="p-2">{formatHours(totalHours)}</td>
                      <td className="p-2 text-sm" colSpan={2}>Média: {formatHours(averageHours)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          @page {
            margin: 1cm;
          }
        }
      `}</style>
    </>
  );
}
