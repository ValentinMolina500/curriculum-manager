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
      }, 2500)
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
      }, 4200)
    })
  }

  getInstructors = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            firstName: "Luis",
            lastName: "De La Torre",
            wsuEmail: "luis.delatorre@wsu.edu",
            id: "8aa25ed4-5e8f-41d9-a70a-b1b0f68dad2e"
          },
          {
            firstName: "Bob",
            lastName: "Lewis",
            wsuEmail: "bobl@wsu.edu",
            id: "33bea38c-05d9-4b0e-8336-2b640dc30372"
          },
          {
            firstName: "John",
            lastName: "Miller",
            wsuEmail: "jmiller16@wsu.edu",
            id: "18943c00-613b-4127-aaef-97b38d5f42fb"
          },
          {
            firstName: "Russell",
            lastName: "Swannack",
            wsuEmail: "russell_swannack@wsu.edu",
            id: "97f3c02b-c52f-4ade-a027-dc240d2026fc"
          }
        ])
      }, 2500)
    })
  }
}

const instance = new API();
export default instance;