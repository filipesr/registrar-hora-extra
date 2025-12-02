'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OvertimeEntry } from '@/types/overtime';
import { calculateTotalHours, formatHours } from '@/utils/calculations';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SummaryProps {
  entries: OvertimeEntry[];
}

export function Summary({ entries }: SummaryProps) {
  const { t } = useLanguage();
  const totalHours = calculateTotalHours(entries);

  return (
    <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Clock className="h-6 w-6" />
          {t('summary')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{t('totalRecords')}</div>
            <div className="text-3xl font-bold text-primary">{entries.length}</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{t('totalOvertime')}</div>
            <div className="text-3xl font-bold text-primary">{formatHours(totalHours)}</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{t('averagePerDay')}</div>
            <div className="text-3xl font-bold text-primary">
              {entries.length > 0 ? formatHours(totalHours / entries.length) : '00:00'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
