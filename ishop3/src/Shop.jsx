import { useState } from 'react'
import Product from './Product'
import ProductCard from './ProductCard'
import initialProducts from './products.json'

function validateProduct(values) {
  var errors = {}

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Please, fill the field. Value must be a string'
  }

  if (values.price === '' || isNaN(values.price) || Number(values.price) <= 0) {
    errors.price = 'Price must be a positive number'
  }

  if (!values.url || values.url.trim() === '') {
    errors.url = 'Please, fill the field. Value must be a string'
  }

  if (values.quantity === '' || isNaN(values.quantity) || Number(values.quantity) < 0) {
    errors.quantity = 'Quantity must be zero or a positive number'
  }

  return errors
}

var emptyForm = { name: '', price: '', url: '', quantity: '' }

function Shop() {
  var [products, setProducts] = useState(initialProducts)
  var [selectedId, setSelectedId] = useState(null)
  var [editingId, setEditingId] = useState(null)
  var [isDirty, setIsDirty] = useState(false)
  var [formValues, setFormValues] = useState(emptyForm)
  var [errors, setErrors] = useState({})

  var isLocked = editingId === 'new' || isDirty

  function findProduct(id) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i]
      }
    }
    return null
  }

  function handleRowClick(id) {
    if (isLocked) {
      return
    }
    setEditingId(null)
    setSelectedId(id)
  }

  function handleEditClick(id) {
    if (isLocked) {
      return
    }
    var product = findProduct(id)
    setEditingId(id)
    setSelectedId(id)
    setIsDirty(false)
    setErrors({})
    setFormValues({
      name: product.name,
      price: String(product.price),
      url: product.url,
      quantity: String(product.quantity)
    })
  }

  function handleNewClick() {
    if (isLocked) {
      return
    }
    setEditingId('new')
    setSelectedId(null)
    setIsDirty(false)
    setErrors({})
    setFormValues(emptyForm)
  }

  function handleDelete(id) {
    if (isLocked) {
      return
    }
    var confirmed = confirm("Удалить товар?")
    if (confirmed) {
      var newProducts = []
      for (var i = 0; i < products.length; i++) {
        if (products[i].id !== id) {
          newProducts.push(products[i])
        }
      }
      setProducts(newProducts)
      setSelectedId(null)
    }
  }

  function handleFieldChange(field, value) {
    var newValues = {
      name: formValues.name,
      price: formValues.price,
      url: formValues.url,
      quantity: formValues.quantity
    }
    newValues[field] = value
    setFormValues(newValues)
    setIsDirty(true)
    setErrors(validateProduct(newValues))
  }

  function handleSave() {
    var validationErrors = validateProduct(formValues)
    var errorCount = 0
    for (var key in validationErrors) {
      errorCount = errorCount + 1
    }
    if (errorCount > 0) {
      setErrors(validationErrors)
      return
    }

    if (editingId === 'new') {
      var maxId = 0
      for (var i = 0; i < products.length; i++) {
        if (products[i].id > maxId) {
          maxId = products[i].id
        }
      }
      var newProduct = {
        id: maxId + 1,
        name: formValues.name,
        price: Number(formValues.price),
        url: formValues.url,
        quantity: Number(formValues.quantity)
      }
      var newProducts = []
      for (var i = 0; i < products.length; i++) {
        newProducts.push(products[i])
      }
      newProducts.push(newProduct)
      setProducts(newProducts)
    } else {
      var updatedProducts = []
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === editingId) {
          updatedProducts.push({
            id: products[i].id,
            name: formValues.name,
            price: Number(formValues.price),
            url: formValues.url,
            quantity: Number(formValues.quantity)
          })
        } else {
          updatedProducts.push(products[i])
        }
      }
      setProducts(updatedProducts)
    }

    setEditingId(null)
    setIsDirty(false)
    setErrors({})
  }

  function handleCancel() {
    setEditingId(null)
    setIsDirty(false)
    setErrors({})
  }

  var rows = []
  for (var i = 0; i < products.length; i++) {
    var item = products[i]
    rows.push(
      <Product
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        url={item.url}
        quantity={item.quantity}
        isSelected={item.id === selectedId}
        onRowClick={handleRowClick}
        onEditClick={handleEditClick}
        onDelete={handleDelete}
        buttonsDisabled={isLocked}
      />
    )
  }

  var selectedProduct = selectedId !== null ? findProduct(selectedId) : null

  var hasErrors = false
  if (errors.name || errors.price || errors.url || errors.quantity) {
    hasErrors = true
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>URL</th>
            <th>Quantity</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>

      <button onClick={handleNewClick} disabled={isLocked}>New</button>

      {editingId === 'new' ? (
        <ProductCard
          mode="new"
          formValues={formValues}
          errors={errors}
          hasErrors={hasErrors}
          onFieldChange={handleFieldChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : null}

      {editingId !== null && editingId !== 'new' ? (
        <ProductCard
          mode="edit"
          formValues={formValues}
          errors={errors}
          hasErrors={hasErrors}
          onFieldChange={handleFieldChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : null}

      {editingId === null && selectedProduct ? (
        <ProductCard mode="view" product={selectedProduct} />
      ) : null}
    </div>
  )
}

export default Shop