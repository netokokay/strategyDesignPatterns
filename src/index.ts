const inquirer = require('inquirer');

interface Strategy {
  execute(a: number, b: number): number;
}

class ConcreteStrategyAdd implements Strategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

class ConcreteStrategySubtract implements Strategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

class ConcreteStrategyMultiply implements Strategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}

class CalculatorContext {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  executeStrategy(a: number, b: number): number {
    return this.strategy.execute(a, b);
  }
}

const runExercise = async () => {
  let valid = true;
  while (valid) {
    const answers = await inquirer.prompt([
      {
        type: "number",
        name: "firstNumber",
        message: "Digite o primeiro número",
        default: 0,
      },
      {
        type: "number",
        name: "secondNumber",
        message: "Digite o segundo número",
        default: 0,
      },
      {
        type: "string",
        name: "operation",
        message: "Digite a operação",
        default: "+",
      },
    ]);
    const { firstNumber, secondNumber, operation } = answers;
    const calculator = new CalculatorContext(new ConcreteStrategyAdd()); // Defining add as default strategy
    switch (operation) {
      case "+":
        calculator.setStrategy(new ConcreteStrategyAdd());
        break;
      case "-":
        calculator.setStrategy(new ConcreteStrategySubtract());
        break;
      case "*":
        calculator.setStrategy(new ConcreteStrategyMultiply());
        break;
      default:
        console.log("Operação inválida");
        valid = false;
        break;
    }
    if (valid) {
      console.log(calculator.executeStrategy(firstNumber, secondNumber));
    }
  }
};

runExercise();