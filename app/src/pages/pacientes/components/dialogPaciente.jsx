import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormPaciente } from "../hooks/useFormPaciente";
import { UserRoundPlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCPF } from "@/lib/utils";
import { DatePickerSimple } from "@/components/ui/datePicker";
import { useTranslation } from 'react-i18next';

export default function DialogPaciente({
  onRefresh,
  patient,
  setSelectedPatient,
  open,
  onOpenChange,
}) {
  const { t } = useTranslation();
  const { form, onSubmit, isSubmitting } = useFormPaciente({ patient });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              setSelectedPatient(null);
              onOpenChange(true);
            }}
          >
            <UserRoundPlus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('patients.create')}</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {patient ? t('patients.edit') : t('patients.create')}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                onSubmit(data, onRefresh, patient?.id),
              )}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('patients.placeholder_name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('patients.placeholder_name')}
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Nascimento</FormLabel>
                      <DatePickerSimple
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carteirinha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carteirinha</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.replace(/\D/g, '')
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('patients.placeholder_cpf')}
                        {...field}
                        value={formatCPF(field.value || "")}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, "");
                          field.onChange(rawValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t('common.loading') : t('common.save')}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
