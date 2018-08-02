import { isNil } from 'substance'

const MODELCLASS_CACHE = new Map()

export default class NodeModelFactory {
  static create (api, node) {
    let ModelClass = MODELCLASS_CACHE.get(node.type)
    if (!ModelClass) {
      class _GeneratedModel extends NodeModel {}
      let nodeSchema = node.getSchema()
      for (let prop of nodeSchema) {
        // skip id and type
        if (prop.name === 'id') continue
        _GeneratedModel.prototype[_getter(prop.name)] = function () {
          return this._getPropertyModel(prop.name)
        }
      }
      ModelClass = _GeneratedModel
      MODELCLASS_CACHE.set(node.type, ModelClass)
    }
    return new ModelClass(api, node)
  }
}

class NodeModel {
  constructor (api, node) {
    this._api = api
    this._node = node

    this._properties = []
    this._propertiesByName = new Map()

    this._initialize()
  }

  get type () { return this._node.type }

  get id () { return this._node.id }

  getProperties () {
    return this._properties
  }

  _initialize () {
    const api = this._api
    const node = this._node
    const nodeSchema = node.getSchema()
    for (let nodeProperty of nodeSchema) {
      if (nodeProperty.name === 'id') continue
      let modelProperty = new NodeModelProperty(api, node, nodeProperty)
      this._properties.push(modelProperty)
      this._propertiesByName.set(modelProperty.name, modelProperty)
    }
  }

  _getPropertyModel (name) {
    return this._propertiesByName.get(name)
  }
}

function _getter (name) {
  return ['get', name[0].toUpperCase(), name.slice(1)].join('')
}

class NodeModelProperty {
  constructor (api, node, nodeProperty) {
    this._api = api
    this._node = node
    this._nodeProperty = nodeProperty

    this._valueModel = this._createValueModel()
  }

  get name () { return this._nodeProperty.name }

  get type () { return this._valueModel.type }

  get model () { return this._valueModel }

  isRequired () {
    return this._api._isPropertyRequired(this._node.type, this.name)
  }

  isEmpty () {
    return this._valueModel.isEmpty()
  }

  _createValueModel () {
    let valueModel
    const api = this._api
    const nodeProperty = this._nodeProperty
    const type = nodeProperty.type
    const path = [this._node.id, this.name]
    switch (type) {
      case 'boolean': {
        valueModel = new BooleanModel(api, path)
        break
      }
      case 'number': {
        valueModel = new NumberModel(api, path)
        break
      }
      case 'string': {
        valueModel = new StringModel(api, path)
        break
      }
      case 'text': {
        valueModel = new TextModel(api, path)
        break
      }
      default:
        //
    }
    if (!valueModel) {
      if (nodeProperty.isReference()) {
        if (nodeProperty.isArray()) {
          valueModel = new ManyRelationshipModel(api, path, nodeProperty.targetTypes)
        } else {
          valueModel = new SingleRelationshipModel(api, path, nodeProperty.targetTypes)
        }
      }
    }
    if (!valueModel) {
      throw new Error('Unsupported property: ' + type)
    }
    return valueModel
  }
}

class ValueModel {
  constructor (api, path) {
    this._api = api
    this._path = path
  }

  get id () {
    return String(this._path)
  }

  getValue () {
    return this._api._getValue(this._path)
  }

  setValue (val) {
    this._api._setValue(this._path, val)
  }

  isEmpty () {
    return isNil(this.getValue())
  }

  get _value () { return this.getValue() }
}

class BooleanModel extends ValueModel {
  get type () { return 'boolean' }

  // Note: Nil is interpreted as false, and false is thus also interpreted as isEmpty()
  isEmpty () {
    return !this.getValue()
  }
}

class NumberModel extends ValueModel {
  get type () { return 'number' }
}

class StringModel extends ValueModel {
  get type () { return 'string' }

  isEmpty () {
    let value = this.getValue()
    return isNil(value) || value.length === 0
  }
}

class TextModel extends StringModel {
  get type () { return 'text' }
}

class RelationshipModel extends ValueModel {
  constructor (api, path, targetTypes) {
    super(api, path)

    this._targetTypes = targetTypes
  }

  getAvailableTargets () {
    return _getAvailableRelationshipOptions(this._api, this._targetTypes)
  }
}

class SingleRelationshipModel extends RelationshipModel {
  get type () { return 'single-relationship' }

  getTarget () {
    let id = this.getValue()
    if (id) {
      return _getRelationshipOption(this._api, id)
    }
  }

  setTarget () {
    console.error('TODO: implement SingleRelationshipModel.setTarget()')
  }
}

class ManyRelationshipModel extends RelationshipModel {
  get type () { return 'many-relationship' }

  getValue () {
    return super.getValue() || []
  }

  isEmpty () {
    return this.getValue().length === 0
  }

  toggleTarget (target) {
    this._api._toggleRelationship(this._path, target.id)
  }
}

function _getAvailableRelationshipOptions (api, targetTypes) {
  let items = []
  targetTypes.forEach(targetType => {
    items = items.concat(api.getCollectionForType(targetType))
  })
  return items.map(item => _getRelationshipOption(api, item.id))
}

function _getRelationshipOption (api, id) {
  return {
    id,
    toString () {
      return api.renderEntity(api._getModelById(id))
    }
  }
}
