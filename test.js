const fs=require('fs');
const file=process.argv[2];
const {evalExpr}=require(file);
const pub=JSON.parse(fs.readFileSync('./cases.json','utf8'));
const extra=[
 [" 1 + 2 ",3],["-5+3",-2],["2*-3",-6],["2/-4",-0.5],["--5",5],["2--3",5],["(-5)",-5],
 ["0.5*2",1],[".5+.5",1],["1/3",1/3],["0",0],["((1))",1],["10-2*3",4],["100/10/2",5],
 ["3.14159*2",6.28318],["1+2+3+4",10],["(2+3)*(4+5)",45],["8/2/2",2],["2.5*4",10],["0-0",0],
 ["999999*999999",999998000001],
 ["1.5/0.5",3],
 ["(1+2)*(3+4)*(5+6)",231],
 ["10/(2+3)",2],
];
let fail=0, n=0;
for(const c of pub){n++;const got=evalExpr(c.in);if(!(Math.abs(got-c.out)<1e-9)){fail++;console.log('PUB FAIL',c.in,'got',got,'want',c.out)}}
for(const [inp,want] of extra){n++;let got;try{got=evalExpr(inp)}catch(e){got='THREW:'+e.message}
  if(Number.isNaN(want)){ if(got===got){fail++;console.log('EXTRA FAIL',JSON.stringify(inp),'got',got,'want NaN')} continue; }
  if(!(typeof got==='number'&&Math.abs(got-want)<1e-9)){fail++;console.log('EXTRA FAIL',JSON.stringify(inp),'got',got,'want',want)}}
console.log(file,'fails:',fail,'/',n);
