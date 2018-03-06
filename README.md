# Drug Vial Optimization

This project

## Requirements

At the minimum you will need Node.js installed to use the the 'fs' (File System) module. You will also need npm if you want to install additional development/testing dependencies.

## Installation

If you do not have Node.js or npm, visit [Node.js.org](https://nodejs.org/en/) to download the lastest version of Node.js. To install, open the .pkg (MacOS) or the .msi (Windows) and follow installation instructions. You can then install additional testing and development dependencies.

If you wish to install the additional dependencies, access the Terminal (MacOS) or the Command-Line (Windows), and navigate to the root directory of this project. Type `npm install` in the prompt and hit the ENTER key.

**NOTE** _If using mac you may get a 'permission denied' error. In this case, run the command_`sudo npm install` _. You may be prompted for you password, which will be the same as your login password if you are the sole user._

## Usage

{PlaceHolder: Finish me later after completing documentation for createWasteRows.js and calculateWaste.js
as well as modifying the current file system to use the priceLists/ destination and base file directories,
and moving all js files to a folder (excpetion being a RUNANALYSIS.js or somilar file)}

## Running Tests

This application uses Mocha.js and Chai.js for testing, and Istanbul for Code coverage. Tests are stored in the `test/` directory.

To run tests, run the following script in the command line `npm run test` or `nyc mocha`, whichever is easier to remember. This command will run mocha testing and provide results in the terminal as well a provide code coverage via Istanbul. Code coverage logs for Istanbul will be stored in he `.nyc_output` directory.
