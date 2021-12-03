const config = {
  authentication: {
    options: {
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASS
    },
    type: "default"
  },
  server: process.env.DB_SERVER,
  
  options:{
      trustedconnection: true,
      enableArithAbort : true, 
      instancename :'SQLEXPRESS',
      database: process.env.DB_NAME,
      encrypt: true,
      rowCollectionOnDone: true
  },
  port: process.env.DB_PORT
}

console.log("config: ", config);


module.exports = config;