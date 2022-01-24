// Import types
/** @typedef {import("./typings").Options} PrefetchWebpackOptions */

'use strict';

const findChunks = require('./lib/findChunks')
const createStringHtml = require('./lib/createStringHtml')
const linksTagsIntoHead = require('./lib/linksTagsIntoHead')

class PrefetchWebpackPlugin {
  /**
* @param {PrefetchWebpackOptions} [options]
*/
  constructor(options) {
    /**@type {PrefetchWebpackOptions} */
    
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

    const extractedChunks = findChunks({
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

      const linkElementString = createStringHtml({
        attributes,
        elementName: 'link',
      })
      links.push(linkElementString)
    }

    htmlPluginData.html = linksTagsIntoHead({
      links,
      html: htmlPluginData.html,
    })

    return htmlPluginData
  }
}
module.exports = PrefetchWebpackPlugin