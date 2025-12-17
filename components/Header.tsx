'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/types/overtime';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/utils/translations';
import { HelpModal } from '@/components/HelpModal';

interface HeaderProps {
  formData: FormData;
  onChange: (data: FormData) => void;
}

export function Header({ formData, onChange }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold text-primary">
            {t('overtimeRegistration')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <label htmlFor="language" className="text-sm font-medium">
              {t('language')}:
            </label>
            <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
              <SelectTrigger id="language" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
            <HelpModal />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t('name')} <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              placeholder={t('name')}
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cpf" className="text-sm font-medium">
              {t('cpf')} <span className="text-destructive">*</span>
            </label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => onChange({ ...formData, cpf: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
