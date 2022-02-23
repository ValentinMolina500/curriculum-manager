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
const cors = require("cors");
const port = process.env.PORT || 8000;
app.use(cors());
app.get("/", (req, res) => {

  /* Make call to server */
  if (!serverInit) {
    res.send("Database not ready.");
  }

  queryDatabase().then((rows) => {
    console.log("This is rows", rows);
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


function getAllCourses() {
  return new Promise((resolve, reject) => {
    const allRows = [];

    const request = new Request(
      `SELECT TOP (1000) [Class #]
      ,[Title]
      ,[Credits]
      ,[prereqs]
      ,[description]
      ,[Mtg Days]
      ,[Subject]
    FROM [CPT_S].[Computer_Science]
      `,
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
      resolve(allRows);
    });

    connection.execSql(request);
  });
}

app.get("/courses", (req, res) => {
  getAllCourses().then((rows) => {
    res.json(rows);
  })
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

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   /* Page we are scraping */
//   await page.goto('https://catalog.wsu.edu/Tri-Cities/Courses/BySubject/CPT_S');
//   try {

//     /* Get course numbers and course titles (we need to get descriptions as well) */
//     const result = await page.evaluate(() => {
//       const courses = document.querySelectorAll(".course");
//       let coursesArr = [];

//       courses.forEach((courseTag) => {
//         const courseInfo = courseTag.querySelectorAll("span");
//         const courseHeader = courseInfo[0];
//         const courseDescription = courseInfo[1];
//         const courseHeaderText = courseHeader.innerText;

//         const courseNumber = courseHeaderText.substring(0, courseHeaderText.indexOf(" "));
//         const courseTitle = courseHeaderText.substring(courseHeaderText.indexOf(" ") + 1).trim();

//         const prereqRegex = /Course Prerequisite:(.*?)\./g;
//         const prereqResult = prereqRegex.exec(courseDescription.innerText);

//         let prereqs;
//         if (prereqResult === null) {
//           prereqs = "";
//         } else {
//           prereqs = prereqResult[0];
//         }

//         const creditRegex = /[^C]*/;
//         const creditResult = creditRegex.exec(courseDescription.innerText);

//         let credits;
//         if (creditResult === null) {
//           credits = "";
//         } else {
//           credits = creditResult[0].charAt(0);
//         }

//         coursesArr.push({
//           courseNumber: courseNumber,
//           courseTitle: courseTitle,
//           courseCredits: credits,
//           coursePrerequisites: prereqs,
//           courseDescription: courseDescription.innerText
//         });
//       })
//       return coursesArr
//     });

//     /* Write results to csv file */
//     // const createCsvWriter = require('csv-writer').createObjectCsvWriter;
//     // const csvWriter = createCsvWriter({
//     //   path: 'cpts_courses.csv',
//     //   header: [
//     //     {id: 'courseNumber', title: 'Class #'},
//     //     {id: 'courseTitle', title: 'Title'},
//     //     {id: 'courseCredits', title: 'Credits'},
//     //     {id: 'coursePrerequisites', title: 'prereqs'},
//     //     {id: 'courseDescription', title: 'description'}
//     //   ]
//     // });

//     // csvWriter.writeRecords(result).then(() => console.log('Results written successfully!'));

//     /* Write results to excel file */
//     const xlsx = require('xlsx');
//     const wb = xlsx.utils.book_new()
//     const ws = xlsx.utils.json_to_sheet(result);
//     xlsx.utils.book_append_sheet(wb,ws, "sheet1");

//     xlsx.writeFile(wb, "cpts_courses.xlsx")

//     /* Print result */
//     // console.log(result);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }

//   await browser.close();
// })();