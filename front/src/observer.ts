export class Observer implements IObserver {
  constructor(public readonly id: number) { }
  update() {
    console.log(`Search ${this.id} changed`)
  }
}

export interface ISubject {
  subscribe(observer: IObserver): void
  unsubscribe(observer: IObserver): void
  notify(): void
}

export interface IObserver {
  id: number
  update(value: string): void
}