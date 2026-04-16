import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      common: {
        save: "Salvar",
        cancel: "Cancelar",
        search: "Pesquisar...",
        loading: "Carregando...",
        no_results: "Nenhum resultado encontrado",
        confirm: "Você tem certeza?",
        delete_warning: "Esta ação não pode ser desfeita. Isso excluirá permanentemente o registro do sistema.",
        delete_btn: "Excluir",
      },
      errors: {
        required: "Este campo é obrigatório",
        min_length_3: "Deve ter pelo menos 3 caracteres",
        min_length_11: "Deve ter pelo menos 11 caracteres",
        length_2: "Deve ter exatamente 2 caracteres",
      },
      patients: {
        title: "Pacientes",
        create: "Cadastrar Novo Paciente",
        edit: "Editar",
        placeholder_name: "Nome completo",
        placeholder_cpf: "000.000.000-00",
        table: {
          id: "ID",
          name: "Nome",
          card: "Carteirinha",
          cpf: "CPF",
          actions: "Ações"
        }
      },
      doctors: {
        title: "Médicos",
        create: "Cadastrar Novo Médico",
        edit: "Editar",
        placeholder_crm: "Ex: 123456",
        table: {
          id: "ID",
          name: "Nome",
          crm: "CRM",
          uf: "UF",
          actions: "Ações"
        }
      }
    }
  },
  en: {
    translation: {
      common: {
        save: "Save",
        cancel: "Cancel",
        search: "Search...",
        loading: "Loading...",
        no_results: "No results found",
        confirm: "Are you sure?",
        delete_warning: "This action cannot be undone. This will permanently delete the record from the system.",
        delete_btn: "Delete",
      },
      errors: {
        required: "This field is required",
        min_length_3: "Must be at least 3 characters",
        min_length_11: "Must be at least 11 characters",
        length_2: "Must be exactly 2 characters",
      },
      patients: {
        title: "Patients",
        create: "Register New Patient",
        edit: "Edit Patient",
        placeholder_name: "Full name",
        placeholder_cpf: "000.000.000-00",
        table: {
          id: "ID",
          name: "Name",
          card: "Card Number",
          cpf: "CPF",
          actions: "Actions"
        }
      },
      doctors: {
        title: "Doctors",
        create: "Register New Doctor",
        edit: "Edit Doctor",
        placeholder_crm: "Ex: 123456",
        table: {
          id: "ID",
          name: "Name",
          crm: "CRM",
          uf: "State",
          actions: "Actions"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
