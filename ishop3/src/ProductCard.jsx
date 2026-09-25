function ProductCard(props) {
  if (props.mode === 'view') {
    return (
      <div>
        <h3>Product Card</h3>
        <p>ID: {props.product.id}</p>
        <p>Name: {props.product.name}</p>
        <p>Price: {props.product.price}</p>
        <p>URL: {props.product.url}</p>
        <p>Quantity: {props.product.quantity}</p>
      </div>
    )
  }

  var title = props.mode === 'new' ? 'New Product' : 'Edit existing Product'

  function handleNameChange(e) {
    props.onFieldChange('name', e.target.value)
  }
  function handlePriceChange(e) {
    props.onFieldChange('price', e.target.value)
  }
  function handleUrlChange(e) {
    props.onFieldChange('url', e.target.value)
  }
  function handleQuantityChange(e) {
    props.onFieldChange('quantity', e.target.value)
  }

  return (
    <div>
      <h3>{title}</h3>

      <div>
        <label>Name</label>
        <input type="text" value={props.formValues.name} onChange={handleNameChange} />
        {props.errors.name ? <span className="error">{props.errors.name}</span> : null}
      </div>

      <div>
        <label>Price</label>
        <input type="text" value={props.formValues.price} onChange={handlePriceChange} />
        {props.errors.price ? <span className="error">{props.errors.price}</span> : null}
      </div>

      <div>
        <label>URL</label>
        <input type="text" value={props.formValues.url} onChange={handleUrlChange} />
        {props.errors.url ? <span className="error">{props.errors.url}</span> : null}
      </div>

      <div>
        <label>Quantity</label>
        <input type="text" value={props.formValues.quantity} onChange={handleQuantityChange} />
        {props.errors.quantity ? <span className="error">{props.errors.quantity}</span> : null}
      </div>

      <button onClick={props.onSave} disabled={props.hasErrors}>
        {props.mode === 'new' ? 'Add' : 'Save'}
      </button>
      <button onClick={props.onCancel}>Cancel</button>
    </div>
  )
}

export default ProductCard