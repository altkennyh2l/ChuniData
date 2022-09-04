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
      if (element.data.EXP.level.endsWith(".5")) {
        element.data.EXP.level = `${element.data.EXP.level.slice(0, -2)}+`;
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
      if (element.data.EXP.level.endsWith(".5")) {
        element.data.EXP.level = `${element.data.EXP.level.slice(0, -2)}+`;
      }
      if (element.data.ULT.level.endsWith(".5")) {
        element.data.ULT.level = `${element.data.ULT.level.slice(0, -2)}+`;
      }
    }
  } else {
    return;
  }
});
