import React from "react";
import { Flex, Spacer, Box, Heading } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} bg={"#5356FF"}>
      <Box p="4" className="roboto-light-italic" color={"white"} marginLeft={40}>
        <Heading>ToDo App</Heading>
      </Box>
      <Spacer />
      <Box p="4" fontSize={35}  >
      <Box className="hamburger" p={2}>
      <RxHamburgerMenu />
      </Box>

      </Box>
    </Flex>
  );
};

export default Navbar;
