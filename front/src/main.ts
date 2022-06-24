import './style.css'
import { IndexView } from './pages/index'
import { CreateView } from './pages/create'
import { Element } from './components/element'

export class Router {
  static $router: Router
  private state: string
  private mainContainer: HTMLElement | null

  private views: { [key: string]: Element } = {
    'index': new IndexView(),
    'create': new CreateView()
  }

  constructor() {
    Router.$router = this
    this.state = 'index'
    this.mainContainer = document.getElementById('main-container')

    this.showViewActive()
  }

  public changeView(state: string): void {
    this.views[this.state].destroy()

    this.state = state
    this.mainContainer?.removeChild(this.mainContainer.firstChild!)

    this.showViewActive()
  }

  private showViewActive(): void {
    this.mainContainer?.appendChild(this.views[this.state].render())
    this.views[this.state].mounted()
  }
}

new Router()
