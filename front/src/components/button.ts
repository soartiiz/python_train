import { Element } from "./element"

export class Button extends Element {
  constructor(id: string, label: string) {
    const element = document.createElement('button')
    element.id = id
    element.appendChild(document.createTextNode(label))

    super(element)
  }
}