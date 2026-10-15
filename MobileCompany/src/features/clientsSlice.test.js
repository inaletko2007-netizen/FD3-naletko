import { describe, it, expect } from 'vitest'
import clientsReducer, { addClient, saveClient, deleteClient } from './clientsSlice'

var startState = {
  companyName: 'Тест',
  clients: [
    { id: 1, fam: 'Иванов', im: 'Иван', otch: 'Иванович', balance: 100 },
    { id: 2, fam: 'Петров', im: 'Пётр', otch: 'Петрович', balance: -50 }
  ]
}

describe('clientsSlice', function() {
  it('добавляет клиента', function() {
    var newClient = { id: 3, fam: 'Сидоров', im: 'Сидор', otch: 'Сидорович', balance: 0 }
    var newState = clientsReducer(startState, addClient(newClient))
    expect(newState.clients.length).toBe(3)
    expect(newState.clients[2].fam).toBe('Сидоров')
  })

  it('изменяет клиента', function() {
    var updated = { id: 1, fam: 'Иванов-Новый', im: 'Иван', otch: 'Иванович', balance: 500 }
    var newState = clientsReducer(startState, saveClient(updated))
    expect(newState.clients[0].fam).toBe('Иванов-Новый')
    expect(newState.clients[0].balance).toBe(500)
  })

  it('удаляет клиента', function() {
    var newState = clientsReducer(startState, deleteClient(1))
    expect(newState.clients.length).toBe(1)
    expect(newState.clients[0].id).toBe(2)
  })
})