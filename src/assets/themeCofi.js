import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e1331a",
    },
    secondary: {
      main: "#22172b",
    },
    background: {
      paper: "#22172b",
    },
  },
  typography: {
    fontSize: 16,
  },
});
export default theme;
