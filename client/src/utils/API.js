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

  getAllCourses = () => {
    return fetch("http://localhost:8000/courses")
      .then(response => response.json())
      .then(res => {
        return res;
      })
  }

  addNewCourse = (payload) => {
    return fetch("http://localhost:8000/courses", {
      method: "POST", body: JSON.stringify(payload), headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res;
      })
      .then(res => {
        return res
      })
  }

  getAllInstructors = () => {
    return fetch("http://localhost:8000/instructors")
      .then(response => response.json())
      .then(res => {
        return res;
      })
  }

  getAllOfferings = () => {
    return fetch("http://localhost:8000/offerings")
      .then(response => response.json())
      .then(res => {
        return res;
      })
  }

  addNewInstructor = (payload) => {
    return fetch("http://localhost:8000/instructors", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(res => res);
  }

  deleteInstructor = (instructorId) => {
    return fetch("http://localhost:8000/instructors", {
      method: "DELETE",
      body: JSON.stringify({ instructorId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.ok;
      })
  }

  addNewOffering = (payload) => {
    return fetch("http://localhost:8000/offerings", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.ok
      })
  }

  deleteOffering = (payload) => {
    return fetch("http://localhost:8000/offerings", {
      method: "DELETE",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.ok
      })
  }

  getConflictsForOffering = (payload) => {
    return fetch("http://localhost:8000/conflicts", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => json);
  }
}

const instance = new API();
export default instance;