function formateDate(date){
    return new Date(date).toLocaleDateString()
}

function formatNumber(number){
    return number.toFixed(2)
}

function formateUser(user){
    return user + "HIHIHI"
}

module.exports ={
    formateDate,
    formateUser,
    formatNumber
}