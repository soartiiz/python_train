import { Element } from "../components/element"
import { CreateForm } from "../components/createForm"
import { Button } from "../components/button"
import { Router } from "../main"

export class CreateView extends Element {
  constructor() {
    super(document.createElement('div'))

    const h1 = document.createElement('h1')
    h1.appendChild(document.createTextNode('CREATE PAGE'))

    const createForm = new CreateForm()

    const backButton = new Button('back-to-index', 'Retour')

    this.element.append(h1, backButton.render(), createForm.render())

    backButton.render().addEventListener('click', () => {
      Router.$router.changeView('index')
    })
  }
}