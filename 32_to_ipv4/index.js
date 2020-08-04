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
    let num_arr = number_str.split(' ')
    let new_num = ''
    for(const item of num_arr){

        switch(item){
            case 'zero':
                new_num+='0'
                break;
            case 'one':
                new_num+='1'
                break;
            case 'two':
            case 'twenty':
                new_num+='2'
                break;
            case 'three':
            case 'thirty':
                new_num+='3'
                break;
            case 'four':
            case 'forty':
                new_num+='4'
                break;
            case 'five':
            case 'fifty':
                new_num+='5'
                break;
            case 'six':
            case 'sixty':
                new_num+='6'
                break;
            case 'seven':
            case 'seventy':
                new_num+='7'
                break;
            case 'eight':
            case 'eighty':
                new_num+='8'
                break;
            case 'nine':
            case 'ninety':
                new_num+='9'
                break;
            case 'ten':
                new_num+='10'
                break;
            case 'eleven':
                new_num+='11'
                break;
            case 'twelve':
                new_num+='12'
                break;
            case 'thirteen':
                new_num+='13'
                break;
            case 'fourteen':
                new_num+='14'
                break;
            case 'fifteen':
                new_num+='15'
                break;
            case 'sixteen':
                new_num+='16'
                break;
            case 'seventeen':
                new_num+='17'
                break;
            case 'eighteen':
                new_num+='18'
                break;
            case 'nineteen':
                new_num+='19'
                break;
        }


    }
    console.log(new_num)



    
}

num_convert('three four five')


//'0''0''0''0'1'0'1'0'.'0''0''0''0''0''0''0''0'.'0''0''0''0''0''0''0''0'.'0''0''0''0''0''0''0'1