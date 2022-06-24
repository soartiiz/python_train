import './style.css'
import { IndexView } from './pages/index'
import { CreateView } from './pages/create'

export class Router {
  static $router: Router
  private state: string
  private mainContainer: HTMLElement | null
  private indexView = new IndexView()
  private createView = new CreateView()

  constructor() {
    Router.$router = this
    this.state = 'index'
    this.mainContainer = document.getElementById('main-container')

    this.showViewActive()
  }

  public changeView(state: string): void {
    this.state = state
    this.mainContainer?.removeChild(this.mainContainer.firstChild!)

    this.showViewActive()
  }

  private showViewActive(): void {
    this.state === 'index' ? this.mainContainer?.appendChild(this.indexView.render()) : this.mainContainer?.appendChild(this.createView.render())
  }
}

new Router()
