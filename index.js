import fs from "fs";
import fetch from "node-fetch";
import archiver from "archiver";
import dotenv from "dotenv";
dotenv.config();

let chartDB_json = await fetch(process.env.REQUEST_URL);
let chartDB = await chartDB_json.json();

let officialChartDB_json = await fetch(process.env.URL_OFFICIAL_JSON);
let officialChartDB = await officialChartDB_json.json();

await chartDB.forEach(async (element) => {
  if (element.meta.genre != "WORLD'S END") {
    let title = element.meta.title;
    let targetOfficialDB = officialChartDB.find((obj) => {
      return obj.title === title;
    });
    element.meta.officialID = targetOfficialDB.id;
    element.meta.jacket = targetOfficialDB.image;
    await fetch(
      `${process.env.URL_OFFICIAL_IMG}${targetOfficialDB.image}`
    ).then((res) =>
      res.body.pipe(
        fs.createWriteStream(
          `./ChuniChartBundle/jacket/${targetOfficialDB.image}`
        )
      )
    );
  } else {
    let title = element.meta.title.slice(0, -3);
    let targetOfficialDB = officialChartDB.find((obj) => {
      return obj.title === title && obj.we_star != 0;
    });
    element.meta.officialID = targetOfficialDB.id;
    element.meta.jacket = targetOfficialDB.image;
    element.data.WE.WE_Star = targetOfficialDB.we_star;
    element.data.WE.we_kanji = targetOfficialDB.we_kanji;
    await fetch(
      `${process.env.URL_OFFICIAL_IMG}${targetOfficialDB.image}`
    ).then((res) =>
      res.body.pipe(
        fs.createWriteStream(
          `./ChuniChartBundle/jacket/${targetOfficialDB.image}`
        )
      )
    );
  }
});

let jsonData = JSON.stringify(chartDB);

await fs.writeFile("./ChuniChartBundle/ChartDB.json", jsonData, function (err) {
  if (err) {
    console.log(err);
  }
});

var output = fs.createWriteStream("ChuniChartDB.zip");
var archive = archiver("zip");
await archive.directory("./ChuniChartBundle", false);
archive.pipe(output);
archive.finalize();
