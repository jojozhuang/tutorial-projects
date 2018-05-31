const { spawn } = require('child_process');
const path = require('path');

module.exports = {
  // compile the given c source file and execute it.
  clang(srcfile) {
    // if srcfile = 'main.java'
    console.log(`__dirname:${__dirname}`);

    const file = `${__dirname}/${srcfile}`;
    console.log(file);
    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java
    if (extension === '.c') {
      const argsCompile = []; // ['codec.c', '-o','codec.out']
      argsCompile[0] = file;
      argsCompile[1] = '-o';
      argsCompile[2] = `${__dirname}/${filename}.out`;
      const cmdRun = `${__dirname}/${filename}.out`;
      this.execute(__dirname, 'gcc', argsCompile, cmdRun, []);
    } else {
      console.log(`${file} is not a c file.`);
    }
  },

  // compile the given java source file and execute it.
  java(srcfile) {
    // if srcfile = 'main.java'
    console.log(`__dirname:${__dirname}`);

    const file = `${__dirname}/${srcfile}`;
    console.log(file);
    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java
    console.log(`filename:${filename}`);
    if (extension === '.java') {
      const argsCompile = [];
      argsCompile[0] = file;
      const argsRun = [];
      argsRun[0] = 'HelloJava';
      console.log(argsRun);
      this.execute(__dirname, 'javac', argsCompile, 'java', argsRun);
    } else {
      console.log(`${file} is not a java file.`);
    }
  },

  // compile source file and execute it.
  execute(currDirectory, cmdCompile, argsCompile, cmdRun, argsRun) {
    const options = { cwd: currDirectory }; // set working directory for child_process

    console.log(`execute: ${argsRun[0]}`);
    // var compile = spawn('gcc', ['codec.c', '-o','codec.out']);
    // var compile = spawn('javac', ['CodeJava.java']);
    const compile = spawn(cmdCompile, argsCompile);
    compile.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    compile.stderr.on('data', (data) => {
      console.log(`stderr: ${String(data)}`);
    });
    compile.on('close', (data) => {
      if (data === 0) {
        console.log(`cmdRun: ${cmdRun}`);
        const run = spawn(cmdRun, argsRun, options);
        run.stdout.on('data', (output) => {
          console.log(String(output));
        });
        run.stderr.on('data', (output) => {
          console.log(`stderr: ${String(output)}`);
        });
        run.on('close', (output) => {
          console.log(`stdout: ${output}`);
        });
      }
    });
  },
};
