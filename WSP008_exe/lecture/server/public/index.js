console.log("i'm frontend js")


// ###############
// Form Demo
// ###############
// document.querySelector('#contact-form').addEventListener('submit', async function (event) {
//     event.preventDefault()

//     // Serialize the Form afterwards
//     const form = event.target
//     const formObject = {}
//     formObject['firstName'] = form.firstName.value
//     formObject['lastName'] = form.lastName.value
//     formObject['email'] = form.email.value
//     formObject['age'] = form.age.value
//     formObject['description'] = form.description.value
//     const res = await fetch('/contact', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formObject),
//     })
//     const result = await res.json()
//     document.querySelector('#contact-result').innerHTML = result
// })

// ###############
// File Upload Demo
// ###############
// document.querySelector('#contact-form').addEventListener('submit', async function (event) {
//     event.preventDefault()

//     // Serialize the Form afterwards
//     const form = event.target
//     const formData = new FormData()

//     formData.append('firstName', form.firstName.value)
//     // formData.append('lastName', form.lastName.value)
//     // formData.append('email', form.email.value)
//     formData.append('profile', form.profile.files[0])

//     const res = await fetch('/contact', {
//       method: 'POST',
//       body: formData,
//     })
//     const result = await res.json()
//     document.querySelector('#contact-result').innerHTML = result.success
//   })


// ###############
// Bonus
// ###############
function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("loadend", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    });

    if (file) {
        reader.readAsDataURL(file);
    }

}

document.querySelector('#preview_btn').addEventListener('click', async function (event) {
    event.preventDefault();
    previewFile()
})

// function submitFile() {
//     // const preview = document.querySelector('img');
//     const file = document.querySelector('input[type=file]').files[0];
//     const reader = new FileReader();

//     reader.addEventListener("loadend", function () {
//         // convert image file to base64 string
        
//     });

//     if (file) {
//         reader.readAsDataURL(file);
//     }

// }

