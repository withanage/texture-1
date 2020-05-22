
export default class ImporterErrorReport {
  constructor (jatsImporterErrors) {
    let failedStages = []

    for (let error of jatsImporterErrors) {
      if (error.msg && error.msg.length > 0) {
        failedStages.push({ msg: error.msg, el: error.el })
      }
    }
    this._errors = failedStages
  }

  toString () {
    let body = document.getElementsByTagName('body')[0]
    body.setAttribute('style', 'overflow:scroll;font-family:verdana')
    let header = document.createElement('div')
    let headerText = document.createElement('H1')
    headerText.setAttribute('class', 'sc-heading')
    headerText.setAttribute('style', 'text-align: left;')
    headerText.textContent = 'Texture Validation Results'
    header.appendChild(headerText)
    let message = document.createElement('p')
    message.innerHTML = '<br/> Following tags  in your JATS XML document are currently not supported in Texture Editor'
    header.appendChild(message)



    app.appendChild(document.createElement('HR'))
    app.appendChild(header)
    app.appendChild(document.createElement('BR'))

    app.appendChild(this.getErrorContent())
    app.appendChild(document.createElement('BR'))
    app.appendChild(document.createElement('BR'))
    let footerText = document.createElement('DIV')
    footerText.setAttribute('style', 'text-align: left;')
    footerText.innerHTML = this.getHelp()
    app.appendChild(footerText)
    app.appendChild(document.createElement('HR'))
    return app
  }

  getErrorContent () {
    let tableWrapper = document.createElement('div')
    tableWrapper.setAttribute('class', 'sc-table')

    let table = document.createElement('table')
    table.setAttribute('style', 'font-size:15px;width:90%')
    let thead = document.createElement('thead')
    let trh = document.createElement('tr')
    let thNumber = document.createElement('th')
    thNumber.setAttribute('style', 'width:50px')
    let thReason = document.createElement('th')
    let thContext = document.createElement('th')
    thNumber.textContent = 'Nr.'
    thReason.textContent = 'Error'
    thContext.textContent = 'Context'
    trh.appendChild(thNumber)
    trh.appendChild(thReason)
    trh.appendChild(thContext)
    thead.appendChild(trh)
    table.appendChild(thead)

    let row = 1
    const app = document.querySelectorAll('div.sc-app')[0]
    for (let error of this._errors) {
      let tr = document.createElement('tr')
      if (row % 2 === 1) tr.setAttribute('class', 'sc-text-node')
      let tdNumber = document.createElement('td')

      tdNumber.textContent = row
      let tdError = document.createElement('td')
      tdError.setAttribute('style', 'font-size:20px')
      let innerHTML = error.msg

      tdError.textContent = innerHTML
      tr.appendChild(tdNumber)

      tr.appendChild(tdError)
      let tdContext = document.createElement('td')
      let preContext = document.createElement('pre')
      preContext.setAttribute('style', ' white-space: pre-wrap; word-break: break-word;')
      tdContext.setAttribute('style', 'font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;')
      let errorContext = error.el.innerHTML
      preContext.textContent = errorContext
      tdContext.appendChild(preContext)
      tr.appendChild(tdContext)
      table.appendChild(tr)
      row += 1
    }

    tableWrapper.appendChild(table)
    return tableWrapper
  }

  getHelp () {
    return '<p style="font-size: x-large">How to proceed</p><br/>' +
      '<ol style="font-size:20px">' +
      '<li>Validation tags has to be either corrected outside texture using a text editor or has to be made to one of the compatible tag sets. </li>' +
      '<li>Strictly follow the order of the elements</li>' +
      '<li>XML Element is not valid: display the element</li>' +
      '<li>unknown tag: displays the content inside the unknown tag</li>' +
      '</ol>'
  }
}