function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    if (op === '^') return 3;
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

    const stack = [];

    for (let ch of expr) {

        if (ch === " ")
            continue;

        if (!isNaN(ch)) {
            stack.push(Number(ch));
        }

        else {

            if (stack.length < 2) {
                return "Invalid Postfix Expression";
            }

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
                    stack.push(a ** b); // or Math.pow(a, b)
                    break;

                default:
                    return "Invalid Operator";
            }
        }
    }

    if (stack.length !== 1)
        return "Invalid Postfix Expression";

    return stack.pop();
}

function processExpression() {

    const expr = document.getElementById("expression").value.trim();

    // If expression contains parentheses, treat it as infix.
    const isInfix = expr.includes("(") || expr.includes(")");

    if (isInfix) {

        const postfix = infixToPostfix(expr);

        if (/[A-Za-z]/.test(postfix)) {

            document.getElementById("result").innerText =
                "Postfix Expression: " + postfix;

        } else {

            const result = evaluatePostfix(postfix);

            document.getElementById("result").innerText =
                "Postfix Expression: " + postfix +
                "\nResult: " + result;
        }

    } else {

        const result = evaluatePostfix(expr);

        document.getElementById("result").innerText =
            "
