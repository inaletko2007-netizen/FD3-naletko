export class Product {
  private name: string
  private scale: number

  constructor(name: string, scale: number) {
    this.name = name
    this.scale = scale
  }

  getScale(): number {
    return this.scale
  }

  getName(): string {
    return this.name
  }
}