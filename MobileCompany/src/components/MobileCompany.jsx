import { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MobileClient from './MobileClient'
import Filter from './Filter'
import { fetchCompanyData, addClient, saveClient, deleteClient } from '../features/clientsSlice'
import { filterClients } from './filterClients'

function MobileCompany() {
  console.log('MobileCompany рендерится')

  var dispatch = useDispatch()
  var companyName = useSelector(function(state) { return state.clients.companyName })
  var clients = useSelector(function(state) { return state.clients.clients })

  var [filter, setFilter] = useState('all')
  var [editingId, setEditingId] = useState(null)

  var nextIdRef = useRef(1)
  var pendingNewIdRef = useRef(null)

  useEffect(function() {
    dispatch(fetchCompanyData())
  }, [dispatch])

  useEffect(function() {
  var ids = clients.map(function(client) { return client.id })
  var maxId = ids.length > 0 ? Math.max.apply(null, ids) : 0
  nextIdRef.current = maxId + 1
}, [clients])
  var handleFilterChange = useCallback(function(value) {
    setFilter(value)
  }, [])

  var handleEdit = useCallback(function(id) {
    setEditingId(id)
  }, [])

  var handleCancel = useCallback(function() {
    if (pendingNewIdRef.current !== null) {
      dispatch(deleteClient(pendingNewIdRef.current))
      pendingNewIdRef.current = null
    }
    setEditingId(null)
  }, [dispatch])

  var handleSave = useCallback(function(updatedClient) {
    if (pendingNewIdRef.current === updatedClient.id) {
      pendingNewIdRef.current = null
    }
    dispatch(saveClient(updatedClient))
    setEditingId(null)
  }, [dispatch])

  var handleDelete = useCallback(function(id) {
    var confirmed = confirm("Удалить клиента?")
    if (confirmed) {
      if (pendingNewIdRef.current === id) {
        pendingNewIdRef.current = null
      }
      dispatch(deleteClient(id))
    }
  }, [dispatch])

  var handleAdd = useCallback(function() {
    if (pendingNewIdRef.current !== null) {
      dispatch(deleteClient(pendingNewIdRef.current))
    }
    var newId = nextIdRef.current
    pendingNewIdRef.current = newId
    var newClient = { id: newId, fam: '', im: '', otch: '', balance: 0 }
    dispatch(addClient(newClient))
    setEditingId(newId)
  }, [dispatch])

  var visibleClients = filterClients(clients, filter)

  var rows = visibleClients.map(function(client) {
  return (
    <MobileClient
      key={client.id}
      client={client}
      isEditing={client.id === editingId}
      onEdit={handleEdit}
      onSave={handleSave}
      onDelete={handleDelete}
      onCancel={handleCancel}
    />
  )
})

  return (
    <div>
      <h2>{companyName}</h2>
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

export default MobileCompany