'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OvertimeEntry } from '@/types/overtime';
import { OvertimeItem } from './OvertimeItem';
import { List } from 'lucide-react';

interface OvertimeListProps {
  entries: OvertimeEntry[];
  onRemove: (id: string) => void;
}

export function OvertimeList({ entries, onRemove }: OvertimeListProps) {
  const sortedEntries = [...entries].sort((a, b) => a.day - b.day);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          Registros do Mês ({entries.length})
        </CardTitle>
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
              <OvertimeItem key={entry.id} entry={entry} onRemove={onRemove} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
