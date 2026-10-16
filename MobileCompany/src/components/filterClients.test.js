import { describe, it, expect } from 'vitest'
import { filterClients } from './filterClients'

var clients = [
  { id: 1, balance: 100 },
  { id: 2, balance: -50 },
  { id: 3, balance: 0 }
]

describe('filterClients', function() {
  it('фильтрует клиентов по статусу', function() {
    expect(filterClients(clients, 'all').length).toBe(3)
    expect(filterClients(clients, 'active').length).toBe(2)
    expect(filterClients(clients, 'blocked').length).toBe(1)
  })
})