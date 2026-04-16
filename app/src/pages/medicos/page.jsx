import { Input } from "@/components/ui/input";
import DialogMedico from "./components/dialogMedico";
import { useMedicos } from "./hooks/useMedicos";
import TableMedicos from "./components/tableMedicos";
import { Search } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function PageMedicos() {
  const { t } = useTranslation();
  const {
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
  } = useMedicos();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('doctors.title')}</h1>
        <DialogMedico
          onRefresh={() => {
            loadMedicos();
            setIsDialogOpen(false);
          }}
          setSelectedDoctor={setSelectedDoctor}
          doctor={selectedDoctor}
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

      <TableMedicos
        loading={loading}
        filteredMedicos={filteredMedicos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
