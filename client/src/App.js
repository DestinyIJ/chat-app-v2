import { useSelector } from "react-redux";
// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { Snackbar } from "./components";
import { selectApiResponse } from "./redux/api/api.selector";



function App() {
  const { error, success, message } = useSelector(selectApiResponse)
 
  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>
      <Snackbar message={message} error={error} success={success} />
    </>
  );
}


export default App;
