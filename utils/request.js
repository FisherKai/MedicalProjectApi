/**
 * 请求参数处理插件
 */
/**
 * 判断参数是否有空
 * @param  {...any} args 
 * @returns 
 */
function Validation(...args) {
    for (const item in args) {
        if (args[item] == '' || args[item] == null)
            return false;
    }
    return true;
}

module.exports = {
    Validation
}