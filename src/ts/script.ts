interface IOperacao {
  primeiroValor: string;
  operador: string;
  segundoValor: string;
  resultado: number | null;
}

const operacao: IOperacao = {
  primeiroValor: "",
  operador: "",
  segundoValor: "",
  resultado: null,
};

const buttons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".button");
const input: HTMLInputElement | null =
  document.querySelector(".input");

const operadors: string[] = ["/", "*", "-", "+"];
const features: string[] = ["Clear", "Backspace", "=", "%"];

buttons.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener("click", () => {
    const value: string = btn.value;
    const isOperator: boolean = operadors.includes(value);
    const isFeature: boolean = features.includes(value);

    if (!isEmpty(operacao.resultado)) {
      operacao.primeiroValor = String(operacao.resultado);
      operacao.resultado = null;
    }

    if (!isOperator && !isFeature && isEmpty(operacao.operador)) {
      operacao.primeiroValor += value;
    } else if (isOperator && !isEmpty(operacao.primeiroValor)) {
      operacao.operador = value;
    } else if (
      !isOperator &&
      !isFeature &&
      !isEmpty(operacao.operador) &&
      !isEmpty(operacao.primeiroValor)
    ) {
      operacao.segundoValor += value;
    }

    if (isFeature) {
      switch (value) {
        case "=":
          if (hasOperation()) {
            operacao.resultado = calculate();
            operacao.primeiroValor = "";
            operacao.operador = "";
            operacao.segundoValor = "";
          }
          break;
        case "Backspace":
          handleBackspace();
          break;
        case "Clear":
          clearCalculator();
          break;
        case "%":
          handlePercentage();
      }
    }

    insertValue();
  });
});

function clearCalculator() {
  operacao.primeiroValor = "";
  operacao.operador = "";
  operacao.segundoValor = "";
  operacao.resultado = null;
}

function isEmpty(value: string | number | null) {
  return value === "" || value === null;
}

function hasOperation() {
  return (
    operacao.primeiroValor !== "" &&
    operacao.operador !== "" &&
    operacao.segundoValor !== ""
  );
}

function calculate() {
  switch (operacao.operador) {
    case "+":
      return (
        parseFloat(operacao.primeiroValor) + parseFloat(operacao.segundoValor)
      );
    case "-":
      return (
        parseFloat(operacao.primeiroValor) - parseFloat(operacao.segundoValor)
      );
    case "*":
      return (
        parseFloat(operacao.primeiroValor) * parseFloat(operacao.segundoValor)
      );
    case "/":
      return (
        parseFloat(operacao.primeiroValor) / parseFloat(operacao.segundoValor)
      );
    default:
      return 0;
  }
}

function insertValue() {
  if (input !== null) {
    if (!isEmpty(operacao.resultado)) {
      return (input.value = String(operacao.resultado));
    } else if (!isEmpty(operacao.segundoValor)) {
      return (input.value = operacao.segundoValor);
    } else if (!isEmpty(operacao.primeiroValor)) {
      return (input.value = operacao.primeiroValor);
    } else {
      return (input.value = "");
    }
  }
}

function handleBackspace() {
  if (!isEmpty(operacao.segundoValor)) {
    operacao.segundoValor = operacao.segundoValor.slice(0, -1);
  } else if (isEmpty(operacao.operador) && !isEmpty(operacao.primeiroValor)) {
    operacao.primeiroValor = operacao.primeiroValor.slice(0, -1);
  }
}

function handlePercentage() {
  if (isEmpty(operacao.operador) && !isEmpty(operacao.primeiroValor)) {
    operacao.resultado = parseFloat(operacao.primeiroValor) / 100;
  } else if (hasOperation()) {
    switch (operacao.operador) {
      case "+":
        operacao.resultado =
          parseFloat(operacao.primeiroValor) +
          parseFloat(operacao.primeiroValor) *
            (parseFloat(operacao.segundoValor) / 100);
        break;
      case "-":
        operacao.resultado =
          parseFloat(operacao.primeiroValor) -
          parseFloat(operacao.primeiroValor) *
            (parseFloat(operacao.segundoValor) / 100);
        break;
      case "*":
        operacao.resultado =
          parseFloat(operacao.primeiroValor) *
          (parseFloat(operacao.primeiroValor) *
            (parseFloat(operacao.segundoValor) / 100));
        break;
      case "/":
        operacao.resultado =
          parseFloat(operacao.primeiroValor) /
          (parseFloat(operacao.primeiroValor) *
            (parseFloat(operacao.segundoValor) / 100));
        break;
    }
  }
}
