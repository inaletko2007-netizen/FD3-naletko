import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export var fetchCompanyData = createAsyncThunk(
  'clients/fetchCompanyData',
  async function() {
    var response = await fetch('https://fe.it-academy.by/Examples/mobile_company.json')
    var data = await response.json()
    return data
  }
)

var clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    companyName: '',
    clients: []
  },
  reducers: {
    addClient: function(state, action) {
      state.clients.push(action.payload)
    },
    saveClient: function(state, action) {
      var updated = action.payload
      state.clients = state.clients.map(function(client) {
        return client.id === updated.id ? updated : client
      })
    },
    deleteClient: function(state, action) {
      var id = action.payload
      state.clients = state.clients.filter(function(client) {
        return client.id !== id
      })
    }
  },
  extraReducers: function(builder) {
    builder.addCase(fetchCompanyData.fulfilled, function(state, action) {
      state.companyName = action.payload.companyName
      state.clients = action.payload.clientsArr
    })
  }
})

export var addClient = clientsSlice.actions.addClient
export var saveClient = clientsSlice.actions.saveClient
export var deleteClient = clientsSlice.actions.deleteClient
export default clientsSlice.reducer