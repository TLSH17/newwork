export function formateDate(date: Date){
    return new Date(date).toLocaleString();
}

export function formatNumber(number: number){
    return number.toFixed(2)
}

export type User = {
    title: string
}

export function formateUser(user:User){
    return user.title + "hihihihi"
}

export default {
    formateDate,
    formateUser,
    formatNumber
}