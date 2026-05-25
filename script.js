function evaluatePostfix() {

  const expr = document.getElementById("expression").value;
  const stack = [];

  for (let ch of expr) {

    if (!isNaN(ch)) {
      stack.push(Number(ch));
    }
    else {

      let b = stack.pop();
      let a = stack.pop();

      switch(ch) {
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
      }
    }
  }

  document.getElementById("result").innerText =
    "Result: " + stack.pop();
}
