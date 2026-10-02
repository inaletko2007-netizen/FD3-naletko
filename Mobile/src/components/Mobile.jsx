import { useState, useRef, useCallback } from 'react'
import Client from './Client'
import Filter from './Filter'
import initialClients from '../clients.json'

function getMaxId(list) {
  var maxId = 0
  for (var i = 0; i < list.length; i++) {
    if (list[i].id > maxId) {
      maxId = list[i].id
    }
  }
  return maxId
}

function Mobile() {
  console.log('Mobile рендерится')

  var [clients, setClients] = useState(initialClients)
  var [filter, setFilter] = useState('all')
  var [editingId, setEditingId] = useState(null)

  var nextIdRef = useRef(getMaxId(initialClients) + 1)
  var pendingNewIdRef = useRef(null)

  function removeClientById(list, id) {
    var result = []
    for (var i = 0; i < list.length; i++) {
      if (list[i].id !== id) {
        result.push(list[i])
      }
    }
    return result
  }

  var handleFilterChange = useCallback(function(value) {
    setFilter(value)
  }, [])

  var handleEdit = useCallback(function(id) {
    setEditingId(id)
  }, [])

  var handleCancel = useCallback(function() {
    if (pendingNewIdRef.current !== null) {
      var idToRemove = pendingNewIdRef.current
      pendingNewIdRef.current = null
      setClients(function(prevClients) {
        return removeClientById(prevClients, idToRemove)
      })
    }
    setEditingId(null)
  }, [])

  var handleSave = useCallback(function(updatedClient) {
    if (pendingNewIdRef.current === updatedClient.id) {
      pendingNewIdRef.current = null
    }
    setClients(function(prevClients) {
      var newClients = []
      for (var i = 0; i < prevClients.length; i++) {
        if (prevClients[i].id === updatedClient.id) {
          newClients.push(updatedClient)
        } else {
          newClients.push(prevClients[i])
        }
      }
      return newClients
    })
    setEditingId(null)
  }, [])

  var handleDelete = useCallback(function(id) {
    var confirmed = confirm("Удалить клиента?")
    if (confirmed) {
      if (pendingNewIdRef.current === id) {
        pendingNewIdRef.current = null
      }
      setClients(function(prevClients) {
        return removeClientById(prevClients, id)
      })
    }
  }, [])

  var handleAdd = useCallback(function() {
    if (pendingNewIdRef.current !== null) {
      var idToRemove = pendingNewIdRef.current
      setClients(function(prevClients) {
        return removeClientById(prevClients, idToRemove)
      })
    }

    var newId = nextIdRef.current
    nextIdRef.current = nextIdRef.current + 1
    pendingNewIdRef.current = newId

    var newClient = { id: newId, lastName: '', firstName: '', patronymic: '', balance: 0 }
    setClients(function(prevClients) {
      var newClients = []
      for (var i = 0; i < prevClients.length; i++) {
        newClients.push(prevClients[i])
      }
      newClients.push(newClient)
      return newClients
    })
    setEditingId(newId)
  }, [])

  var visibleClients = []
  for (var i = 0; i < clients.length; i++) {
    var status = clients[i].balance < 0 ? 'blocked' : 'active'
    if (filter === 'all' || filter === status) {
      visibleClients.push(clients[i])
    }
  }

  var rows = []
  for (var j = 0; j < visibleClients.length; j++) {
    var client = visibleClients[j]
    rows.push(
      <Client
        key={client.id}
        client={client}
        isEditing={client.id === editingId}
        onEdit={handleEdit}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
      <table border="1">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <button onClick={handleAdd}>Добавить клиента</button>
    </div>
  )
}

export default Mobile