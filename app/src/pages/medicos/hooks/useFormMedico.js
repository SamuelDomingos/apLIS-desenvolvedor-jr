import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorService } from "@/lib/api/doctors/doctorService";
import { doctorSchema } from "../schema/medicoSchema";

export function useFormMedico({ doctor }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      nome: "",
      CRM: "",
      UFCRM: "",
    },
  });

  async function onSubmit(data, onSuccess, doctorId = null) {
    setIsSubmitting(true);
    try {
      if (doctorId) {
        await doctorService.update(doctorId, data);
      } else {
        await doctorService.create(data);
      }
      if (onSuccess) onSuccess();
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar médico:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (doctor) {
      form.reset({
        nome: doctor.nome,
        CRM: doctor.CRM,
        UFCRM: doctor.UFCRM,
      });
    } else {
      form.reset({
        nome: "",
        CRM: "",
        UFCRM: "",
      });
    }
  }, [doctor, form]);

  return {
    form,
    reset: form.reset,
    onSubmit,
    isSubmitting,
  };
}
