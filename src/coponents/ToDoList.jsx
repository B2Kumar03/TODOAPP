import {
  Box,
  Button,
  CheckboxIcon,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { AddToDo } from "./AddToDo";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";
import Page from "../pagination/Page";

const ToDoList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [upd, setUpd] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/todo")
      .then((res) => res.json())
      .then((data1) => {
        const mod = data1.length % 5;
          console.log(mod);
        if (mod >0) {
          setTotal(Math.floor(data1.length / 5) + 1);
        } else {
          setTotal(Math.floor(data1.length / 5));
        }
      });
    
    fetData();
  }, [current, upd]);
  const fetData = async () => {
    setLoading((prev) => !prev);

    try {
      axios
        .get(`http://localhost:8080/todo?_limit=5 &&_page=${current}`)
        .then((data) => {
          console.log(data);
          const data1 = data.data;
          data1.sort((a, b) => {
            return a.description.length - b.description.length;
          });
          setData(data1);
          setLoading((prev) => !prev);
        })
        .catch((error) => {
          console.log(error);
          setError((prev) => !prev);
          setLoading((prev) => !prev);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleclick = () => {
    setCurrent((prev) => prev + 1);
  };
  const handleclick1 = () => {
    setCurrent((prev) => prev - 1);
  };

  const update1 = (id, st) => {
    axios.patch(`http://localhost:8080/todo/${id}`, {
      status: !st,
    });

    setUpd((prev) => !prev);
  };

  const delete1 = (id) => {
    axios.delete(`http://localhost:8080/todo/${id}`);
    setUpd((prev) => !prev);
  };
  const sortNerestDateAssendingOrder = (or) => {
    axios
      .get(
        `http://localhost:8080/todo?_limit=5 &&_page=${current}&&_sort=date&&_order=${or}`
      )
      .then((data) => setData(data.data));
  };
  const filter = (st) => {
    setLoading((prev)=>!prev)
    axios
      .get(
        `http://localhost:8080/todo?status=${st}`
      )
      .then((data) => {
        setLoading((prev)=>!prev)
        setData(data.data)
      }).catch(()=>{
        setLoading((prev)=>!prev)
        setError(true)
      })
  };

  const search=(e)=>{

    const v=e.target.value;
    if(v.length==0){
      fetData()
      return
    }
  
    setLoading((prev)=>!prev)
    axios.get(
      `http://localhost:8080/todo?title_like=${v}`
    )
    .then((data) => {
      setData(data.data)
      setLoading((prev)=>!prev)
    })
    ;
  }

  if (error) {
    console.log("err");
    return (
      <>
        <Error />
      </>
    );
  }

  return (
    <>
      <Flex justifyContent={"flex-end"} alignItems={"center"}>
        <Box>
          <InputGroup>
            <Input placeholder="Search title" w={400}  onChange={(e)=>search(e)}/>
            <InputRightElement>
              <CiSearch color={"gray.300"} fontSize={20} />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Flex
          justifyContent={"space-between"}
          w={430}
          p={10}
          alignItems={"center"}
        >
          <Box>
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                // borderRadius="md"
                // borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                // _focus={{ boxShadow: "outline" }}

                as={Button}
                rightIcon={<RiArrowDropDownLine />}
              >
                Sort
              </MenuButton>
              <MenuList p={2}>
                <MenuItem
                  _hover={{ bg: "#5356FF", color: "white" }}
                  onClick={() => sortNerestDateAssendingOrder("desc")}
                >
                  Sort by Nearest (Ascending)
                </MenuItem>
                <hr />
                <MenuItem
                  _hover={{ bg: "#5356FF", color: "white" }}
                  onClick={() => sortNerestDateAssendingOrder("asc")}
                >
                  Sort by Farthest (Descending)
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                // borderRadius="md"
                // borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                // _focus={{ boxShadow: "outline" }}

                as={Button}
                rightIcon={<RiArrowDropDownLine />}
              >
                Filter
              </MenuButton>
              <MenuList>
                <MenuItem _hover={{ bg: "#5356FF", color: "white" }} onClick={()=>filter(true)}>
                  Completed
                </MenuItem>
                <hr />
                <MenuItem _hover={{ bg: "#5356FF", color: "white" }} onClick={()=>filter(false)}>
                  Pending
                </MenuItem>
                <hr />
                <MenuItem _hover={{ bg: "#5356FF", color: "white" }}>
                  Assigned to
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <Button
              bg={"#5356FF"}
              fontSize={20}
              color={"white"}
              _hover={{
                border: "2px solid #5356FF",
                bg: "white",
                color: "black",
              }}
              onClick={onOpen}
            >
              Add ToDo <FaPlus />
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Flex justifyContent={"center"}>
        {loading ? (
          <Loading />
        ) : (
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
            {data.map((ele) => {
              return (
                <Box
                  p={5}
                  borderRadius={10}
                  m={3}
                  className="shadow"
                  _hover={{ bg: "#DDDDDD" }}
                  key={ele.id}
                >
                  <Text className="roboto-bold" fontSize={20}>
                    {ele.title}
                  </Text>
                  <Text fontSize={15}>{ele.description}</Text>
                  <Text fontSize={15}>
                    Assign to : <b>{ele.assign_to.name}</b>
                  </Text>
                  <Text fontSize={15}>Completation date : {ele.date}</Text>
                  <Text fontSize={15}>Time : {ele.time}</Text>
                  <Button
                    bg={ele.status ? "green" : "yellow"}
                    onClick={() => update1(ele.id, ele.status)}
                  >
                    {ele.status ? "Completed" : "Pending"}
                  </Button>
                  <Button
                    bg={"red"}
                    ml={5}
                    _hover={{ border: "2px solid red", bg: "#DDDDDD" }}
                    onClick={() => delete1(ele.id)}
                  >
                    Delete
                  </Button>
                </Box>
              );
            })}
          </Box>
        )}
      </Flex>
      <AddToDo isOpen={isOpen} onClose={onClose} />
      {!loading ? (
        <>
        <br />
          <hr />
          <Page
            current={current}
            total={total}
            handleclick={handleclick}
            handleclick1={handleclick1}
          />
        </>
      ) : null}
    </>
  );
};

export default ToDoList;
