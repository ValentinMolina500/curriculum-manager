const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    /* Page we are scraping */
    await page.goto('https://catalog.wsu.edu/Tri-Cities/Courses/BySubject/ACCTG');
    try {

        /* Get course numbers and course titles (we need to get descriptions as well) */
        const result = await page.evaluate(() => {
            const courses = document.querySelectorAll(".course");
            let coursesArr = [];

            courses.forEach((courseTag) => {
                const courseInfo = courseTag.querySelectorAll("span");
                const courseHeader = courseInfo[0];
                const courseDescription = courseInfo[1];
                const courseHeaderText = courseHeader.innerText;

                const courseNumber = courseHeaderText.substring(0, courseHeaderText.indexOf(" "));
                const courseTitle = courseHeaderText.substring(courseHeaderText.indexOf(" ") + 1).trim();

                const prereqRegex = /Course Prerequisite:(.*?)\./g;
                const prereqResult = prereqRegex.exec(courseDescription.innerText);

                let prereqs;
                if (prereqResult === null) {
                    prereqs = "";
                } else {
                    prereqs = prereqResult[0];
                }

                const creditRegex = /[^C]*/;
                const creditResult = creditRegex.exec(courseDescription.innerText);

                let credits;
                if (creditResult === null) {
                    credits = "";
                } else {
                    credits = creditResult[0].charAt(0);
                }

                coursesArr.push({
                    courseNumber: courseNumber,
                    courseTitle: courseTitle,
                    courseCredits: credits,
                    coursePrerequisites: prereqs,
                    courseDescription: courseDescription.innerText
                });
            })
            return coursesArr
        });

        /* Write results to csv file */
        // const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        // const csvWriter = createCsvWriter({
        //   path: 'accounting_courses.csv',
        //   header: [
        //     {id: 'courseNumber', title: 'Class #'},
        //     {id: 'courseTitle', title: 'Title'},
        //     {id: 'courseCredits', title: 'Credits'},
        //     {id: 'coursePrerequisites', title: 'prereqs'},
        //     {id: 'courseDescription', title: 'description'}
        //   ]
        // });

        // csvWriter.writeRecords(result).then(() => console.log('Results written successfully!'));

        /* Write results to excel file */
        const xlsx = require('xlsx');
        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(result);
        xlsx.utils.book_append_sheet(wb, ws, "sheet1");

        xlsx.writeFile(wb, "accounting_courses.xlsx")

        /* Print result */
        console.log(result);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    await browser.close();
})();