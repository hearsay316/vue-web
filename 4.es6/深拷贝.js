function deepCopy(obj, hash = new WeakMap()) {
  if (obj == null) return obj;
  if (typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (hash.has(obj)) return hash.get(obj);
  let result = new obj.constructor();
  hash.set(obj, result);
  // result 是对象引用类型

  let allDesc = Object.getOwnPropertyDescriptors(obj);

  // 获取源对象所有的 Symbol 类型键
  let symKeys = Object.getOwnPropertySymbols(obj);
  //  console.log(allDesc,1,symKeys,2)
  // 拷贝 Symbol 类型键对应的属性
  if (symKeys.length > 0) {
    symKeys.forEach(symKey => {
      result[symKey] = deepCopy(obj[symKey], hash);
    });
  }

  // 拷贝不可枚举属性,因为 allDesc 的 value 是浅拷贝，所以要放在前面
  // result = Object.create(
  //     Object.getPrototypeOf(result),
  //     allDesc
  // );

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) result[key] = deepCopy(obj[key], hash);
  }
  return result;
}
let desc = "xwdwed";
let user = {
  name: "zhang",
  age: "28",
  [Symbol("a")]: 235,
    _app:123,
    get app(){
      return this._app;
    },
    set app(value){
        this._app = value
    }
};
console.log(user);
//console.log(deepCopy(desc));
//console.log(user);
console.log(deepCopy(user));
let userCopy = deepCopy(user);
console.log(userCopy.app);
user.app = "5555"
console.log(user.app);
// let obj = {};
// obj.a = obj;
// let a = { name: 1, age: obj };
// console.log(a);
// console.log(deepCopy(a));
