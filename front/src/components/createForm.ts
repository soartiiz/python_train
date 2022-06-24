import { Element } from "./element"
import { Button } from "./button"
import { Router } from "../main"

export class CreateForm extends Element {
  private name: HTMLInputElement
  private description: HTMLTextAreaElement

  constructor() {
    const element = document.createElement('section')
    element.id = 'create-form'
    super(element)

    const nameLabel = document.createElement("label")
    nameLabel.setAttribute("for", "name");
    nameLabel.appendChild(document.createTextNode("Recherche"))

    this.name = document.createElement("input")
    this.name.setAttribute("type", "text");
    this.name.setAttribute("placeholder", "Salamèche")
    this.name.id = "name"

    const descriptionLabel = document.createElement("label")
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.appendChild(document.createTextNode("Courte description"))

    this.description = document.createElement("textarea")
    this.description.setAttribute("placeholder", "Salamèche")
    this.description.id = "description"

    const submitButton = new Button('create-button', 'Crée')

    this.element.append(nameLabel, this.name, descriptionLabel, this.description, submitButton.render())

    submitButton.render().addEventListener('click', () => {
      this.handleCreate()
    })
  }

  private async handleCreate(): Promise<void> {
    const body = { name: this.name.value, description: this.description.value }

    try {
      await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    } catch (e) {
      console.log(e)
    }

    Router.$router.changeView('index')
  }
}