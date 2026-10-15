import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MobileClient from './MobileClient'

var activeClient = { id: 1, fam: 'Иванов', im: 'Иван', otch: 'Иванович', balance: 100 }
var blockedClient = { id: 2, fam: 'Петров', im: 'Пётр', otch: 'Петрович', balance: -100 }

function renderRow(client, handlers) {
  return render(
    <table>
      <tbody>
        <MobileClient
          client={client}
          isEditing={false}
          onEdit={handlers.onEdit || vi.fn()}
          onSave={vi.fn()}
          onDelete={handlers.onDelete || vi.fn()}
          onCancel={vi.fn()}
        />
      </tbody>
    </table>
  )
}

describe('MobileClient', function() {
  it('показывает данные и статус active', function() {
    renderRow(activeClient, {})
    expect(screen.getByText('Иванов')).toBeTruthy()
    expect(screen.getByText('active')).toBeTruthy()
  })

  it('показывает статус blocked при отрицательном балансе', function() {
    renderRow(blockedClient, {})
    expect(screen.getByText('blocked')).toBeTruthy()
  })

  it('вызывает onEdit с id клиента', function() {
    var onEdit = vi.fn()
    renderRow(activeClient, { onEdit: onEdit })
    fireEvent.click(screen.getByText('Редактировать'))
    expect(onEdit).toHaveBeenCalledWith(1)
  })

  it('вызывает onDelete с id клиента', function() {
    var onDelete = vi.fn()
    renderRow(activeClient, { onDelete: onDelete })
    fireEvent.click(screen.getByText('Удалить'))
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})