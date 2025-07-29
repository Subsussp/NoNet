export default function notvalidatedqanandprice(name,value) {
    if(['price','quantity'].includes(name)){
        return ((name == 'quantity' && (!Number.isInteger(+value) || value <= 0 )) || value.split('').some(char => "-_–e".includes(char)) || ((isNaN(value)) || value <= 0)) 
    }
    return false
}