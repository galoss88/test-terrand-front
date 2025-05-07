import type { Theme } from "@mui/material/styles";
import { useTheme as useMuiTheme } from "@mui/material/styles";

export function useAppTheme(): Theme {
  return useMuiTheme();
}
