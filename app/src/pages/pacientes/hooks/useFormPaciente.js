import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientService } from "@/lib/api/patients/patientService";
import { patientSchema } from "../schema/pacienteSchema";

export function useFormPaciente({ patient }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      nome: "",
      dataNascimento: "",
      carteirinha: "",
      cpf: "",
    },
  });

  useEffect(() => {
    if (patient) {
      form.reset({
        nome: patient.nome || "",
        dataNascimento: patient.dataNascimento || "",
        carteirinha: patient.carteirinha || "",
        cpf: patient.cpf || "",
      });
    } else {
      form.reset({
        nome: "",
        dataNascimento: "",
        carteirinha: "",
        cpf: "",
      });
    }
  }, [patient, form]);

  async function onSubmit(data, onSuccess, patientId = null) {
    setIsSubmitting(true);
    try {
      if (patientId) {
        await patientService.update(patientId, data);
      } else {
        await patientService.create(data);
      }
      if (onSuccess) onSuccess();
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting,
  };
}
