function fn() {
	let m = 10;
	//this.m = m;
}
fn.prototype.aa = function () {
	console.log(this.m);
};
fn.prototype.m = function () {
	console.log(m);
return 100;
};
let f = new fn();
console.log(f.constructor());
 async function f1() {
	// await
}
