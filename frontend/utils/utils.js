//const ethers = require("ethers");

const utils = {
    moveDecimalLeft: (str, count) => {
        let start = str.length - count;
        let prePadding = "";

        while(start < 0){
            prePadding += "0";
            start += 1;
        }

        str = prePadding + str;
        let result = str.slice(0, start) + "." + str.slice(start);
        if(result[0] == "."){
            result = "0" + result;
        }

        return result;
    }
}

export default utils;