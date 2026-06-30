function precedence(op) {

    if (op === '+' || op === '-')
        return 1;

    if (op === '*' || op === '/')
        return 2;

    if (op === '^')
        return 3;

    return 0;
}

function infixToPostfix(expr) {

    let stack = [];
    let postfix = "";

    for (let ch of expr) {

        if (ch === " ")
            continue;

        if (!isNaN(ch) || /[A-Za-z]/.test(ch)) {

            postfix += ch;

        }
        else if (ch === '(') {

            stack.push(ch);

        }
        else if (ch === ')') {

            while (stack.length && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
            }

            stack.pop();
        }
        else {

            while (
                stack.length &&
                (
                    precedence(stack[stack.length - 1]) > precedence(ch) ||
                    (
                        precedence(stack[stack.length - 1]) === precedence(ch) &&
                        ch !== '^'
                    )
                )
            ) {
                postfix += stack.pop();
            }

            stack.push(ch);
        }
    }

    while (stack.length) {
        postfix += stack.pop();
    }

    return postfix;
}

function evaluatePostfix(expr) {

    let stack = [];

    for (let ch of expr) {
        console.log(ch);

        if (ch === " ")
            continue;

        if (!isNaN(ch)) {

            stack.push(Number(ch));

        }
        else {

            let b = stack.pop();
            let a = stack.pop();

            switch (ch) {

                case '+':
                    stack.push(a + b);
                    break;

                case '-':
                    stack.push(a - b);
                    break;

                case '*':
                    stack.push(a * b);
                    break;

                case '/':
                    stack.push(a / b);
                    break;

                case '^':
                    stack.push(Math.pow(a, b));
                    break;

                default:
                    return "Invalid Operator";
            }
        }
    }

    return stack.pop();
}

function convertToPostfix() {

    const expr = document.getElementById("expression").value;

    const postfix = infixToPostfix(expr);

    document.getElementById("expression").value = postfix;

    document.getElementById("result").innerText =
        "Postfix Expression: " + postfix;
}

function evaluateOnly() {

    const expr = document.getElementById("expression").value;

    const result = evaluatePostfix(expr);

    document.getElementById("result").innerText =
        "Result: " + result;
}
