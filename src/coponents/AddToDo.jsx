import React, { useReducer, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";

const initialState = {
  // "id": 7,
  title: "",
  status: false,
  description: "",
  assign_to: {
    name: "",
  },
  date: "",
  time: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TITLE":
      return { ...state, title: action.payload };
    case "STATUS":
      return { ...state, status: action.payload };
    case "DESCRIPTION":
      return { ...state, description: action.payload };
    case "ASIGN_TO":
      return { ...state, assign_to: { name: action.payload } };
    case "DATE":
      return { ...state, date: action.payload };
    case "TIME":
      return { ...state, time: action.payload };
    default:
      throw new console.error("invalid action type");
  }
};

export const AddToDo = ({ isOpen, onClose }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodo = () => {
    axios.post("http://localhost:8080/todo", state);

    console.log(state);
    onClose();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"#5356FF"} p={5}>
            Add To Do
          </ModalHeader>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title :</FormLabel>
              <Input
                ref={initialRef}
                placeholder="title"
                onChange={(e) =>
                  dispatch({ type: "TITLE", payload: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Discription(optional) :</FormLabel>
              <Input
                placeholder="discription"
                onChange={(e) =>
                  dispatch({ type: "DESCRIPTION", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Assigned to :</FormLabel>
              <Input
                placeholder="person name"
                onChange={(e) =>
                  dispatch({ type: "ASIGN_TO", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Chose completation date & time :</FormLabel>
              <Box display="flex" justifycontent="space-between">
                <Input
                  w={40}
                  type="date"
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-");
                    const reversedDate = `${day}-${month}-${year}`;
                    dispatch({ type: "DATE", payload: reversedDate });
                  }}
                />

                <Input
                  w={40}
                  type="time"
                  ml={10}
                  onChange={(e) =>
                    dispatch({ type: "TIME", payload: e.target.value })
                  }
                />
              </Box>
            </FormControl>
            <FormControl mt={4} display={"flex"}>
              <p className="roboto-bold">Completed</p>
              <Checkbox
                colorScheme="green"
                defaultChecked
                ml={5}
                onChange={(e) => dispatch({ type: "STATUS", payload: true })}
              />

              {/* </Checkbox> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bg="#5356FF" mr={3} onClick={addTodo}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
