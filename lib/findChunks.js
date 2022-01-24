/**
 * @function 找到需要prefetch的chunk信息
 *
 */
 function findChunks({ compilation, optionsInclude }) {
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

  module.exports = findChunks