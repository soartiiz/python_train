import { Search } from '../components/search'
import { List } from '../components/list'
import { Button } from '../components/button'
import { Router } from '../main'
import { Element } from '../components/element'

export class IndexView extends Element {
  private search: Search | null = null
  private list: List | null = null

  constructor() {
    super(document.createElement('div'))
  }

  public mounted() {
    const h1 = document.createElement('h1')
    h1.appendChild(document.createTextNode('Pokedex'))
    this.element.appendChild(h1)

    this.list = new List()
    this.search = new Search()
    this.search.subscribe(this.list)
    const goToCreate = new Button('router-link', 'Crée')

    this.element.append(goToCreate.render(), this.search.render(), this.list.render())

    goToCreate.render().addEventListener('click', () => {
      Router.$router.changeView('create')
    })
  }

  private removeAllElement() {
    while (this.element.firstChild) { this.element.removeChild(this.element.firstChild); }
  }

  destroy() {
    this.list = null
    this.search = null
    this.removeAllElement()
  }
}