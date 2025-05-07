export const setLocalStorage = ({
  name,
  value,
}: {
  name: string;
  value: any;
}): void => {
  try {
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);

    localStorage.setItem(name, stringValue);
  } catch (error) {
    console.error(`Error guardando en localStorage: ${error}`);
  }
};
