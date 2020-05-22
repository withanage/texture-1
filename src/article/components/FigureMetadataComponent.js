import { ValueComponent } from '../../kit'

export default class FigureMetadataComponent extends ValueComponent {
  render ($$) {
    let items = this.props.model.getItems()
    let el = $$('div').addClass('sc-figure-metadata')
    if (items.length > 0) {
      el.append(
        items.map(field => this._renderMetadataField($$, field))
      )
    } else {
      el.addClass('sm-empty').append(this.getLabel('empty-figure-metadata'))
    }
    return el
  }

  _renderMetadataField ($$, metadataField) {
    let MetadataFieldComponent = this.getComponent(metadataField.type)
    return $$(MetadataFieldComponent, { node: metadataField }).ref(metadataField.id)
  }
}
