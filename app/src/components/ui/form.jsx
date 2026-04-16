import { useController } from "react-hook-form";

export const Form = ({ children }) => {
  return <>{children}</>;
};

export const FormItem = ({ children, className }) => (
  <div className={`space-y-2 ${className}`}>{children}</div>
);

export const FormLabel = ({ children, className }) => (
  <label className={`text-sm font-medium ${className}`}>{children}</label>
);

export const FormControl = ({ children }) => <div>{children}</div>;

export const FormMessage = ({ children, className }) => (
  <p className={`text-xs text-red-500 ${className}`}>{children}</p>
);

export const FormField = ({ control, name, render }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });
  return (
    <FormItem>
      {render({ field })}
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};
