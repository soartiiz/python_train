import { Element } from "../components/element"

export class CreateView extends Element {
  constructor() {
    const element = document.createElement('div')
    const h1 = document.createElement('h1')

    h1.appendChild(document.createTextNode('CREATE PAGE'))
    element.appendChild(h1)

    super(element)
    console.log(element)
  }
}