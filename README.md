# Credit Suisse Test

Credit Suisse Developer test. Solution propose is ES6 ,React with Redux and Redux Thunk. Unit test are done by Mocha, Chai and Sinon and Enzyme with shallow render.
Application is doing fetch call to static json file base in public/static/data/ordersSummary.
Application also handling middle state of fetching data, rendering proper data and raising error when data is corrupted or missing,

## Prerequiste
Install node depedecies
```
npm install
```

## Running locally

The following example runs the app locally.

```
npm run start`
```

## Available scripts

#### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

#### `npm test`

Runs the test runner. You can also use `npm run test:watch` to launch the test runner in watch mode.

#### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Assumption
* There was no requirement about responsive design
* There is no requirement about browser support so only tested with newest Chrome
* Assumption is I will get api information as json response . If this will be large amount of results we should be doing pagination. There are 2 approach on this problem:
  * pagination will be done on api side and api response will be extended by link for next results url
  ```
  {
    next: 'http:/api.data/next/2'
  }
  ```
  * frontend will get all results and will have to do pagination by it self by splitting data
