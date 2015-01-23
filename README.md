![icon](QAMetrix-Logo.png)

## QAMetrix UI
A NodeJS User Interface for the QA Metrix project.

PROD URL: <http://qametrix.cengage.info>

## Install Pre-Requisite Apps on Local
install	brew

	ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

install mongo db - <http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/>
	
	brew update
	brew install mongodb

You'll need to configure the data directory for your mongoDB 

install node

	brew install node
	
install git

	sudo npm install -g git

install	bower

	sudo npm install -g bower

install grunt

	sudo npm install -g grunt
	sudo npm install -g grunt-cli

### Start Here if you already have DEV packages installed

Now clone the App Repo

	mkdir /qametrix
	cd /qametrix
	git clone git@github.com:cengage/qametrix.git

At the command line of the app directory
	
	cd {to-your-dir-here} /qametrix
	npm install
	bower install
	grunt server 

###  Troublshooting and Issues

If you have troubles with your installation / configuration, perform the following commands:

    cd {to-your-dir-here} /qametrix
    sudo npm cache clean
    bower cache clean
    rm -rf .bower-cache .bower-registry .bower-tmp public/lib
    npm install -f
    grunt
   	
### You should be up and running now!

<http://localhost:3010/>
