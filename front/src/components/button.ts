import { Element } from "./element"

export class Button extends Element {
  constructor() {
    const element = document.createElement('button')
    element.id = 'router-button'
    element.appendChild(document.createTextNode('Crée'))

    super(element)
  }
}