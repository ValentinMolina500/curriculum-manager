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
}

const instance = new API();
export default instance;