'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { OvertimeForm } from '@/components/OvertimeForm';
import { OvertimeList } from '@/components/OvertimeList';
import { Summary } from '@/components/Summary';
import { FileActions } from '@/components/FileActions';
import { OvertimeData, OvertimeEntry, FormData } from '@/types/overtime';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '',
    month: currentMonth,
    year: currentYear,
  });

  // Carregar nome e CPF do localStorage ao montar o componente
  useEffect(() => {
    const savedName = localStorage.getItem('overtime_name');
    const savedCpf = localStorage.getItem('overtime_cpf');

    if (savedName || savedCpf) {
      setFormData((prev) => ({
        ...prev,
        name: savedName || '',
        cpf: savedCpf || '',
      }));
    }
  }, []);

  // Salvar nome e CPF no localStorage quando forem alterados
  useEffect(() => {
    if (formData.name) {
      localStorage.setItem('overtime_name', formData.name);
    }
    if (formData.cpf) {
      localStorage.setItem('overtime_cpf', formData.cpf);
    }
  }, [formData.name, formData.cpf]);

  const [entries, setEntries] = useState<OvertimeEntry[]>([]);

  // Carregar registros do localStorage ao montar o componente
  useEffect(() => {
    const savedEntries = localStorage.getItem('overtime_entries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        setEntries(parsedEntries);
      } catch (err) {
        console.error('Erro ao carregar registros do localStorage:', err);
      }
    }
  }, []);

  // Salvar registros no localStorage quando forem alterados
  useEffect(() => {
    localStorage.setItem('overtime_entries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entry: OvertimeEntry) => {
    setEntries([...entries, entry]);
  };

  const handleRemoveEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleClearAll = () => {
    setEntries([]);
    localStorage.removeItem('overtime_entries');
  };

  const overtimeData: OvertimeData = {
    ...formData,
    entries,
  };

  const existingDays = entries.map((entry) => entry.day);

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <Header formData={formData} onChange={setFormData} />

      <OvertimeForm onAdd={handleAddEntry} existingDays={existingDays} />

      <Summary entries={entries} />

      <OvertimeList entries={entries} month={formData.month} year={formData.year} onRemove={handleRemoveEntry} />

      <FileActions data={overtimeData} onClearAll={handleClearAll} />

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Sistema de Registro de Horas Extras © {currentYear}</p>
      </footer>
    </main>
  );
}
