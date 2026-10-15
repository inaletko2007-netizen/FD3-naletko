import { Product } from './Product'

export class Apple extends Product {
  constructor(name: string, scale: number) {
    super(name, scale)
  }
}