import { Product } from './Product'

export class Scales {
  private products: Product[] = []

  add(product: Product): void {
    this.products.push(product)
  }

  getSumScale(): number {
    var sum = 0
    for (var i = 0; i < this.products.length; i++) {
      sum = sum + this.products[i].getScale()
    }
    return sum
  }

  getNameList(): string[] {
    return this.products.map(function(product) {
      return product.getName()
    })
  }
}