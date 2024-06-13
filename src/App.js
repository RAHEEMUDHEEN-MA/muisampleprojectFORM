import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Form from "./Components/Form";
import Test from "./Components/Test";
import Main from "./Main";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Main/>
      {/* <Form/> */}
    </ThemeProvider>
  );
}

export default App;
