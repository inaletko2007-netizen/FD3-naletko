import { Product } from './Product'

export class Tomato extends Product {
  constructor(name: string, scale: number) {
    super(name, scale)
  }
}