# extended-build-manager-webpack-plugin

Manage files and directories (copy, create and delete) run commands and better management of the compilation progress in the console.

## Install
`npm install extended-build-manager-webpack-plugin --save-dev`

## Usage

It is included in the same way as all webpack plugins.

### Example

In this example, it simulates a situation in which, in addition to compiling the project with webpack, it is uploaded to a staging branch with git.

webpack.config.js:

```js
const ExtendedBuildManagerWebpackPlugin = require('extended-build-manager-webpack-plugin');

module.exports = {
    ...
    ...
    plugins: [
        new ExtendedBuildManagerWebpackPlugin({
            onStart: [
                {
                    "name": "BuildSprites",
                    "title": "Building sprites ...",
                    "description": "Build sprites using the npm plugin",
                    "command": "npm run build:sprites"
                },
                {
                    "name": "PullBranch",
                    "title": "Move to staging branch folder and pull ...",
                    "description": "Pull the current proyect branch in git",
                    "command": "cd ../../staging/myProyect && git pull"
                },
                {
                    "name": "DeleteDistBranchFolder",
                    "title": "Remove dist branch folder ...",
                    "description": "Remove dist branch folder",
                    "distManager": [
                        { delete: [ `../../staging/myProyect/dist` ] }
                    ]
                }
            ],
            onEnd: [
                {
                    "name": "CopyDistFolderToBranch",
                    "title": "Copy dist folder to branch ...",
                    "description": "Copy dist folder to branch",
                    "distManager": [
                        { copy: [ { source: "./dist", destination: "../../staging/myProyect/dist" } ] }
                    ]
                },
                {
                    "name": "CommitBranch",
                    "title": "Commit branch ...",
                    "description": "Commit the current proyect branch in git",
                    "command": `cd ../../staging/myProyect && git add . && git commit -m "deploy to staging"`
                }
            ]
        })
    ]
    ...
}
```

## Options

All these functions help when displaying different messages in the compilation process in the console.

Please complete all the information you can.

### Events

These two events run before and after webpack builds, a message will be displayed in the middle when the webpack progress itself is running.

* `onStart`: Commands to execute before Webpack begins the bundling process
* `onEnd`: Commands to execute after Webpack has finished the bundling process

### Information

These three elements will help you understand the messages of the console in the progress of the compilation.

* `name`: Name of the process, this must be unique (there should not be two objects with the same name)
* `title`: Title of this step in the compilation, this will help you understand what is printed on the console when compiling
* `description`: Description of this step in the compilation, this will help you understand what is printed on the console when compiling

### Actions

You can use these two types of functions.

#### Command

Here you can run any command, you can concatenate them in the same way you do in the package.json.

Only string type are supported.

Example: `"cd ./dist && nodemon index.js"`

#### Dist Manager

With this action you can manage files or folders.

|Name|Description|Example
|:--:|:----------|:-----|
|**`copy`**|Copy individual files or entire directories from a source folder to a destination folder. Also supports glob pattern |copy: [<br /> { source: 'dist/bundle.js', destination: '/home/web/js/'<br /> }<br />]
|**`delete`**|Delete individual files or entire directories. |delete: [<br />'file.txt', '/path/to'<br />]

## Tips

* You can use git and the file manager of this plugin in the commands to update it automatically.
* If you use Angular SSR (server side rendering) you can handle the different constructions with a series of commands.