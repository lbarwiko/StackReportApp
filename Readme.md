# Stack Report

## First Things First
There's a few things you're going to need to install
* NodeJs
    * https://nodejs.org/en/download/
* Homebrew
    * https://brew.sh/ ( You may need to install Ruby also )
* Postgres
    * https://launchschool.com/blog/how-to-install-postgresql-on-a-mac
* IonicFramework
    * https://ionicframework.com/getting-started/


## Organization
The application is going to consist of various services. These services all should act independent of each other and act as if none of the others exist.

We bring the services together via our reverse proxy (located in /proxy/) or by communicating through Celery and RabbitMQ.
The services are:
* Rest Api
    * This will handle user authentication, payment verification, and other REST requests.
    * Stack: NodeJs, ExpressJS (Using es6), Postgres, Redis
* Mobile
    * This is our main frontend. This is the app itself and also the website.
    * Stack: Ionic Framework (AngularJs, Cordova)
* WWW
    * The public web facing portal of our website. We can eventually port our ionic web-front to this. This is not going to be developed in as the development of our website will mostly be done in 'Mobile', this folder is more here to be ready for deployment.
    * Stack: ExpressJs, (Later AngularJs)
* Reverse Proxy
    * This is the reverse proxy which will be the first server to handle requests and then forward those requests to the relevant server. This could also be setup later to handle load balancing of any of our API's.
    * Stack: NodeJs, ExpressJS
* Predicton
    * This is the meat of our project. This will take a parsed dataset and return a prediction of a mutual fund's holdings
    * Stack (TBD and likely to change): Django (Or flask, or some python framework)
* Data Parser
    * This will automatically find the relevant NYSE data and then parse it into a format that the Prediction service can handle
    * Stack: (TBD, likely some python framework)
* Tasks
    * We need to tell our application to run our algorithm. We need to tell it to grab use our Data Parser and then feed that Data Parser data to our Prediction Service. This Tasks service will coordinate that.
    * Stack: Celery, RabbitMQ


## Installation / Setup
First clone the resposity:
```
git clone https://<INSERT USERNAME>@bitbucket.org/441fintech/stacks.git
```
If you're familiar with NodeJS, you'll know that the package.json is the file that tells npm (Node Package Manager) to get all the libaries need for the project. Right now each service has a package.json, but none of the libaries are installed yet. To install them you'll have to go to the following folders:
* /proxy/
* /www/
* /restApi/
And then in each of those respective folders you'll need to use the command
```
npm install --save
```

## Running the Application
I have created a bash script to run restApi, proxy, www, and mobile. To do so simply type
```
./bin/servers start
```
at the root directory of the project.


