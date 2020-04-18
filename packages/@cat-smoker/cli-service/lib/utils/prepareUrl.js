/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file at
 * https://github.com/facebookincubator/create-react-app/blob/master/LICENSE
 */

const url = require('url')
const { chalk } = require('@cat-smoker/cli-shared-utils')
const address = require('address')
const defaultGateway = require('default-gateway') // 默认网关

module.exports = function prepareUrls (protocol, host, port) {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
    })
  const prettyPrintUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
    })

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::'
  let prettyHost, lanUrlForConfig
  let lanUrlForTerminal = chalk.gray('unavailable')
  if (isUnspecifiedHost) {
    prettyHost = 'localhost'
    try {
      // 局域网地址解析只能是 ipv4
      const result = defaultGateway.v4.sync()
      lanUrlForConfig = address.ip(result && result.interface)
      if (lanUrlForConfig) {
        // 检查是否是ipv4的私有地址
        // ip段在 A类：10.0.0.0—10.255.255.255 B类：172.16.0.0—172.31.255.555 C类：192.168.0.0—192.168.255.255
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            lanUrlForConfig
          )
        ) {
          // 如果是ipv4私有地址
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
        } else {
          // ipv4不是私有的，则抛弃改成未定义
          lanUrlForConfig = undefined
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host
    lanUrlForConfig = host
    lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost)
  const localUrlForBrowser = formatUrl(prettyHost)
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser
  }
}