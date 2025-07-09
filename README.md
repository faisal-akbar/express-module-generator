# Express Module Generator

Generate Express TypeScript modules with boilerplate templates.

## Installation

```bash
# Use with npx (recommended)
npx express-module-generator

# Or install globally
npm install -g express-module-generator
generate-module
```

## Usage

Run the command in your Express TypeScript project root:

```bash
npx express-module-generator
```

This will:
1. Prompt for module name
2. Let you choose which files to generate (controller, interface, model, routes, service)
3. Ask if you want boilerplate templates
4. Create files in `src/app/modules/{moduleName}/`

## Features

- ✅ Interactive CLI
- ✅ TypeScript templates
- ✅ Mongoose models
- ✅ Express routes
- ✅ Service layer pattern
- ✅ Skip existing files