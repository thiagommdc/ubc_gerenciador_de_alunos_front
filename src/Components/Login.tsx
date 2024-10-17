import React, { useContext, useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { loginService } from "../Service/service";
import { AuthContext } from "../Context/AuthContext";

const Login: React.FC = () => {
  const { setToken, setLogged } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const resultado = await loginService({
        username: username,
        password: password,
      });

      setToken(resultado.token);
      setLogged(true);
      
    } catch (error) {
      setLogged(false);
      console.error(error);
      alert("Ocorreu um erro inesperado.");
    }
  };

  return (
    <Container maxWidth="sm">
      
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuário"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
