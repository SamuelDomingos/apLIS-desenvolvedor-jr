import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function TableMedicos({
  loading,
  filteredMedicos,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation();
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('patients.table.id')}</TableHead>
              <TableHead>{t('patients.table.name')}</TableHead>
              <TableHead>CRM</TableHead>
              <TableHead>UF</TableHead>
              <TableHead className="text-right">{t('patients.table.actions')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  {t('common.loading')}
                </TableCell>
              </TableRow>
            ) : filteredMedicos.length > 0 ? (
              filteredMedicos.map((medico) => (
                <TableRow key={medico.id}>
                  <TableCell>{medico.id}</TableCell>
                  <TableCell>{medico.nome}</TableCell>
                  <TableCell>{medico.CRM}</TableCell>
                  <TableCell>{medico.UFCRM}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(medico)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t('doctors.edit')}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedMedico(medico);
                            setOpenDialog(true);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t('common.cancel')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  {t('common.no_results')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('common.cancel')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('common.no_results')} {t('common.cancel')} {t('common.cancel')}
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              médico <strong>{selectedMedico?.nome}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedMedico) {
                  onDelete(selectedMedico.id);
                  setOpenDialog(false);
                  setSelectedMedico(null);
                }
              }}
              variant="destructive"
            >
              {t('common.cancel')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
