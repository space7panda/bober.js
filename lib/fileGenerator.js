const fs = require("fs-extra");
const ejs = require("ejs");
const path = require("path");

module.exports.generateFile = function (
  parseResult,
  templateName,
  outputFileName,
  options = {}
) {
  parseResult.templatePath = `${__dirname}/../templates/${templateName}.ejs`;

  const flag = options.override ? "w" : "wx";

  ejs.renderFile(
    parseResult.templatePath,
    parseResult,
    options,
    function (err, str) {
      if (err) {
        console.error(err);
      }

      fs.outputFileSync(`./test/${outputFileName}`, str, { flag });

      console.log(`${outputFileName} - done`);
    }
  );
};
