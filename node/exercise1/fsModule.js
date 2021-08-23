// fsModule.js

const fs = require('fs');
// sets up user input prompt
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// writes a new txt file in the same directory
// wx flag will cancel(x) the writeFile fn if file already exists
const writeNewFile = function (name) {
  return fs.writeFile(`${name}.txt`, 'You are awesome', { flag: 'wx'}, err => {
    if (err && err.code === 'EEXIST') {
      // console.log(err);
      // EEXIST is the error code if a file by the same name exists -- found in err object
      getNewName(`${name}.txt already exists!\nPlease choose a different name: `);
    } else {
      // if file does not exist and is successfully created, 
      // readline object closes and no more user input is accepted
      console.log(`${name}.txt created`);
      readline.close();
    }
  });
};


// gets user input from terminal... passes user input as argument for readline.question
const getNewName = function(prompt) {
  return readline.question(prompt, name => {
    writeNewFile(name);
  });
};

// invokes fn to get user input from terminal
console.log(getNewName('New file name: '));



// REFERENCES:
// [writeFile link] - https://nodejs.dev/learn/writing-files-with-nodejs
// [readline.question link] - https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs
// ['wx' flag link] - https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js