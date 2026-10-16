import { Product } from './Product'

export class Scales {
  private products: Product[] = []

  add(product: Product): void {
    this.products.push(product)
  }

  getSumScale(): number {
    return this.products.reduce(function(sum, product) {
      return sum + product.getScale()
    }, 0)
  }

  getNameList(): string[] {
    return this.products.map(function(product) {
      return product.getName()
    })
  }
}