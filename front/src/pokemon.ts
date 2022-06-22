export class Pokemon {
  private name: string
  private description: string
  private element: HTMLElement

  constructor(name: string, description: string) {
    this.name = name
    this.description = description
    this.element = document.createElement("section")
    this.element.classList.add('pokemon-card')
    
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
  public render() {
    return this.element
  }
}