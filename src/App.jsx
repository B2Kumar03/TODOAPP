// import { Button, Heading, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "./coponents/Navbar";
import ToDoList from "./coponents/ToDoList";

export default function App() {
const [data,setData]=useState([])

  return <>
 <Navbar/>
 <ToDoList/>
  </>;
}
