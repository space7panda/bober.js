const espree = require("espree");

const fs = require("fs");

const ecmaVersion = 6;

module.exports.parse = function (filename) {
  let file = fs.readFileSync(filename, "utf8");

  const { body } = espree.parse(file, { ecmaVersion, sourceType: 'module'});

  let requires = [];
  let functions = [];

  for (const key in body) {
    switch (body[key].type) {
      case "VariableDeclaration":
        if (body[key]?.declarations?.[0]?.init?.callee?.name === "require") {
          requires.push({
            module: body[key].declarations[0].init.arguments[0].value,
          });
        } else if (body[key]?.declarations?.[0]?.init?.arguments?.[0]?.callee?.name === "require") {
          requires.push({
            module: body[key].declarations[0].init.arguments[0].arguments[0].value,
          });
        } else if (body[key].declarations?.[0]?.init?.object?.callee?.name === "require") {
          requires.push({
            module: body[key].declarations[0].init.object.arguments[0].value,
          });
        }

        break;

      case "ExpressionStatement":
      case "FunctionDeclaration":
        if (body[key]?.type === "FunctionDeclaration") {
          functions.push(body[key].id.name);
        } else if (body[key]?.expression?.right?.type === "FunctionExpression") {
          if (body[key]?.expression?.right?.id?.name) {
            functions.push(body[key].expression.right.id.name);
          } else {
            functions.push(body[key].expression.left.property.name);
          }
        }
        break;
      default:
        break;
    }
  }

  return { requires, requiresCount: requires.length, functions, functionsCount: functions.length, filePath: filename };
};
