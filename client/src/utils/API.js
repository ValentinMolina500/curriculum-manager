class API {
  login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Logging in with credentials...", {
          email,
          password
        })
        resolve({
          user: {
            name: "Bob Lewis",
            email: "bobl@wsu.edu"
          }
        })
      }, 50)
    })
  } 

  getSemesters = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            season: "Summer",
            year: "2022",
            school: "Washington State University Tri-Cities",
            id: "8aa25ed4-5e8f-41d9-a70a-b1b0f68dad2e"
          },
          {
            season: "Spring",
            year: "2022",
            school: "Washington State University Tri-Cities",
            id: "33bea38c-05d9-4b0e-8336-2b640dc30372"
          },
          {
            season: "Fall",
            year: "2021",
            school: "Washington State University Tri-Cities",
            id: "18943c00-613b-4127-aaef-97b38d5f42fb"
          },
          {
            season: "Summer",
            year: "2020",
            school: "Washington State University Tri-Cities",
            id: "97f3c02b-c52f-4ade-a027-dc240d2026fc"
          }
        ])
      }, 50)
    })
  }

  getOfferings = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            subject: "CPT_S",
            courseNum: "121",
            courseTitle: "Program Design and Development C/C++",
            courseInstructor: "Luis De La Torre",
            courseDays: "M, W",
            startTime: "4:15PM",
            endTime: "5:30PM",
            room: "Floyd 131",
            id: "8924"
          },
          {
            subject: "CPT_S",
            courseNum: "122",
            courseTitle: "Data Structures C/C++",
            courseInstructor: "Nathan Tenney",
            courseDays: "TU, TH",
            startTime: "4:20PM",
            endTime: "5:35PM",
            room: "Floyd 133",
            id: "15740"
          },
          {
            subject: "CPT_S",
            courseNum: "360",
            courseTitle: "Systems Programming C/C++",
            courseInstructor: "Bob Lewis",
            courseDays: "TU, TH",
            startTime: "2:55PM",
            endTime: "4:10PM",
            room: "Floyd 133",
            id: "15745"
          },
          {
            subject: "CPT_S",
            courseNum: "451",
            courseTitle: "Introduction to Database Systems",
            courseInstructor: "Russell Swannack",
            courseDays: "TU, TH",
            startTime: "4:20PM",
            endTime: "5:35PM",
            room: "BSEL 103",
            id: "15922"
          },
        ])
      }, 2500)
    })
  }

  getAllCourses = () => {
    return fetch("http://localhost:8000/courses")
      .then(response => response.json())
      .then(res => {
        return res;
      })
  }

  getAllInstructors = () => {
    return fetch("http://localhost:8000/instructors")
      .then(response => response.json())
      .then(res => {
        return res;
      })
  }
}

const instance = new API();
export default instance;