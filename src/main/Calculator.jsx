import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

// Valores iniciais do estado da calculadora
const initialState = {
  // Valor que aparecerá no display da calculadora
  displayValue: '0',
  // Se for true, no próximo digito (chamada do método addDigit()), o display será limpado
  clearDisplay: false,
  // Define a operação atual (+, -, *, /, =)
  operation: null,
  // Array de valores digitados na calculadora, que irão ser usados junto com a operação para fazer o calculo
  values: [0, 0],
  // Índice da posição atual do array onde o número do display será digitado
  current: 0
}

export default class Calculator extends Component {

  // Define o estado inicial
  state = { ...initialState }

  clearMemory = () => {
    // Reseta a calculadora passando o estado inicial
    this.setState({ ...initialState })
  }

  setOperation = (operation) => {
    // Se estiver digitando o primeiro número
    // passa a operação recebida, troca para o segundo número
    // e seta true para limpar o display para o próximo numero
    if (this.state.current === 0) {
      this.setState({
        operation,
        current: 1,
        clearDisplay: true
      })
    // Se já estiver no segundo numero
    } else {
      const equals = operation === '='
      const currentOperation = this.state.operation

      // Copia os valores do array do state para a constante values
      const values = [...this.state.values]

      // Se a operação atual no estado for...
      // Realiza o calculo, salva na posição 0 do array e zera a posição 1
      switch (currentOperation) {
        case '+':
          values[0] = values[0] + values[1]
          break
        case '-':
          values[0] = values[0] - values[1]
          break
        case '*':
          values[0] = values[0] * values[1]
          break
        case '/':
          values[0] = values[0] / values[1]
          break
        // Se a operação for '=' então mantém o primeiro numero do array
        default:
          values[0] = this.state.values[0]
      }

      values[1] = 0

      // Seta o estado passando o valor do indice 0 do array para o display
      // Se a operação for '=', seta como null
      // Se a operação for '=', seta como atual o primeiro indice
      // Limpa o display se a operação não for igual
      // Passa os valores do array
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  addDigit = (n) => {
    // Se já existir um ponto no display, não inclui outro
    if (n === '.' && this.state.displayValue.includes('.')) return

    // Se o display for somente 0 ou estiver setado true no estado, limpa o display
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    // Se o display precisar ser limpo...
    const currentValue = clearDisplay ? '' : this.state.displayValue
    // Adiciona o numero digitado ao valor atual
    const displayValue = currentValue + n

    // Seta o diplay e desabilita a opção de limpar o display no próximo digito
    this.setState({
      displayValue,
      clearDisplay: false
    })

    // Se for um dígito/não for '.'
    if (n !== '.') {
      // Pega o valor do display e altera o valor no indice atual dos valores (array)
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue

      // Seta no estado
      this.setState({
        values
      })
    }
  }

  render() {
    // Passa o valor de cada botão como propriedade e a função de callback
    // que vai ser executada quando ocorrer o click (que será chamada dentro do componente Button)
    // Passa também as outras propriedades para adicionar as classes CSS dependendo delas...
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    )
  }
}
