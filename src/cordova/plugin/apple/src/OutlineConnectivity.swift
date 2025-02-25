// Copyright 2018 The Super Net Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import CocoaLumberjack
import CocoaLumberjackSwift
import Tun2socks

// Class to perform connectivity tests against remote Super Net servers.
class OutlineConnectivity: NSObject {

  // Asynchronously calls |completion| with a boolean representing whether |host| and |port|
  // are reachable.
  func isServerReachable(host: String, port: UInt16, completion: @escaping((Bool) -> Void)) {
    DispatchQueue.global(qos: .background).async {
      guard let networkIp = self.getNetworkIpAddress(host) else {
        DDLogError("Failed to retrieve the remote host IP address in the network");
        return completion(false)
      }
      completion(ShadowsocksCheckServerReachable(networkIp, Int(port), nil))
    }
  }

  // Calls getaddrinfo to retrieve the IP address literal as a string for |ipv4Address| in the
  // active network. This is necessary to support IPv6 DNS64/NAT64 networks. For more details see:
  // https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/UnderstandingandPreparingfortheIPv6Transition/UnderstandingandPreparingfortheIPv6Transition.html
  private func getNetworkIpAddress(_ ipv4Address: String) -> String? {
    var hints = addrinfo(
        ai_flags: AI_DEFAULT,
        ai_family: AF_UNSPEC,
        ai_socktype: SOCK_STREAM,
        ai_protocol: 0,
        ai_addrlen: 0,
        ai_canonname: nil,
        ai_addr: nil,
        ai_next: nil)
    var info: UnsafeMutablePointer<addrinfo>?
    let err = getaddrinfo(ipv4Address, nil, &hints, &info)
    if err != 0 {
      DDLogError("getaddrinfo failed \(String(describing: gai_strerror(err)))")
      return nil
    }
    defer {
      freeaddrinfo(info)
    }
    return getIpAddressString(addr: info?.pointee.ai_addr)
  }

  private func getIpAddressString(addr: UnsafePointer<sockaddr>?) -> String? {
    guard addr != nil else {
      DDLogError("Failed to get IP address string: invalid argument")
      return nil
    }
    var host : String?
    var buffer = [CChar](repeating: 0, count: Int(NI_MAXHOST))
    let err = getnameinfo(addr, socklen_t(addr!.pointee.sa_len), &buffer, socklen_t(buffer.count),
                          nil, 0, NI_NUMERICHOST | NI_NUMERICSERV)
    if err == 0 {
      host = String(cString: buffer)
    }
    return host
  }
}
