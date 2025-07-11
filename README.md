# Express Module Generator

Generate Express TypeScript modules with boilerplate templates.

## How to run
cd to your express project directory root and run:

```bash
npx make-express-module
npx github:faisal-akbar/express-module-generator

```

This will:
1. Prompt for module name
2. Let you choose which files to generate (controller, interface, model, routes, service, validation)
3. Ask if you want module file templates
4. Create files in `src/app/modules/{moduleName}/`