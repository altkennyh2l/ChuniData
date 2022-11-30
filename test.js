import fs from "fs";
import sharp from "sharp";

async function validateJacketImages() {
  let jacketImages = [];
  const checkImageValidity = (file_path) => sharp(file_path).toBuffer();

  fs.readdirSync("./ChuniChartBundle/jacket").forEach((file) => {
    jacketImages.push(file);
  });

  jacketImages.splice(jacketImages.indexOf(".gitignore"), 1);

  jacketImages.forEach((file_name) => {
    checkImageValidity("ChuniChartBundle/jacket/" + file_name)
      .then()
      .catch((err) =>
        console.log(
          "[Jacket Image Validation][Warning] Invalid image detected:",
          file_name,
          " Error:",
          err
        )
      );
  });
}

validateJacketImages();
