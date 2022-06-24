let color:string|number|Array<number>|Array<string> = 'red'

let test = 1;

let rgb:[number,number,number] =[255,0,255];

color = rgb[0];



function combine <T extends number | string> (a:T, b:T):T{
    if(typeof a == 'number' && typeof b == 'number'){
        let c = a + b;
        return c as T
    }

    if (typeof a == 'string' && typeof b == 'string'){
        let c = a + b;
        return c as T
    }

throw new TypeError('invalid input type')    
}



console.log('1+2 = ', combine(1,2));
console.log('d+d = ', combine('d', 'd'))
