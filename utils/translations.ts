export type Language = 'pt' | 'es';

export const translations = {
  pt: {
    // Header
    overtimeRegistration: 'Registro de Horas Extras',
    name: 'Nome',
    cpf: 'CI/CPF',
    language: 'Idioma',

    // OvertimeForm
    addRecord: 'Adicionar Registro',
    date: 'Data',
    entryTime: 'Hora Início',
    exitTime: 'Hora Fim',
    taskDescription: 'Descrição da Tarefa',
    add: 'Adicionar',
    selectDate: 'Selecione a data',
    selectEntryTime: 'Selecione hora e minuto de início',
    selectExitTime: 'Selecione hora e minuto de fim',
    taskDescriptionRequired: 'Descrição da tarefa é obrigatória',
    recordExists: 'Já existe um registro para esta data',
    describeTask: 'Descreva a tarefa realizada durante as horas extras...',

    // Alert Dialog (High Hours)
    attentionHighHours: 'Atenção: Muitas horas extras',
    recordContains: 'Este registro contém',
    ofOvertime: 'de horas extras, o que excede o limite recomendado de 4 horas.',
    confirmRecord: 'Deseja confirmar este registro?',
    cancel: 'Cancelar',
    confirm: 'Confirmar',

    // OvertimeList
    records: 'Registros',
    clearList: 'Limpar lista',
    noRecordsYet: 'Nenhum registro adicionado ainda',
    entry: 'Início',
    exit: 'Fim',
    extras: 'Extras',
    task: 'Tarefa',
    actions: 'Ações',

    // OvertimeItem
    confirmRemoval: 'Confirmar remoção',
    sureToRemove: 'Tem certeza que deseja remover o registro do dia',
    cannotBeUndone: 'Esta ação não pode ser desfeita.',
    remove: 'Remover',

    // Clear All Dialog
    confirmRemoveAll: 'Confirmar remoção de todos os registros',
    sureToRemoveAll: 'Tem certeza que deseja remover',
    allRecords: 'TODOS os',
    recordsPlural: 'registros',
    personalDataKept: 'Os dados pessoais (nome e CI/CPF) serão mantidos.',
    removeAll: 'Remover Todos',

    // Summary
    summary: 'Resumo',
    totalRecords: 'Total de Registros',
    totalOvertime: 'Total de Horas Extras',
    averagePerDay: 'Média por Dia',

    // FileActions
    exportToSend: 'Exportar Para Enviar',
    fillRequiredFields: 'Preencha nome e CI/CPF e adicione pelo menos um registro para exportar o arquivo',
    fileExportedSuccess: 'Arquivo exportado com sucesso!',
    exportError: 'Erro ao exportar arquivo',

    // Footer
    systemCopyright: 'Sistema de Registro de Horas Extras ©',

    // Days of week
    sun: 'dom',
    mon: 'seg',
    tue: 'ter',
    wed: 'qua',
    thu: 'qui',
    fri: 'sex',
    sat: 'sab',
  },
  es: {
    // Header
    overtimeRegistration: 'Registro de Horas Extras',
    name: 'Nombre',
    cpf: 'CI/CPF',
    language: 'Idioma',

    // OvertimeForm
    addRecord: 'Agregar Registro',
    date: 'Fecha',
    entryTime: 'Hora Inicio',
    exitTime: 'Hora Fin',
    taskDescription: 'Descripción de la Tarea',
    add: 'Agregar',
    selectDate: 'Seleccione la fecha',
    selectEntryTime: 'Seleccione hora y minuto de inicio',
    selectExitTime: 'Seleccione hora y minuto de fin',
    taskDescriptionRequired: 'Descripción de la tarea es obligatoria',
    recordExists: 'Ya existe un registro para esta fecha',
    describeTask: 'Describa la tarea realizada durante las horas extras...',

    // Alert Dialog (High Hours)
    attentionHighHours: 'Atención: Muchas horas extras',
    recordContains: 'Este registro contiene',
    ofOvertime: 'de horas extras, lo que excede el límite recomendado de 4 horas.',
    confirmRecord: '¿Desea confirmar este registro?',
    cancel: 'Cancelar',
    confirm: 'Confirmar',

    // OvertimeList
    records: 'Registros',
    clearList: 'Limpiar lista',
    noRecordsYet: 'Ningún registro agregado todavía',
    entry: 'Inicio',
    exit: 'Fin',
    extras: 'Extras',
    task: 'Tarea',
    actions: 'Acciones',

    // OvertimeItem
    confirmRemoval: 'Confirmar eliminación',
    sureToRemove: '¿Está seguro de que desea eliminar el registro del día',
    cannotBeUndone: 'Esta acción no se puede deshacer.',
    remove: 'Eliminar',

    // Clear All Dialog
    confirmRemoveAll: 'Confirmar eliminación de todos los registros',
    sureToRemoveAll: '¿Está seguro de que desea eliminar',
    allRecords: 'TODOS los',
    recordsPlural: 'registros',
    personalDataKept: 'Los datos personales (nombre y CI/CPF) se mantendrán.',
    removeAll: 'Eliminar Todos',

    // Summary
    summary: 'Resumen',
    totalRecords: 'Total de Registros',
    totalOvertime: 'Total de Horas Extras',
    averagePerDay: 'Promedio por Día',

    // FileActions
    exportToSend: 'Exportar Para Enviar',
    fillRequiredFields: 'Complete nombre y CI/CPF y agregue al menos un registro para exportar el archivo',
    fileExportedSuccess: '¡Archivo exportado con éxito!',
    exportError: 'Error al exportar archivo',

    // Footer
    systemCopyright: 'Sistema de Registro de Horas Extras ©',

    // Days of week
    sun: 'dom',
    mon: 'lun',
    tue: 'mar',
    wed: 'mié',
    thu: 'jue',
    fri: 'vie',
    sat: 'sáb',
  },
};

export type TranslationKey = keyof typeof translations.pt;
