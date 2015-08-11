# react-components
Reusable react components

The master-branch holds a component-development-environment-template. in short: CODET (totaly made up)

- To start, create a new branch named by your component (e.g. react-numeral-input)
- execute `npm install`.
- edit the name-property in `package.json` coresponding to the component-name .
- you can develop component-classes in `./src`.
- a Development-Server can be started with `npm start`.
- `npm build` will transpile your classes to es5 and saves them to `./modules`. (which is also executed implicitly when dev-server starts.)
- change [component] in `"main": "./modules/[component].js"` to your component main-class, to make the module import work later on.

