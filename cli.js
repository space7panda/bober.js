#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

const bober = require("./index.js");

program.name("bober").description("CLI for bober library").version("0.0.1");

program
  .command("generate")
  .description("generates files based on template and source files")
  .argument("<string>", "template name")
  .option(
    "-f --file <string>",
    "name of the file that will be used for code generation"
  )
  .option(
    "-d --directory <string>",
    "will recursively use all files for code generation"
  )
  .option("-o --override", "will override all existing files with new ones")
  .action((template, cliOptions) => {
    const options = {
      override: cliOptions.override,
    };

    if (cliOptions.file) {
      bober.boberFile(cliOptions.file, template, options);
    } else if (cliOptions.directory) {
      bober.boberDirectory(cliOptions.directory, template, options);
    } else {
      console.log("bober do not know what to do :(");
    }
  });

program.parse();
