export function filterClients(clients, filter) {
  return clients.filter(function(client) {
    var status = client.balance < 0 ? 'blocked' : 'active'
    return filter === 'all' || filter === status
  })
}