#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert to PascalCase
const toPascalCase = (str) => str[0].toUpperCase() + str.slice(1);

const TEMPLATE_PATH = path.join(__dirname, "templates");

function copyAndReplaceTemplate(type, destDir, name, fileName) {
  const templateFile = path.join(TEMPLATE_PATH, `template.${type}.ts`);
  const targetFile = path.join(destDir, `${fileName}.${type}.ts`);

  // Copy the template file to the destination
  fs.copyFileSync(templateFile, targetFile);

  // Replace placeholders in the new file
  let content = fs.readFileSync(targetFile, "utf-8");
  content = content
    .replace(/__NAME__/g, name)
    .replace(/__FILENAME__/g, fileName);
  fs.writeFileSync(targetFile, content);
}

(async () => {
  const { folderName, filesToCreate, withTemplate } = await inquirer.prompt([
    {
      name: "folderName",
      type: "input",
      message: "Enter module name (folder name):",
      validate: (input) => input.trim() !== "" || "Folder name is required",
    },
    {
      name: "filesToCreate",
      type: "checkbox",
      message: "Which files do you want to generate?",
      choices: ["controller", "interface", "model", "routes", "service"],
      validate: (choices) =>
        choices.length > 0 || "You must choose at least one file",
    },
    {
      name: "withTemplate",
      type: "confirm",
      message: "Include boilerplate template?",
      default: true,
    },
  ]);

  const pascal = toPascalCase(folderName);
  const folderPath = path.join(
    process.cwd(),
    "src",
    "app",
    "modules",
    folderName
  );

  console.log(`📁 Creating module in: ${folderPath}`);

  // Create the directory recursively in case src/app/modules doesn't exist
  fs.mkdirSync(folderPath, { recursive: true });

  // Filter out files that already exist
  const filesToActuallyCreate = filesToCreate.filter((type) => {
    const filename = `${folderName}.${type}.ts`;
    const filePath = path.join(folderPath, filename);
    return !fs.existsSync(filePath);
  });

  // Show which files already exist (if any)
  const existingFiles = filesToCreate.filter((type) => {
    const filename = `${folderName}.${type}.ts`;
    const filePath = path.join(folderPath, filename);
    return fs.existsSync(filePath);
  });

  if (existingFiles.length > 0) {
    console.log(
      `⚠️  Skipping existing files: ${existingFiles.map((type) => `${folderName}.${type}.ts`).join(", ")}`
    );
  }

  if (filesToActuallyCreate.length === 0) {
    console.log(`✅ All selected files already exist in ${folderName} module`);
    process.exit(0);
  }

  for (const type of filesToCreate) {
    const filename = `${folderName}.${type}.ts`;
    const filepath = path.join(folderPath, filename);

    if (withTemplate) {
      copyAndReplaceTemplate(type, folderPath, pascal, folderName);
    } else {
      fs.writeFileSync(filepath, `// ${filename}`);
    }
  }

  console.log(
    `✅ Created ${filesToActuallyCreate.length} new files in ${folderName} module: ${filesToActuallyCreate.join(", ")}`
  );
})();
