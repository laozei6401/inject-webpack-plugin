import { Compiler } from "webpack"
import { optionConfig, Options } from "types"
import { HtmlTagObject, getHooks } from "html-webpack-plugin"

class InjectWebpackPlugin {
  private options: optionConfig[] = []
  constructor({ head, body }: Options) {
    this.options = [...this.praseConfig(head, "head"), ...this.praseConfig(body, "body")]
  }
  praseConfig(data = [], position) {
    return data.map(name => {
      return {
        position,
        ...(typeof name === "string" ? { name } : name)
      }
    })
  }
  getHeadAndBodyChunks(chunks: HtmlTagObject[] = []) {
    const headChunks = []
    const bodyChunks = []

    chunks.forEach(chunk => {
      if (chunk.tagName === "link") {
        headChunks.push(chunk)
      } else {
        const configure = this.options.find(i => (chunk.attributes.src as string).includes(i.name))

        ;(configure?.position === "head" ? headChunks : bodyChunks).push(chunk)
      }
    })

    return { headChunks, bodyChunks }
  }
  apply(compiler: Compiler) {
    if (getHooks) {
      compiler.hooks.compilation.tap("InjectWebpackPlugin", compilation => {
        getHooks(compilation).alterAssetTagGroups.tapAsync("InjectWebpackPlugin", (data, callback) => {
          const tags = [...data.headTags, ...data.bodyTags]
          const { headChunks, bodyChunks } = this.getHeadAndBodyChunks(tags)

          data.headTags = headChunks
          data.bodyTags = bodyChunks

          callback(null, data)
        })
      })
    } else {
      compiler.plugin("compilation", compilation => {
        compilation.plugin("html-webpack-plugin-alter-asset-tags", data => {
          const tags = [...data.head, ...data.body]
          const { headChunks, bodyChunks } = this.getHeadAndBodyChunks(tags)

          data.head = headChunks
          data.body = bodyChunks
        })
      })
    }
  }
}

export default InjectWebpackPlugin
module.exports = InjectWebpackPlugin
