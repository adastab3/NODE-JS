function factorial (num){
    if(num === 0 || num ===1){
        return 1
    }else {
        for (let i = num -1; i >=1; i--){
            num =num*1
        }
        return num
    }

}
module.exports = factorial