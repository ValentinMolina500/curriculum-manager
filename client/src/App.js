import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/merriweather/700.css"

import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import {
  ChakraProvider,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/layout";
import theme from "./theme";
import RequireAuth from "./views/RequireAuth";

import Login from "./views/Login";
import Dashboard from './views/Dashboard'
import Home from "./views/Home";

import Semesters from "./views/Semesters";
import AddSession from "./views/AddSession";
import ViewSemester from "./views/ViewSemester";

import Courses from "./views/Courses";
import AddCourse from "./views/AddCourse";

import Instructors from "./views/Instructors";
import AddInstructors from "./views/AddInstructors";
import ViewInstructor from "./views/ViewInstructor";

function App() {
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <Grid w="100vw" h="100vh">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <RequireAuth>
                <Semesters />
              </RequireAuth>
            }
          />
          <Route 
            path="/:semesterId" 
            element={
              <RequireAuth>
                <ViewSemester />
              </RequireAuth>
            }
          />
          {/* <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard
                 {...{
                   selectedInstructorId,
                   setSelectedInstructorId,
                   selectedSemesterId,
                   setSelectedSemesterId
                 }}
                />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />

            <Route index element={<Semesters />}>
              <Route index element={<Semesters {...{setSelectedSemesterId}}/>} />
              <Route path=":semesterId" element={<ViewSemester />} />
            </Route>

            <Route path="instructors" element={<Outlet />} >
              <Route index element={<Instructors setSelectedInstructorId={setSelectedInstructorId} />} />
              <Route path=":instructorId" element={<ViewInstructor />} />
              <Route path="add-instructors" element={<AddInstructors />} />
            </Route>

            <Route path="courses" element={<Outlet />}>
              <Route index element={<Courses />} />
              <Route path="add-course" element={<AddCourse />} />
            </Route>

          </Route> */}
        </Routes>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
