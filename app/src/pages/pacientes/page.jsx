import { Input } from "@/components/ui/input";
import DialogPaciente from "./components/dialogPaciente";
import { usePacientes } from "./hooks/usePacientes";
import TablePacientes from "./components/tablePacientes";
import { Search } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function PagePacientes() {
  const { t } = useTranslation();
  const {
    loading,
    loadPacientes,
    searchTerm,
    setSearchTerm,
    filteredPacientes,
    selectedPatient,
    setSelectedPatient,
    setIsDialogOpen,
    handleEdit,
    handleDelete,
    isDialogOpen,
  } = usePacientes();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('patients.title')}</h1>
        <DialogPaciente
          onRefresh={() => {
            loadPacientes();
            setIsDialogOpen(false);
          }}
          setSelectedPatient={setSelectedPatient}
          patient={selectedPatient}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>

      <div className="flex items-center gap-2 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('common.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 max-w-sm"
        />
      </div>

      <TablePacientes
        loading={loading}
        filteredPacientes={filteredPacientes}
        onEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
