# Sistema de Registro de Horas Extras

Sistema web para registro e controle de horas extras mensais, desenvolvido com Next.js 14, TypeScript, Tailwind CSS e Shadcn/ui.

## Funcionalidades

- ✅ Registro de horas extras por dia do mês
- ✅ Cálculo automático de horas (suporta eventos noturnos)
- ✅ Ordenação automática por data
- ✅ Validação de entrada de dados
- ✅ Alerta quando horas extras excedem 4h em um único dia
- ✅ Confirmação antes de remover registros
- ✅ Resumo com total de horas e média por dia
- ✅ Exportação para JSON (formato: ano_mes_nome.json)
- ✅ Importação de dados a partir de arquivo JSON
- ✅ Design moderno e responsivo
- ✅ Interface intuitiva e agradável

## Tecnologias Utilizadas

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn/ui** - Componentes UI modernos
- **Radix UI** - Primitivos de UI acessíveis
- **Lucide React** - Ícones modernos

## Estrutura do Projeto

```
registrar-hora-extra/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globais
├── components/
│   ├── ui/                 # Componentes base do Shadcn/ui
│   ├── Header.tsx          # Formulário de dados pessoais
│   ├── OvertimeForm.tsx    # Formulário de adicionar registro
│   ├── OvertimeList.tsx    # Lista de registros
│   ├── OvertimeItem.tsx    # Item individual da lista
│   ├── Summary.tsx         # Resumo de horas totais
│   └── FileActions.tsx     # Ações de salvar/carregar
├── types/
│   └── overtime.ts         # Tipos TypeScript
├── utils/
│   ├── calculations.ts     # Funções de cálculo
│   └── fileHandlers.ts     # Funções de arquivo
└── lib/
    └── utils.ts            # Utilitários gerais
```

## Como Usar

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Executar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
# Gerar build de produção
npm run build

# Executar build de produção
npm start
```

## Instruções de Uso

### 1. Preencher Dados Pessoais (Obrigatório)
- Nome
- CI/CPF
- Mês
- Ano

### 2. Adicionar Registros de Horas Extras
- **Dia**: 1-31
- **Hora Entrada**: Formato HH:MM
- **Hora Saída**: Formato HH:MM

**Importante**:
- O sistema calcula automaticamente a diferença entre hora de saída e entrada
- Para eventos noturnos (ex: 22:00 até 02:00), o sistema detecta automaticamente e calcula corretamente
- Se as horas extras excederem 4h em um único dia, aparecerá um alerta de confirmação

### 3. Visualizar Resumo
- Total de registros do mês
- Total de horas extras acumuladas
- Média de horas extras por dia

### 4. Gerenciar Registros
- Registros são ordenados automaticamente por dia
- Clique em "Remover" para excluir um registro (com confirmação)
- Não é possível adicionar dois registros para o mesmo dia

### 5. Exportar/Importar Dados

**Exportar (Salvar JSON)**:
- Preencha todos os campos obrigatórios (nome, CI/CPF, mês, ano)
- Clique em "Salvar JSON"
- O arquivo será baixado com nome: `ano_mes_nome.json`

**Importar (Carregar JSON)**:
- Clique em "Carregar JSON"
- Selecione um arquivo JSON previamente exportado
- Os dados serão carregados automaticamente

## Cálculo de Horas

O sistema calcula as horas extras da seguinte forma:

- **Evento diurno**: Se hora de saída > hora de entrada
  - Exemplo: 08:00 até 12:00 = 4 horas extras

- **Evento noturno**: Se hora de saída < hora de entrada (atravessa meia-noite)
  - Exemplo: 22:00 até 02:00 = 4 horas extras
  - O sistema adiciona 24h automaticamente ao cálculo

## Validações

- ✅ Nome, CI/CPF, mês e ano são obrigatórios para salvar
- ✅ Dia deve estar entre 1 e 31
- ✅ Formato de hora deve ser HH:MM
- ✅ Não permite registros duplicados no mesmo dia
- ✅ Alerta quando horas extras > 4h em um dia

## Autor

Desenvolvido com Next.js, TypeScript e boas práticas de desenvolvimento.

## Licença

ISC
