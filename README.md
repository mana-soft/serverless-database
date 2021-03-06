# ManaSoft database package

* [Usage](#usage)
* [Configure](#configure)
* [Create](#create)
* [Develop](#develop)
* [Test](#test)
    * [Test import package](#test-import-package)
    * [Unit tests](#unit-tests)
* [Deploy](#deploy)

----

## Usage
```javascript
const db = require('@mana-soft/serverless-database');

db.init({}, (err, payload) => {
    payload.knex('company as c')
    .select()
    .where('c.id', 44)
    .then((res) => {
        console.log('RES');
        console.log(res);
    })
    .catch((err) => {
        console.log('ERR');
        console.log(err);
    })
    .finally(() => {
        db.release();
    });
});
```
Here we create a new database instance on call, then we need to release it when we don't need it anymore.

---

## Configure
(once for all @mana-soft packages)
* Create an npm account
* Ask for an admin to add your account to the oraganization
* Log in your CLI
```
$ npm login
```

## Create
* Copy this folder
* Run command
```
$ git init
```
* In the file `package.json`
    * Change `name` field (must begin with `@mana-soft/`)
    * Change `repository` field
* Change required file in `index.js` (must begin with `lib/`)
* Change file name in the `src` folder to match the name above

## Develop
* Import your modules with command
```
$ npm install --save MODULE_NAME
```
* Develop in the `src` folder
* Build your code with the command (it will put your files in `lib/`)
```
$ npm run build
```

## Test
### Test import package
If you want to locally test your code, you can do it without deploying a new version.
* In your package folder run command (as root)
```
# npm ln
```
It will create a symbolic link from `/usr/local/lib/node_modules/@mana-soft/PACKAGE_NAME` to your package
* (Optional) Watch your files to auto rebuild at save
```
$ npm run watch
```
* Go to the project which will use your package
* Install the dependencies
```
$ npm install
```
* Then run command
```
$ npm ln @mana-soft/PACKAGE_NAME
```
* If your package require new dependencies from previous version or has been deployed yet, you should install the dependencies by your own (without saving them)
```
$ npm install MODULE
```
! Running the command npm install will override the link and you will have to reinstall it !

### Unit tests
```
$ npm run test
```

## Deploy
* Push your changes on remote branch
* Create and merge a pull request to master
* Change version of your package
```
$ npm version <major|minor|patch|premajor|preminor|prepatch|prerelease>
```
It will change the `package.json` version and will create a commit with the new version.  
If you want to deploy to prod, use `major`, `minor` or `patch`. If you want to create a new dev version use `premajor`, `preminor` or `prepatch` for the first version, then use `prerelease`.
```
$ npm version minor
v0.1.0
$ npm version patch
v0.1.1
$ npm version major
v1.0.0
$ npm version preminor
v1.1.0-0
$ npm version prerelease
v1.1.0-1
$ npm version minor
v1.1.0
```
* Push commit with tags
```
$ git push --tags
```
A Github action will run automatically and will deploy the package.