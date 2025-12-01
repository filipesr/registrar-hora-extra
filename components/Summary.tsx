'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OvertimeEntry } from '@/types/overtime';
import { calculateTotalHours, formatHours } from '@/utils/calculations';
import { Clock } from 'lucide-react';

interface SummaryProps {
  entries: OvertimeEntry[];
}

export function Summary({ entries }: SummaryProps) {
  const totalHours = calculateTotalHours(entries);

  return (
    <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Clock className="h-6 w-6" />
          Resumo do Mês
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total de Registros</div>
            <div className="text-3xl font-bold text-primary">{entries.length}</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total de Horas Extras</div>
            <div className="text-3xl font-bold text-primary">{formatHours(totalHours)}</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Média por Dia</div>
            <div className="text-3xl font-bold text-primary">
              {entries.length > 0 ? formatHours(totalHours / entries.length) : '00:00'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
