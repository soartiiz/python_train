import { Element } from "./element"
import { Button } from "./button"
import { Router } from "../main"
import { ISubject, IObserver } from "../observer"
import { PokemonDTO } from "../dto/pokemon"

export class CreateForm extends Element implements ISubject {
  private name: HTMLInputElement
  private description: HTMLTextAreaElement
  private observers: IObserver[] = [];
  private pokemon: PokemonDTO | null

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

    this.pokemon = null
  }

  subscribe(observer: IObserver) {
    console.log('subscribe')
    this.observers.push(observer)
  }
  unsubscribe(observer: IObserver) {
    this.observers = this.observers.filter((element) => {
      return observer.id === element.id
    })
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update(JSON.stringify(this.pokemon));
    })
  }

  private async handleCreate(): Promise<void> {
    const body = { name: this.name.value, description: this.description.value }

    try {
      const request = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      this.pokemon = await request.json()
    } catch (e) {
      console.log(e)
    }

    Router.$router.changeView('index')
  }
}