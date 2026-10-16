import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from '../features/clientsSlice'
import MobileCompany from './MobileCompany'

var testData = {
  companyName: 'МТС',
  clientsArr: [
    { id: 101, fam: 'Иванов', im: 'Иван', otch: 'Иванович', balance: 200 },
    { id: 110, fam: 'Петров', im: 'Пётр', otch: 'Петрович', balance: -180 }
  ]
}

function renderCompany() {
  var store = configureStore({ reducer: { clients: clientsReducer } })
  return render(
    <Provider store={store}>
      <MobileCompany />
    </Provider>
  )
}

describe('MobileCompany', function() {
  beforeEach(function() {
    vi.stubGlobal('fetch', vi.fn(function() {
      return Promise.resolve({
        json: function() {
          return Promise.resolve(testData)
        }
      })
    }))
    vi.stubGlobal('confirm', vi.fn(function() {
      return true
    }))
  })

  afterEach(function() {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('фильтрует заблокированных клиентов', async function() {
    renderCompany()
    await screen.findByText('Иванов')
    fireEvent.click(screen.getByRole('button', { name: 'Заблокированные' }))
    expect(screen.queryByText('Иванов')).toBeNull()
    expect(screen.getByText('Петров')).toBeTruthy()
  })

  it('добавляет, изменяет и удаляет клиента', async function() {
    renderCompany()
    await screen.findByText('Иванов')

    fireEvent.click(screen.getByRole('button', { name: 'Добавить клиента' }))
    var inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'Новиков' } })
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }))
    expect(screen.getByText('Новиков')).toBeTruthy()

    var editButtons = screen.getAllByRole('button', { name: 'Редактировать' })
    fireEvent.click(editButtons[editButtons.length - 1])
    fireEvent.change(screen.getByDisplayValue('Новиков'), { target: { value: 'Новиков-Новый' } })
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }))
    expect(screen.getByText('Новиков-Новый')).toBeTruthy()

    var deleteButtons = screen.getAllByRole('button', { name: 'Удалить' })
    fireEvent.click(deleteButtons[deleteButtons.length - 1])
    expect(screen.queryByText('Новиков-Новый')).toBeNull()
  })
})