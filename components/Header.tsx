'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/types/overtime';

interface HeaderProps {
  formData: FormData;
  onChange: (data: FormData) => void;
}

const MONTHS = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

export function Header({ formData, onChange }: HeaderProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">
          Registro de Horas Extras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          <div className="space-y-2">
            <label htmlFor="month" className="text-sm font-medium">
              Mês <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.month.toString()}
              onValueChange={(value) =>
                onChange({ ...formData, month: parseInt(value) })
              }
            >
              <SelectTrigger id="month">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-medium">
              Ano <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.year.toString()}
              onValueChange={(value) =>
                onChange({ ...formData, year: parseInt(value) })
              }
            >
              <SelectTrigger id="year">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
