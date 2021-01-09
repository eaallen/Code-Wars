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

function parseInt (number_str){
    if(number_str === 'one million'){return 1000000}
    if(number_str === 'zero'){return 0}

    number_str = number_str.replace(/^\s(and \s)$/g, '') // get rid of "and"

    // set up for conversion 
    let number_arr = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
    let tens_arr =   ['placeholder 0','placeholder 1','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety',]

    // make the string an array
    let num = number_str.split(' ').reverse()
    console.log(number_str.split(' '),"<--")
    console.log(num)

    let new_num = []

    // yes, a good ol for loop
    for(let i = 0; i<num.length; i++){
        if(number_arr.indexOf(num[i])!==-1){
            let created_num = number_arr.indexOf(num[i]).toString()
            if(created_num.length >1){
                created_num = created_num.split('')
                created_num.reverse().map(x=>new_num.unshift(x))
            }else new_num.unshift(created_num)
        }

        if(tens_arr.indexOf(num[i])!==-1){
            new_num.unshift(tens_arr.indexOf(num[i]).toString()+'0')
        }

        if(number_arr.indexOf(num[i])===-1 && number_arr.indexOf(num[i-1])===-1){
            // new_num+="00"
        }

        if(num[i].includes('-')){
            let arr= num[i].split('-')
            new_num.unshift(number_arr.indexOf(arr[1]).toString())
            new_num.unshift(tens_arr.indexOf(arr[0]).toString())
        }

        if(num[i]==='hundred'){
            switch (new_num.length) {
                case 0:
                case 3:
                    new_num.unshift('0')
                    new_num.unshift('0')
                    break;
                case 1:
                case 4:
                    new_num.unshift('0')
                    break
              
            }
         } 
        if(num[i]==='thousand'){
            switch (new_num.length) {
                case 0:
                    new_num.unshift('0')
                    new_num.unshift('0')
                    new_num.unshift('0')
                    break;
                case 1:
                    new_num.unshift('0')
                    new_num.unshift('0')
                    break
                 case 2:
                     new_num.unshift('0')
                     break
                 
            }
         } 
    } 
    return Number(new_num.join(''))
}


function handleClick(string){
    let num = parseInt(string)
    document.getElementById('output').innerHTML = num
}
