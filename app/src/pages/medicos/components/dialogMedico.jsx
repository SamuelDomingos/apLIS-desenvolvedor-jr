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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BRAZIL_STATES } from "@/lib/constants";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useFormMedico } from "../hooks/useFormMedico";
import { UserRoundPlus } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function DialogMedico({
  onRefresh,
  doctor,
  setSelectedDoctor,
  open,
  onOpenChange,
}) {
  const { t } = useTranslation();
  const { form, onSubmit, isSubmitting } = useFormMedico({ doctor });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              setSelectedDoctor(null);
              onOpenChange(true);
            }}
          >
            <UserRoundPlus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('doctors.create')}</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {doctor ? t('doctors.edit') : t('doctors.create')}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                onSubmit(data, onRefresh, doctor?.id),
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
                      <Input placeholder={t('patients.placeholder_name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="CRM"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CRM</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="UFCRM"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UF CRM</FormLabel>
                      <FormControl>
                        <Combobox
                          items={BRAZIL_STATES}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <ComboboxInput placeholder={t('common.search')} />
                          <ComboboxContent>
                            <ComboboxEmpty>
                              {t('common.no_results')}
                            </ComboboxEmpty>
                            <ComboboxList>
                              {(state) => (
                                <ComboboxItem
                                  key={state.value}
                                  value={state.value}
                                >
                                  {state.label} ({state.value})
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
