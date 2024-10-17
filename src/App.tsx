import { useState } from "react";
import "./App.css";
import { AuthContext } from "./Context/AuthContext";
import StudentList from "./Components/StudentList";
import Login from "./Components/Login";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [logged, setLogged] = useState<boolean>(false);

  return (
    <>
      <AuthContext.Provider value={{ token, setToken, logged, setLogged }}>
        {logged ? <StudentList /> : <Login />}
      </AuthContext.Provider>
    </>
  );
}

export default App;
