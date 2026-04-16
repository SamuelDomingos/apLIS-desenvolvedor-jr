import React, { useState } from "react";
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

export default function TablePacientes({
  loading,
  filteredPacientes,
  onEdit,
  handleDelete,
}) {
  const { t } = useTranslation();
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('patients.table.id')}</TableHead>
            <TableHead>{t('patients.table.name')}</TableHead>
            <TableHead>{t('patients.table.card')}</TableHead>
            <TableHead>{t('patients.table.cpf')}</TableHead>
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
          ) : filteredPacientes.length > 0 ? (
            filteredPacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell>{paciente.id}</TableCell>
                <TableCell>{paciente.nome}</TableCell>
                <TableCell>{paciente.carteirinha}</TableCell>
                <TableCell>{paciente.cpf}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onEdit(paciente)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        {t('patients.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setPatientToDelete(paciente);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="text-destructive cursor-pointer"
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

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('common.cancel')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('common.no_results')} {t('common.cancel')}
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              paciente {patientToDelete?.nome} do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (patientToDelete) {
                  handleDelete(patientToDelete.id);
                  setIsDeleteDialogOpen(false);
                  setPatientToDelete(null);
                }
              }}
              variant="destructive"
            >
              {t('common.cancel')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
