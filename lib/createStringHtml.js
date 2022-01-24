  /**
   * @function 创建link标签
   *
   */
   function createStringHtml({ elementName, attributes = {}, closingTagRequired = false }) {
    const attributeStrings = []
    for (const [attributeName, attributeValue] of Object.entries(attributes).sort()) {
      if (attributeValue === '') {
        attributeStrings.push(attributeName)
      } else {
        attributeStrings.push(`${attributeName}=${JSON.stringify(attributeValue)}`)
      }
    }
  
    let elementString = `<${elementName}`
  
    if (attributeStrings.length > 0) {
      elementString += ' ' + attributeStrings.join(' ')
    }
  
    elementString += '>'
  
    if (closingTagRequired) {
      elementString += `</${elementName}>`
    }
  
    return elementString
  }

  module.exports = createStringHtml