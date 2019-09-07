/*
 * @功能描述: 
 * @作者: 高云蛟
 * @Date: 2019-08-25 12:27:02
 */
// 原始类型
let bool: boolean = true
let num: number = 13
let str: string = 'abc'

// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
let arr3: Array<number | string> = [1, '2']

// 元组
let tuple: [number, string] = [0, '2'] // 特殊数组，限定数组元组类型和个数
tuple.push(2)  // [0 , '2', 2]
// tuple[2] //不允许越界访问

// 函数
let add = (x: number, y: number): number => x + y
let func: (x: number, y: number) => number
func = (a, b) => a + b

//对象
let obj: object = { x: 1, y: 2 }
// obj.x = 100 // wrong
let obj2: { x:number, y:number } = { x: 1, y: 2 }
obj2.x = 100

//void
let noReturn = () => {}
void 0 === undefined

// any
let x  // 可以任意赋值

// never  永远不会有返回值
let error = () => {
    throw new Error()
}

enum Role { // 数字 或者声明字符串
    Teacher, // 0
    Student,  // 1
}

enum Role2 {
    Teacher = 'teacher', // 0
    Student = 'student',  // 1
}

// 接口

interface List {
    id: number,
    name: string
}

interface Result {
    data: List[]
}

function render(result: Result) {
    result.data.forEach((item) => {
        console.log(item.id, item.name)
    })
}

interface StringArray {
    [index: number]: string
}
let charts: StringArray = ['A', 'B']

// 类型别名

type Add = (x: number, y: number) => number //  为定义的函数类型取别名
let typeAdd: Add = (a, b) => a + b

// 可选参数
function addParams(a: number, b: number, c?: number) { //必须放在最后
    return a + b + c!
}
// 默认参数
function addParams2(a: number, b: number, c = 1) { // 可以放在中间，但在调用的时候需要将其写为undefined
    return a + b + c
}
// 剩余参数
function addParams3(x: number, ...rest: number[]) {
    return x + rest.reduce((pre, cur) => pre + cur)
}
// 函数重载
function overload1(...rest: number[]): number
function overload1(...rest: string[]): string
function overload1(...rest: any[]): any {
    let first = rest[0]
    if(typeof first === 'string') {
        return rest.join(',')
    }
    if(typeof first === 'number') {
        return rest.reduce((pre, cur) => pre + cur)
    }
}

overload1(1, 2, 3) // 6
overload1('1', '2', '3') // '123'


// 抽象类   只能被继承
abstract class Animal {
    eat() {
        console.log('eat')
    }
    abstract sleep(): void   // 抽象方法，多态的体现，子类中需要自行实现父类中的抽象方法
}
class Dog extends Animal {
    constructor(name: string) {
        super()
        this.name = name    // 初始化
    }
    name: string // 于ES6不同的是，初始化的时候必须赋初始值，为实例拥有
    run() {}
    sleep() {
        console.log('dog sleep')
    }
}
let dog = new Dog('wangwang')
dog.eat();
dog.sleep()

class Cat extends Animal {
    sleep() {
        console.log('cat sleep')
    }
}
let cat = new Cat();
cat.sleep()


// this 链式调用
class WorkFlow {
    step1() {
        return this;
    }
    step2() {
        return this;
    }
}

new WorkFlow().step1().step2()

class MyFlow extends WorkFlow {
    next() {
        return this;
    } 
}

new MyFlow().next().step1().step2()

// 类和接口 ,类实现接口所有定义
interface Human {
    name: string
}
class Jim implements Human {
    constructor(name: string) {
        this.name = name
    }
    name: string
    sleep() {}
}
// 接口和接口
interface Man extends Human {
    run(): void
}
interface Child {
    cry(): void
}
interface Boy extends Man, Child {}

let boy: Boy = {
    name: '',
    run() {},
    cry() {}
}

// 接口继承类
class Auto {
    state = 1
}
interface AutoInterface extends Auto {}

class C implements AutoInterface {
    state = 1
}

class Bus extends Auto implements AutoInterface {
    // 接口抽离类成员的时候，不仅抽离公共成员，也抽离受保护成员和私有成员
}

// 泛型
function log<T>(value: T): T {
    return value
}
log<string[]>(['a', 'b'])
log(['a', 'b'])

type Log = <T>(value: T) => T
let myLog: Log = log

// 约束接口变量
interface LogInterface{ // 等价类型别名
    <T>(value: T): T
}
let myLog1: LogInterface = log

//约束整个接口
interface LogInterface2<T> {
    (value: T): T
}
let myLog2: LogInterface2<number> = log


// 类型保护   在区块中确定类型
enum Type { Strong, Week }
class Java{
    helloJava() {
        console.log('Hello Java')
    }
}
class JavaScript {
    helloJavaScript() {
        console.log('hello JavaScript')
    }
}

function getLanguage(type: Type) {
    let lang = type === Type.Strong ? new Java() : new JavaScript()
    //普通做法 类型断言
    if((lang as Java).helloJava) {
        (lang as Java).helloJava()  
    }else {
        (lang as JavaScript).helloJavaScript()
    }
    // 类型保护
    if(lang instanceof Java) {
        // 确定为Java
        lang.helloJava()
    } else {
        // 确定为JavaScript
        lang.helloJavaScript()
    }
}