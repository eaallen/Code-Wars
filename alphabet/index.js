/***********************************************************
 * cba => abc; egyt => egty
 **********************************************************/

function alpha(str){
   return str.split("").sort().join('')
}


console.log(alpha('1, edfgrhea'))
console.log(alpha('1,edfgrhea'))