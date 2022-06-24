import { Search } from '../components/search'
import { List } from '../components/list'
import { Button } from '../components/button'
import { Router } from '../main'
import { Element } from '../components/element'

export class IndexView extends Element {
  private search: Search
  private list: List

  constructor() {
    super(document.createElement('div'))

    this.list = new List()
    this.search = new Search()
    this.search.subscribe(this.list)
    const createButton = new Button()

    this.element?.appendChild(createButton.render())
    this.element?.appendChild(this.search.render())
    this.element?.appendChild(this.list.render())

    createButton.render().addEventListener('click', () => {
      Router.$router.changeView('create')
    })
  }
}