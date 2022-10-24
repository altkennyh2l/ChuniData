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
    if (!element.data.hasOwnProperty("ULT")) {
      element.data.BAS.level = element.data.BAS.level.toString();
      element.data.ADV.level = element.data.ADV.level.toString();
      element.data.EXP.level = element.data.EXP.level.toString();
      element.data.MAS.level = element.data.MAS.level.toString();
      if (element.data.BAS.level.endsWith(".5")) {
        element.data.BAS.level = `${element.data.BAS.level.slice(0, -2)}+`;
      }
      if (element.data.ADV.level.endsWith(".5")) {
        element.data.ADV.level = `${element.data.ADV.level.slice(0, -2)}+`;
      }
      if (element.data.EXP.level.endsWith(".5")) {
        element.data.EXP.level = `${element.data.EXP.level.slice(0, -2)}+`;
      }
      if (element.data.MAS.level.endsWith(".5")) {
        element.data.MAS.level = `${element.data.MAS.level.slice(0, -2)}+`;
      }
    } else {
      element.data.BAS.level = element.data.BAS.level.toString();
      element.data.ADV.level = element.data.ADV.level.toString();
      element.data.EXP.level = element.data.EXP.level.toString();
      element.data.MAS.level = element.data.MAS.level.toString();
      element.data.ULT.level = element.data.ULT.level.toString();
      if (element.data.BAS.level.endsWith(".5")) {
        element.data.BAS.level = `${element.data.BAS.level.slice(0, -2)}+`;
      }
      if (element.data.ADV.level.endsWith(".5")) {
        element.data.ADV.level = `${element.data.ADV.level.slice(0, -2)}+`;
      }
      if (element.data.EXP.level.endsWith(".5")) {
        element.data.EXP.level = `${element.data.EXP.level.slice(0, -2)}+`;
      }
      if (element.data.MAS.level.endsWith(".5")) {
        element.data.MAS.level = `${element.data.MAS.level.slice(0, -2)}+`;
      }
      if (element.data.ULT.level.endsWith(".5")) {
        element.data.ULT.level = `${element.data.ULT.level.slice(0, -2)}+`;
      }
    }
    await fetch(
      `${process.env.URL_OFFICIAL_IMG}${targetOfficialDB.image}`
    ).then((res) =>
      res.body.pipe(
        fs.createWriteStream(
          `./ChuniChartBundle/jacket/${targetOfficialDB.id}.jpg`
        )
      )
    );
  } else {
    let title = element.meta.title.slice(0, -3);
    let targetOfficialDB = officialChartDB.find((obj) => {
      return obj.title === title && obj.we_star != 0;
    });
    if (!targetOfficialDB) {
      return;
    }
    element.meta.officialID = targetOfficialDB.id;
    element.meta.jacket = targetOfficialDB.image;
    element.data.WE.WE_Star = targetOfficialDB.we_star;
    element.data.WE.we_kanji = targetOfficialDB.we_kanji;
    await fetch(
      `${process.env.URL_OFFICIAL_IMG}${targetOfficialDB.image}`
    ).then((res) =>
      res.body.pipe(
        fs.createWriteStream(
          `./ChuniChartBundle/jacket/${targetOfficialDB.id}.jpg`
        )
      )
    );
  }
});

let jsonData = JSON.stringify(chartDB);

const createBundle = async function () {
  await fs.writeFile(
    "./ChuniChartBundle/ChartDB.json",
    jsonData,
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  var output = fs.createWriteStream(
    `ChuniChartDB_${new Date()
      .toLocaleDateString("sv")
      .replaceAll("-", "")}.zip`
  );
  var archive = archiver("zip");
  await archive.directory("./ChuniChartBundle", false);
  archive.pipe(output);
  archive.finalize();
};

if (!fs.existsSync("ChuniChartDB*")) {
  createBundle();
} else {
  let exisitingJSON = fs.readFileSync("./ChuniChartBundle/ChartDB.json");
  let compareExistingTarget = JSON.stringify(JSON.parse(exisitingJSON));
  if (compareExistingTarget !== jsonData) {
    createBundle();
  }
}
