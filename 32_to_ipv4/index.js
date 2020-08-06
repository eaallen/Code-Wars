/***********************************************************
 * In this kata we want to convert a string into an integer. 
 * The strings simply represent the numbers in words.

Examples:

"one" => 1
"twenty" => 2'0'
"two hundred forty-six" => 246
"seven hundred eighty-three thousand nine hundred and nineteen" => 783919
Additional Notes:

The minimum number is "zero" (inclusively)
The maximum number, which must be supported is 1 million (inclusively)
The "and" in e.g. "one hundred and twenty-four" is optional,
in some cases it's present and in others it's not
All tested numbers are valid, you don't need to validate them
*********************************************************/

function num_convert(number_str){
    number_str = number_str.toLowercase()
    if(number_str === 'one million'){return '1,000,000'}
    if(number_str === 'zero'){return '0'}
    
    let num_arr = number_str.split(' ')
    let new_num = ''
    for(const item of num_arr){

       new_num += _switch(item)

    }    
}

function read (number_str){
    let number_arr = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',]
    let tens_arr =   ['zero90saew','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety',]
    let num = number_str.split(' ').reverse()
    console.log(num)
    let new_num = []
    for(let i = 0; i<num.length; i++){
        if(number_arr.indexOf(num[i])!==-1){
            new_num.unshift(number_arr.indexOf(num[i]).toString())
        }
        if(tens_arr.indexOf(num[i])!==-1){
            new_num.unshift(tens_arr.indexOf(num[i]).toString()+'0')
        }
        if(number_arr.indexOf(num[i])===-1 && number_arr.indexOf(num[i-1])===-1){
            // new_num+="00"
        }
        if(num[i].includes('-')){
            let arr= num[i].split('-')
            
            new_num.unshift(tens_arr.indexOf(arr[0]).toString()+number_arr.indexOf(arr[1]).toString())
         
        }
    } 
    return new_num.join('')
}


console.log(read('twenty-one forty-eight ninety-nine'))


//'0''0''0''0'1'0'1'0'.'0''0''0''0''0''0''0''0'.'0''0''0''0''0''0''0''0'.'0''0''0''0''0''0''0'1

function _switch(item){
    switch(item){
        case 'zero':
            return '0'
            
        case 'one':
            return '1'
            
        case 'two':
        case 'twenty':
            return '2'
            
        case 'three':
        case 'thirty':
            return '3'
            
        case 'four':
        case 'forty':
            return '4'
            
        case 'five':
        case 'fifty':
            return '5'
            
        case 'six':
        case 'sixty':
            return '6'
            
        case 'seven':
        case 'seventy':
            return '7'
            
        case 'eight':
        case 'eighty':
            return '8'
            
        case 'nine':
        case 'ninety':
            return '9'
            
        case 'ten':
            return '10'
            
        case 'eleven':
            return '11'
            
        case 'twelve':
            return '12'
            
        case 'thirteen':
            return '13'
            
        case 'fourteen':
            return '14'
            
        case 'fifteen':
            return '15'
            
        case 'sixteen':
            return '16'
            
        case 'seventeen':
            return '17'
            
        case 'eighteen':
            return '18'
            
        case 'nineteen':
            return '19'
            
    }
    
}

function get_zero(){
    return '0'
}

