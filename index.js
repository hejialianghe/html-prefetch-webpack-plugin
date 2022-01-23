/**
 * @function 找到需要prefetch的chunk信息
 *
 */
 function extractChunks({ compilation, optionsInclude }) {
    try {
      if (Array.isArray(optionsInclude)) {
        return compilation.chunks.filter((chunk) => {
          return chunk.name && optionsInclude.includes(chunk.name)
        })
      }
    } catch (err) {
      return compilation.chunks
    }
  }
  /**
   * @function 创建link标签
   *
   */
  function createHTMLElementString({ elementName, attributes = {}, closingTagRequired = false }) {
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
  
  /**
   * @function link标签插入html中
   *
   */
  function insertLinksIntoHead({ html, links = [] }) {
    if (links.length === 0) {
      return html
    }
  
    if (html.includes('</head>')) {
      return html.replace('</head>', links.join('') + '</head>')
    }
  
    if (html.includes('<body>')) {
      return html.replace('<body>', `<head>${links.join('')}\n</head><body>`)
    }
  
    throw new Error(`The HTML provided did not contain a </head> or a <body>:\n\n${html}`)
  }

  class PrefetchWebpackPlugin {
    constructor(options) {
      this.options = options
      this.name = 'prefetchWebpackPlugin'
    }
    apply(compiler) {
      compiler.hooks.compilation.tap(this.name, (compilation) => {
        let hook = compilation.hooks.htmlWebpackPluginAfterHtmlProcesscing
  
        if (!hook) {
          const [HtmlWebpackPlugin] = compiler.options.plugins.filter(
            (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin',
          )
  
          hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit
        }
  
        hook.tapAsync(this.name, (htmlPluginData, callback) => {
          try {
            callback(null, this.addLinks(compilation, htmlPluginData))
          } catch (error) {
            callback(error)
          }
        })
      })
    }
    addLinks(compilation, htmlPluginData) {
      const options = this.options
  
      const extractedChunks = extractChunks({
        compilation,
        optionsInclude: options.include,
      })
  
      // 找到chunk.files，chunk.files输出的文件名 files: [zstd-codec-core.3e5c4537ecb125426cc9.chunk.js]
      const allFiles = extractedChunks.reduce((accumulated, chunk) => {
        return accumulated.concat(chunk.files)
      }, [])
  
      const links = []
      const publicPath = compilation.outputOptions.publicPath || ''
      for (const file of allFiles) {
        const href = `${publicPath}${file}`
  
        const attributes = {
          href,
          rel: options.rel,
          as: options.as || 'script',
        }
  
        const linkElementString = createHTMLElementString({
          attributes,
          elementName: 'link',
        })
        links.push(linkElementString)
      }
  
      htmlPluginData.html = insertLinksIntoHead({
        links,
        html: htmlPluginData.html,
      })
  
      return htmlPluginData
    }
  }
  module.exports = PrefetchWebpackPlugin