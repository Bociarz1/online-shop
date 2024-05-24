import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Box, Button, Container, TextField } from "@mui/material";
import { AuthContext } from "../../context/authContext";

const Login = ({type}:{type: 'login' | 'register'}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login,register } = useContext(AuthContext);
  const navigate = useNavigate();
  function navToLogin(): void {
    navigate('/signIn')
  }
  const handleLogin = (event: any): void => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
        login(user)
    navigate('/dashboard')
  };
  function handleRegister(): void {
    const user = {
      username: username,
      password: password,
    };
    register(user)
    navigate('/dashboard')
  }

  return (
      <>
        {type === 'login' && <h1>Logowanie</h1>}
        {type === 'register' && <h1>Rejestracja</h1>}
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
          <Container maxWidth="xs">
            <form
                onSubmit={handleLogin}
                style={{display: "flex", flexDirection: "column", gap: "1rem"}}
            >
              <TextField
                  label="Login"
                  required
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                  label="Password"
                  required
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" color="primary" type="submit">
                Zaloguj
              </Button>
              <Button variant="contained" color="primary" onClick={handleRegister}>
                Zarejestruj
              </Button>
            </form>
            {type === 'register' &&
                <span onClick={navToLogin} style={{cursor: 'pointer', color: 'white'}}> Przejdź do logowania</span>}
          </Container>
        </Box>
      </>
  );
};

export default Login;
