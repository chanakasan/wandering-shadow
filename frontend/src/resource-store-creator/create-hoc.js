import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

export default function createHoc(modelName, selectorName, mapDispatchToProps) {
  const Provider = createProviderComponent(modelName, selectorName)

  const mapState = state => ({
    ...state[selectorName]
  })

  const Connected = connect(
    mapState,
    mapDispatchToProps
  )(Provider)


  return (Component) => (props) => {
    return (
      <Connected>
        {(customProps) => <Component {...props} {...customProps} />}
      </Connected>
    )
  }
}

export function createProviderComponent(modelName, selectorName) {
  return ({ children, pending, items, loadAllPending, addItemPending, updateItemPending, deleteItemPending }) => {
    const handleAddItem = (values) => {
      const onSuccess = () => {
        console.log("[INFO]", 'onSuccess')
      }
      const onError = error => {
        console.log("[INFO]", 'onError')
        console.log("[DEBUG] 'error' =", error)
      }
      console.log('[DEBUG] values =', values)
      addItemPending({ item: values, onSuccess, onError })
    }

    const handleUpdateItem = (values) => {
      const onSuccess = () => {
        console.log("[INFO]", 'onSuccess')
      }
      const onError = error => {
        console.log("[INFO]", 'onError')
        console.log("[DEBUG] 'error' =", error)
      }
      console.log("[DEBUG] values =", values)
      updateItemPending({ item: values, onSuccess, onError })
    }

    const handleDeleteItem = (item) => {
      const onSuccess = () => {
        console.log("[INFO]", 'onSuccess')
      }
      const onError = error => {
        console.log("[INFO]", 'onError')
        console.log("[DEBUG] 'error' =", error)
      }
      deleteItemPending(item)
    }

    const customProps = {
      [selectorName]: items,
      [`${selectorName}Pending`]: pending,
      [`add${modelName}`]: handleAddItem,
      [`update${modelName}`]: handleUpdateItem,
      [`delete${modelName}`]: handleDeleteItem,
      [`loadAll${modelName}s`]: loadAllPending,
    }

    return children(customProps)
  }
}
