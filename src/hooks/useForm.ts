import { ChangeEvent, useState } from "react";

// Usamos unknown en lugar de any
interface IUseFormProps<T extends Record<string, unknown>> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validate,
}: IUseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // if (validate) {
    //   const validationErrors = validate({ ...values, [name]: value });
    //   setErrors(validationErrors);
    // }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSubmit = (onSubmit: (values: T) => void) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (validate) {
          const validationErrors = validate(values);
          setErrors(validationErrors);

          // Si no hay errores, enviar
          if (Object.keys(validationErrors).length === 0) {
            onSubmit(values);
          }
        } else {
          onSubmit(values);
        }
      } catch {
        console.error("Falló submit");
      }
    };
  };

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    isValid,
    setValues,
  };
};
