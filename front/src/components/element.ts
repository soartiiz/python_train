export class Element {
  protected element: HTMLElement

  constructor(element: HTMLElement) {
    this.element = element
  }

  public render(): HTMLElement {
    return this.element
  }
}

