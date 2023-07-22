const { readdirSync } = require("fs");
const path = require("path");

function getFileList(dirName) {
  let files = [];
  const items = readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      if (path.extname(item.name) === '.js') {
        files.push({
          path: dirName,
          fileName: item.name,
        });
      }
    }
  }

  return files;
}

module.exports.getFileList = getFileList;
