import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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
    vi.unstubAllGlobals()
  })

  it('загружает название компании и клиентов', async function() {
    renderCompany()
    expect(await screen.findByText('МТС')).toBeTruthy()
    expect(screen.getByText('Иванов')).toBeTruthy()
    expect(screen.getByText('Петров')).toBeTruthy()
  })

  it('фильтрует заблокированных клиентов', async function() {
    renderCompany()
    await screen.findByText('Иванов')
    fireEvent.click(screen.getByRole('button', { name: 'Заблокированные' }))
    expect(screen.queryByText('Иванов')).toBeNull()
    expect(screen.getByText('Петров')).toBeTruthy()
  })

  it('фильтрует активных клиентов', async function() {
    renderCompany()
    await screen.findByText('Иванов')
    fireEvent.click(screen.getByRole('button', { name: 'Активные' }))
    expect(screen.getByText('Иванов')).toBeTruthy()
    expect(screen.queryByText('Петров')).toBeNull()
  })

  it('добавляет нового клиента', async function() {
    renderCompany()
    await screen.findByText('Иванов')
    fireEvent.click(screen.getByRole('button', { name: 'Добавить клиента' }))
    var inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'Новиков' } })
    fireEvent.change(inputs[1], { target: { value: 'Никита' } })
    fireEvent.change(inputs[2], { target: { value: 'Николаевич' } })
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }))
    expect(screen.getByText('Новиков')).toBeTruthy()
  })

  it('изменяет клиента', async function() {
    renderCompany()
    await screen.findByText('Иванов')
    fireEvent.click(screen.getAllByRole('button', { name: 'Редактировать' })[0])
    fireEvent.change(screen.getByDisplayValue('Иванов'), { target: { value: 'Иванов-Новый' } })
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }))
    expect(screen.getByText('Иванов-Новый')).toBeTruthy()
    expect(screen.queryByText('Иванов')).toBeNull()
  })

  it('удаляет клиента', async function() {
    renderCompany()
    await screen.findByText('Иванов')
    fireEvent.click(screen.getAllByRole('button', { name: 'Удалить' })[0])
    expect(screen.queryByText('Иванов')).toBeNull()
    expect(screen.getByText('Петров')).toBeTruthy()
  })
})