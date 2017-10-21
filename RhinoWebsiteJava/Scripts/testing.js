// run javascript
function hello(str) {
    var name=str;
    return "hello," + name + "!";
}
hello('johnny');

// run Java
function getTime() {
    var date = new java.util.Date();
    return date;
}
getTime();

// call static method of Custom Class
var cs = Packages.Johnny.Tutorials.CustomClass; 
cs.greetStatic('johnny');

// call instance method of Custom Class
var cs = new Packages.Johnny.Tutorials.CustomClass; 
cs.greet('johnny');

// access custom class without using Packages prefix.
var Johnny = Packages.Johnny;
var cs = new Johnny.Tutorials.CustomClass;
cs.greet('johnny');

// without packages prefix
var cs = new Johnny.Tutorials.CustomClass;
cs.greet('johnny');