import { useState, useEffect } from "react";
import { patientService } from "@/lib/api/patients/patientService";

export function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadPacientes();
  }, []);

  async function loadPacientes() {
    try {
      setLoading(true);
      const data = await patientService.getAll();
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await patientService.delete(id);
      await loadPacientes();
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
    }
  }

  function handleEdit(patient) {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  }

  const filteredPacientes = pacientes.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cpf.includes(searchTerm) ||
      p.carteirinha.includes(searchTerm),
  );

  return {
    pacientes,
    loading,
    loadPacientes,
    searchTerm,
    setSearchTerm,
    filteredPacientes,
    selectedPatient,
    setSelectedPatient,
    isDialogOpen,
    setIsDialogOpen,
    handleEdit,
    handleDelete,
  };
}
