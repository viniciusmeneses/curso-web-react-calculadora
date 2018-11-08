import React from 'react'
import './Button.css'

// Priorizar a criação de componentes com função normal
// sem classe, somente quando precisarmos de estado (state), utilizamos a criação com classe

// Sempre que tiver { } no JSX, podemos colocar código JS, até mesmo template string `${...}`
export default props => (
  <button
  className={`button ${props.operation ? 'operation' : ''} ${props.double ? 'double' : ''} ${props.triple ? 'triple' : ''}`}
  // Ao clicar no botão, executa a arrow function que verifica se a propriedade click foi passada e executa a função passada na propriedade passando o valor (nome) do botão
  onClick={e => props.click && props.click(props.label)}>
    {props.label}
  </button>
)


// Ou... usando template string fora do JSX
// export default props => {
//   const classes = `button ${props.operation ? 'operation' : ''} ${props.double ? 'double' : ''} ${props.triple ? 'triple' : ''}`

//   return (
//     <button className={classes}>
//       {props.label}
//     </button>
//   )
// }
