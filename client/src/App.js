import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/merriweather/700.css"

import { useEffect, useState } from "react";
import Authentication from "./utils/Authentication";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import {
  ChakraProvider,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/layout";
import theme from "./theme";

import Login from "./views/Login";
import Dashboard from './views/Dashboard'
import Home from "./views/Home";

import Sessions from "./views/Sessions";
import AddSession from "./views/AddSession";

import Courses from "./views/Courses";
import AddCourse from "./views/AddCourse";

import Instructors from "./views/Instructors";

function App() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(true);

  useEffect(() => {
    Authentication.onAuthStateChanged((_isSignedIn) => {
      setIsSignedIn(_isSignedIn);
    })
  }, []);
  
  useEffect(() => {
    if (!isSignedIn) {
      navigate(`/login`);
    } else {
     // navigate(`/`)
    }
  }, [isSignedIn]);

  const onSignInClick = async () => {
    await Authentication.signIn();
  }

  return (
    <ChakraProvider theme={theme}>
      <Grid w="100vw" h="100vh">
        <Routes>
          <Route path="/login" element={<Login onSignInClick={onSignInClick} />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />

            <Route path="sessions" element={<Outlet />}>
              <Route index  element={<Sessions />} />
              <Route path="add" element={<AddSession />} />
            </Route>
            <Route path="courses" element={<Outlet/>}>
              <Route index element={<Courses />} />
              <Route path="add-course" element={<AddCourse />} />
            </Route>
            <Route path="instructors" element={<Instructors />} />
          </Route>
        </Routes>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
