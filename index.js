const { parse } = require("./lib/fileParser");
const { generateFile } = require("./lib/fileGenerator");
const { getFileList } = require("./lib/directoryScanner");

function boberDirectory(dirName, templateName, options = {}) {
  const files = getFileList(dirName);

  files.forEach((file) => {
    const filePath = `${file.path}/${file.fileName}`;
    const parseResult = parse(filePath);

    generateFile(parseResult, templateName, filePath, options);
  });
}

function boberFile(fileName, templateName, options = {}) {
  const parseResult = parse(fileName);

  generateFile(parseResult, templateName, fileName, options);
}

module.exports.boberDirectory = boberDirectory;
module.exports.boberFile = boberFile;
