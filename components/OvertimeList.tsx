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
import { useLanguage } from '@/contexts/LanguageContext';

interface OvertimeListProps {
  entries: OvertimeEntry[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function OvertimeList({ entries, onRemove, onClearAll }: OvertimeListProps) {
  const { t } = useLanguage();
  const sortedEntries = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
              {t('records')}
            </CardTitle>
            {entries.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t('clearList')}
              </Button>
            )}
          </div>
        </CardHeader>
      <CardContent>
        {sortedEntries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {t('noRecordsYet')}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="hidden md:grid grid-cols-10 gap-4 pb-2 border-b font-medium text-sm text-muted-foreground">
              <div className='col-span-2'>{t('date')}</div>
              <div>{t('entry')}</div>
              <div>{t('exit')}</div>
              <div>{t('extras')}</div>
              <div className='col-span-4'>{t('task')}</div>
              <div className="text-right">{t('actions')}</div>
            </div>
            {sortedEntries.map((entry) => (
              <OvertimeItem key={entry.id} entry={entry} onRemove={onRemove} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>

    <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('confirmRemoveAll')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('sureToRemoveAll')} <strong>{t('allRecords')} {entries.length} {t('recordsPlural')}</strong>?
            <br />
            <br />
            {t('personalDataKept')}
            <br />
            <br />
            <strong className="text-destructive">{t('cannotBeUndone')}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleClearAll} className="bg-destructive hover:bg-destructive/90">
            {t('removeAll')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
  );
}
