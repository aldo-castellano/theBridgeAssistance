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
            paper: "#f0f0f0",
        },
    },
    typography: {
        fontSize: 16,
    },
});
export default theme;