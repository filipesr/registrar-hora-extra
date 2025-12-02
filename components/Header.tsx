'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormData } from '@/types/overtime';

interface HeaderProps {
  formData: FormData;
  onChange: (data: FormData) => void;
}

export function Header({ formData, onChange }: HeaderProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">
          Registro de Horas Extras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nome <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cpf" className="text-sm font-medium">
              CI/CPF <span className="text-destructive">*</span>
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
