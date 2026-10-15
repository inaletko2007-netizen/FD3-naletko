import { describe, it, expect } from 'vitest'
import { filterClients } from './filterClients'

var clients = [
  { id: 1, balance: 100 },
  { id: 2, balance: -50 },
  { id: 3, balance: 0 }
]

describe('filterClients', function() {
  it('возвращает всех при фильтре all', function() {
    expect(filterClients(clients, 'all').length).toBe(3)
  })

  it('возвращает только активных', function() {
    expect(filterClients(clients, 'active').length).toBe(2)
  })

  it('возвращает только заблокированных', function() {
    var result = filterClients(clients, 'blocked')
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(2)
  })
}) 
export function filterClients(clients, filter) {
  return clients.filter(function(client) {
    var status = client.balance < 0 ? 'blocked' : 'active'
    return filter === 'all' || filter === status
  })
}