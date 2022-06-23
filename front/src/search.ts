import { IObserver, ISubject } from "./observer"

export class Search implements ISubject {
  private element: HTMLElement
  // private value: string
  private debug: boolean
  private input: HTMLInputElement
  private observers: IObserver[] = [];
  private debugElement: HTMLElement

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
    console.log('notify')
    this.observers.forEach(observer => {
      observer.update(this.input.value);
    })
  }

  constructor(debug: boolean = false) {
    this.debug = debug
    // this.value = 'test'
    this.element = document.createElement("article")
    this.element.classList.add("search")

    this.input = document.createElement("input")
    this.input.setAttribute("type", "text");
    this.input.setAttribute("placeholder", "Nom, description ...");
    this.input.id = "search"

    const label = document.createElement("label")
    label.setAttribute("for", "search");
    label.appendChild(document.createTextNode("Recherche"))

    this.element.appendChild(label)
    this.element.appendChild(this.input)

    this.debugElement = document.createElement("p")
    this.debugElement.id = 'debug'
    this.debugElement.appendChild(document.createTextNode(this.input.value))

    if (this.debug) { this.element.appendChild(this.debugElement) }

    this.input.addEventListener('input', () => {
      this.debugElement.innerText = this.input.value
      this.notify()
    })
  }

  // GETTERS
  public getValue(): string {
    return this.input.value
  }
  public render(): HTMLElement {
    return this.element
  }

  // SETTERS
  // public setValue(value: string): void {
  //   this.value = value
  // }
}