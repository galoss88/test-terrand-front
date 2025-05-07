export const getLocalStorage = <T>({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: T;
}): T | null => {
  try {
    const item = localStorage.getItem(name);

    if (item === null) {
      return defaultValue || null;
    }

    try {
      // Intentar parsear como JSON
      return JSON.parse(item) as T;
    } catch {
      // Si no es JSON válido, retornar como string
      return item as unknown as T;
    }
  } catch (error) {
    console.error(`Error leyendo de localStorage: ${error}`);
    return defaultValue || null;
  }
};
