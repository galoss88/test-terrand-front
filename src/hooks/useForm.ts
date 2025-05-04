import { ChangeEvent, useState } from "react";

// Usamos unknown en lugar de any
interface IUseFormProps<T extends Record<string, any>> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
}: IUseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const field = prev[name as keyof T];
      const isArr = Array.isArray(field);
      let updatedField: unknown;

      if (isArr) {
        const arr = field as unknown[];

        if (index !== undefined) {
          // Reemplazar el elemento en la posición `index`
          updatedField = arr.map((item, i) => (i === index ? value : item));
        } else {
          // Añadir un nuevo elemento al final
          updatedField = [...arr, value];
        }
      } else {
        // No es array: simple override
        updatedField = value;
      }

      return {
        ...prev,
        [name]: updatedField,
      };
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
  //Solo va servir para las propiedades que tengan de valor un array
  const deleteData = (property: string, indexToDelete: number) => {
    setValues((prev) => {
      const field = prev[property as keyof T];
      const isArr = Array.isArray(field);
      let updatedField: unknown;

      if (isArr) {
        const arr = field as unknown[];

        if (indexToDelete !== undefined) {
          // Reemplazar el elemento en la posición `index`
          updatedField = arr.filter((_, i) => i !== indexToDelete);
        }
      }

      return {
        ...prev,
        [property]: updatedField,
      };
    });
  };

  //ingredientes
  const addItem = (property: keyof typeof values) => {
    setValues((prev) => ({
      ...prev,
      [property]: Array.isArray(prev[property])
        ? [...(prev[property] as string[]), "new"]
        : ["new"],
    }));
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
    deleteData,
    addItem,
  };
};
