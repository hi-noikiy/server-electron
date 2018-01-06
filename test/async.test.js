async function f() {
    
    return  'hello world';
  }
  
var m = f();
console.log(m)
m.then(v => console.log(v));
