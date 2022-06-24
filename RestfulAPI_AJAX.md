##RESTFUL API

####Fetch
包住body/para..url send 去server
promise-based HTTP client libarary

拆貨
```js
.urlencoded({extended:true})
.json()
```

JS(拆貨+砌, 但會用user 機resource) -> TS 接轉HTML (都可以係到砌，但會食server) -> html update番
**最好係JS 果邊打console.log("XXX"), make sure can connect.

AJAX Form
```js

 const res = await fetch('/contact', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
      //會再有個return 走左出黎
 }
    const result = await res.json()
    // res 對應番上面個variable (自己之前定義的, 不是system有function!!)
    document.querySelector('#contact-result').innerHTML = result
    //嘔番個html code出黎

```

AJAX Upload file
```js
document
  .querySelector('#contact-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault() // get

    // Serialize the Form afterwards
    const form = event.target
    const formData = new FormData() //class 寫法，整左個盒

    formData.append('firstName', form.firstName.value) //放野入盒
    formData.append('lastName', form.lastName.value)
    formData.append('email', form.email.value)
    formData.append('profile', form.profile.files[0])

    const finallyresult = await fetch('/contact', {  
      method: 'POST',
      body: formData,
    })
    //收到個箱(method: POST, body:formData )


    const result = await finallyresult.json()
    //拆箱
    document.querySelector('#contact-result').innerHTML = result
    //嘔番個html code出黎
  })
```


form.default method:
GET

So, event.preventDefault() is GE


