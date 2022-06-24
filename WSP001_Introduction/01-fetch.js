console.log('fetch somtehing')

let fetch = require('node-fetch')

let fs = require('fs')

fetch('http://github.com/').then(res => res.text()).then(body=>{
    console.log('HI')

    // fs.writeFile('index.html',body,()=>)
})