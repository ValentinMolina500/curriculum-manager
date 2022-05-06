import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/merriweather/700.css"

import {  useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import {
  ChakraProvider,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/layout";
import theme from "./theme";
import RequireAuth from "./views/RequireAuth";

import Login from "./views/Login";

import Semesters from "./views/Semesters";
import ViewSemester from "./views/SemesterDashboard";

import Courses from "./views/Courses";

import Instructors from "./views/Instructors";
import ViewInstructor from "./views/ViewInstructor";

import Offerings from "./views/Offerings";
import ViewOffering from "./views/ViewOffering";

import Schedule from "./views/Schedule";

function App() {
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);
  const [selectedOfferingId, setSelectedOfferingId] = useState(null);

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
          >
            <Route path="schedule" element={<Schedule /> } />
            <Route path="offerings" element={<Outlet />} >
              <Route index element={ <Offerings setSelectedOfferingId={setSelectedOfferingId} />} />
              <Route path=":offeringId" element={<ViewOffering />} />
            </Route>
            <Route path="courses" element={<Outlet />}>
              <Route index element={<Courses />} />
            </Route>
            <Route path="instructors" element={<Outlet />} >
              <Route index element={ <Instructors setSelectedInstructorId={setSelectedInstructorId} />} />
              <Route path=":instructorId" element={<ViewInstructor />} />
            </Route>
          </Route>
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
