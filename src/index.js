function eval() {
    // Do not use eval!!!
    return;
}

const ops = ['+', '-', '*', '/'];
const opsPr = (c) => c === '+' || c === '-' ? 1 : 2

function shuntingYard(str) {
    let res = '', stack = [];
    for (let i = 0; i < str.length; ++i) {
        let c = str[i], tc;
        if (/^\d+$/.test(c))
            res += c;
        else {
            res += res[res.length - 1] !== ' ' ? ' ' : '';
            if (c === '(')
                stack.push(c);
            else
            if (c === ')')
                while ((tc = stack.pop()) !== '(') {
                    if(tc === undefined)
                        throw new Error('ExpressionError: Brackets must be paired');
                    res += tc + ' ';
                }
            else
            if (ops.includes(c)) {
                while (ops.includes(stack[stack.length - 1]) && opsPr(stack[stack.length - 1]) >= opsPr(c))
                    res += stack.pop() + ' ';
                stack.push(c);
            }
        }
    }
    if(stack.includes('('))
        throw new Error('ExpressionError: Brackets must be paired');
    res += res[res.length - 1] !== ' ' ? ' ' : '';
    while((tc = stack.pop()) !== undefined) {
        res += tc + ' ';}
    return res.trim().split(' ');
}

function rPNCalc(rpn) {
    let stack = [];
    for (let i = 0; i < rpn.length; ++i) {
        let c = rpn[i];
        if (/^\d+$/.test(c))
            stack.push(c);
        if (ops.includes(c)) {
            let b = stack.pop(), a = stack.pop();
            switch (c) {
                case '+': stack.push(parseFloat(a, 10) + parseFloat(b, 10)); break;
                case '-': stack.push(parseFloat(a, 10) - parseFloat(b, 10)); break;
                case '*': stack.push(parseFloat(a, 10) * parseFloat(b, 10)); break;
                case '/':
                    if (parseFloat(b, 10) === 0)
                        throw new Error('TypeError: Division by zero.');
                    stack.push(parseFloat(a, 10) / parseFloat(b, 10)); break;
            }
        }
    }
    return stack.pop();
}

function expressionCalculator(expr) {
    return rPNCalc(shuntingYard(expr));
}

module.exports = {
    expressionCalculator
}
