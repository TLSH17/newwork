// let student ={
//     name:'Peter',
//     age: 30,
// }

// student = {
//     name : 'mary',
//     age: 21,
// }

type Student ={
    name :string
    age: number
    classes?: Array<Class>
}

type Class = {
    name: string
    teacher?: Array<string>
    date: Date
}

let class_1: Class ={
    name: 'CS50',
    date: new Date(Date.now())
}

let student_1:Student = {
    name: 'peter',
    age: 24,
    classes:[class_1,]
}