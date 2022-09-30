import fs from "fs";
import fetch from "node-fetch";
import archiver from "archiver";
import dotenv from "dotenv";
dotenv.config();

let chartDB_json = await fetch(process.env.REQUEST_URL);
let chartDB = await chartDB_json.json();

let officialChartDB_json = await fetch(process.env.URL_OFFICIAL_JSON);
let officialChartDB = await officialChartDB_json.json();

const element = {
  data: {
    BAS: {
      level: "",
    },
    ADV: {
      level: "",
    },
    EXP: {
      level: "",
    },
    MAS: {
      level: "",
    },
    ULT: {
      level: "",
    },
  },
};

await chartDB.forEach(async (element) => {
  if (element.meta.genre != "WORLD'S END") {
    let title = element.meta.title;
    let targetOfficialDB = officialChartDB.find((obj) => {
      return obj.title === title;
    });
    element.meta.officialID = targetOfficialDB.id;
    element.meta.jacket = targetOfficialDB.image;

    for (const [key, val] of Object.entries(element.data)) {
      element.data[key].level = val.level.toString().replace(/\.5$/u, "+");
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
