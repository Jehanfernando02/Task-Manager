// src/pages/LoginPage.js
import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";  // Update this import
import axios from "axios";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Change this line from useHistory to useNavigate

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      onLogin(response.data.token, response.data.user);
      navigate("/dashboard");  // Use navigate() instead of history.push()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={4}>
      <Input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        mb={4}
      />
      <Input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        mb={4}
      />
      <Button onClick={handleLogin} colorScheme="teal">Login</Button>
    </Box>
  );
};

export default LoginPage;
