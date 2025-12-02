'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OvertimeData } from '@/types/overtime';
import { exportToJson } from '@/utils/fileHandlers';
import { Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FileActionsProps {
  data: OvertimeData;
}

export function FileActions({ data }: FileActionsProps) {
  const { t } = useLanguage();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleExport = () => {
    setError('');
    setSuccess('');

    // Validar campos obrigatórios
    if (!data.name || !data.cpf || data.entries.length === 0) {
      setError(t('fillRequiredFields'));
      return;
    }

    try {
      exportToJson(data);
      setSuccess(t('fileExportedSuccess'));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t('exportError'));
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Button
          onClick={handleExport}
          className="w-full"
          variant="default"
          disabled={!data.name || !data.cpf || data.entries.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          {t('exportToSend')}
        </Button>

        {error && (
          <div className="mt-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 text-sm text-green-600 bg-green-50 dark:bg-green-950 p-3 rounded-md">
            {success}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
