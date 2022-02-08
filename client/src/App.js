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

import Sessions from "./views/Sessions";
import AddSession from "./views/AddSession";
import ViewSession from "./views/ViewSession";

import Courses from "./views/Courses";
import AddCourse from "./views/AddCourse";

import Instructors from "./views/Instructors";
import AddInstructors from "./views/AddInstructors";
import ViewInstructor from "./views/ViewInstructor";

function App() {
  const [selectedSessionId, setSelectedSessionId] = useState(null);
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
                <Dashboard
                  selectedSessionId={selectedSessionId} setSelectedSessionId={setSelectedSessionId}
                  selectedInstructorId={selectedInstructorId} setSelectedInstructorId={setSelectedInstructorId}
                />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />

            <Route path="sessions" element={<Outlet />}>
              <Route index element={<Sessions setSelectedSessionId={setSelectedSessionId} />} />
              <Route path=":sessionId" element={<ViewSession />} />
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

          </Route>
        </Routes>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
