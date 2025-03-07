// src/components/Navbar.js
import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">Trello Clone</Heading>
        {user ? (
          <Flex align="center">
            <Box mr={4}>Hello, {user.name}</Box>
            <Button onClick={onLogout} colorScheme="red">Logout</Button>
          </Flex>
        ) : (
          <Link to="/login">
            <Button colorScheme="teal">Login</Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
