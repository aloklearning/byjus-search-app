# JustSearch!

JustSearch was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4. It is an angular web job search prototype, having the endpoint provided by **BYJU'S LEARNING APP**

## Features

- Webpage is completely responsive
- Displays pagination
- Single Sign in functionality via firebase
- No search engines used, complete coding work
- Can search/filter jobs based upon the specified field
    - User select the expirence or location or skill to search jobs
    - Any double fields searching
    - Any triple fields searching
    - All fields searching
- Displays all job listings
- Displays the total number of jobs found
- Displays the total number of jobs found based on user search

## Assumptions

- **Display all expiring jobs listing** - All job listings along with the expiring jobs is getting listed for smooth pagination effect
- **SSO Implementation** - Single sign in with Firebase will suffice for this with user checks `isLoggedIn` and making page transition accordingly
- **User is able to sort based on job location and experience** - For this two field search is enabled, sorting definitely is not filtering but we produce the result based upon those items, and the page does that

## Website

- You can visit the website for live results on [JustSearch](http://just-search.surge.sh/)
- Credentials to login, these are the details
    - **Email** - `testuser@gmail.com`
    - **Passsword** - *password*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a dev server.

### Checklist

- [x] Code accompanies the Unit Tests
- [x] Usage is clearly mentioned in the README file, This including setup the project, how to run it, how to run unit test, examples 
- [x] Uses the endpoint directly

### Prerequisites

Before running the project on your localhost, please ensure these points:
- You have **npm** in your box, if not than follow this link [NPM](https://www.npmjs.com/get-npm)
- Angular(Latest i.e., v8.3.4) `Preferred` is installed in your system, if not follow this link [Angular CLI](https://github.com/angular/angular-cli)
- Go to your root folder and install the packages `npm install` to avoid any packages conflicts


### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Built With

- [Angular](https://angular.io/) - The javascript web framework used
- [Typescript](https://www.typescriptlang.org/docs/home.html) - Programming language used
- [Bootstrap4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - Stlying
- [Surge](https://surge.sh/help/getting-started-with-surge) - For hosting

## Author

- **Alok Kumar** - *Coding and Implementation*

## Acknowledgements

- BYJU'S Learning App for the opportunity and the endpoint
- Hat tip to anyone whose code was used
- Inspiration

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)
