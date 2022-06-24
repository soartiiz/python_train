import { Element } from "./element"

export class Pokemon extends Element {
  private name: string
  private description: string

  constructor(name: string, description: string) {
    const element = document.createElement("article")
    element.classList.add('pokemon-card')
    super(element)

    this.name = name
    this.description = description

    const nameElement = document.createElement("h3")
    nameElement.appendChild(document.createTextNode(this.name))
    nameElement.classList.add('pokemon-name')

    const descriptionElement = document.createElement("p")
    descriptionElement.appendChild(document.createTextNode(this.description))
    descriptionElement.classList.add('pokemon-description')

    this.element.appendChild(nameElement)
    this.element.appendChild(descriptionElement)
  }

  // GETTERS
  public getName() {
    return this.name
  }
  public getDescription() {
    return this.description
  }
}