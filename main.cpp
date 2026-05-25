#include <iostream>
#include "stack.h"
using namespace std;

int evaluatePostfix(string exp) {
    Stack s;

    for(char c : exp) {

        if(isdigit(c)) {
            s.push(c - '0');
        }
        else {
            int val1 = s.pop();
            int val2 = s.pop();

            switch(c) {
                case '+': s.push(val2 + val1); break;
                case '-': s.push(val2 - val1); break;
                case '*': s.push(val2 * val1); break;
                case '/': s.push(val2 / val1); break;
            }
        }
    }

    return s.pop();
}

int main() {
    string exp;
    cout << "Enter postfix expression: ";
    cin >> exp;

    cout << "Result = " << evaluatePostfix(exp);

    return 0;
}
