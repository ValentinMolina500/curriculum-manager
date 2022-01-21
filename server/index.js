if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Connection, Request } = require("tedious");
const express = require("express");

const databaseConfig = require("./dbconfig");
// const { queryDatabase } = require("./dboperations");

let serverInit = false;

/* Init HTTP server */
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {

  /* Make call to server */
  if (!serverInit) {
    res.send("Database not ready.");
  }

  queryDatabase().then((rows) => {
    console.log("This is rows", rows);
    res.json(rows);
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


/* Init connection to database */
const connection = new Connection(databaseConfig);
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    // queryDatabase();
    console.log("connected to database!");
    serverInit = true;
  }
});

connection.connect();


function queryDatabase() {
  return new Promise((resolve, reject) => {
    console.log("Reading rows from database...");
    const allRows = [];

    const request = new Request(
      `SELECT * from dbo.Master_schedule`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
    request.on("row", columns => {
      const row = {};

      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      })

      allRows.push(row);
    })

    request.on("doneInProc", (rowCount, more, rows) => {
      console.log("doneInProc!");
      resolve(allRows);
    });

    connection.execSql(request);
  });
}

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://catalog.wsu.edu/Tri-Cities/Courses/BySubject/CPT_S');
  // await page.screenshot({ path: 'WSU_CPTS_Courses.png' });
  let courseLookup;
  try {

    /* Get course numbers and course titles */
    courseLookup = await page.evaluate(() => {
      const lookup = {};
      let getCourseHeaders = document.querySelectorAll(".course_header");
      const courseHeaderArray = [...getCourseHeaders];
      console.log("courseHeaderArray", courseHeaderArray);


      for (const header of courseHeaderArray) {
        const hText = header.innerText;
        const courseNumber = hText.substr(0, hText.indexOf(" "));
        const courseTitle = hText.substr(hText.indexOf(" ") + 1);

        console.log("header", header);

        lookup[courseNumber] = {
          courseNumber,
          courseTitle
        }
      }

      return lookup;
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  await browser.close();
})();