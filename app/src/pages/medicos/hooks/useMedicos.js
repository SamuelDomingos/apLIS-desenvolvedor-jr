import { useState, useEffect } from "react";
import { doctorService } from "@/lib/api/doctors/doctorService";

export function useMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadMedicos();
  }, []);

  async function loadMedicos() {
    try {
      setLoading(true);
      const data = await doctorService.getAll();
      setMedicos(data);
    } catch (error) {
      console.error("Erro ao carregar médicos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await doctorService.delete(id);
      await loadMedicos();
    } catch (error) {
      console.error("Erro ao deletar médico:", error);
    }
  }

  function handleEdit(doctor) {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  }

  const filteredMedicos = Array.isArray(medicos)
    ? medicos.filter(
        (m) =>
          m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.CRM.includes(searchTerm),
      )
    : [];

  return {
    medicos,
    loading,
    loadMedicos,
    searchTerm,
    setSearchTerm,
    filteredMedicos,
    selectedDoctor,
    setSelectedDoctor,
    isDialogOpen,
    setIsDialogOpen,
    handleEdit,
    handleDelete,
  };
}
