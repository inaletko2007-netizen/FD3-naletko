import { Scales } from './Scales'
import { Apple } from './Apple'
import { Tomato } from './Tomato'

var scales = new Scales()

scales.add(new Apple('Яблоко Антоновка', 150))
scales.add(new Apple('Яблоко Белый налив', 180))
scales.add(new Tomato('Помидор Черри', 20))
scales.add(new Tomato('Помидор Малиновый', 300))

console.log('Суммарный вес:', scales.getSumScale())
console.log('Список продуктов:', scales.getNameList())