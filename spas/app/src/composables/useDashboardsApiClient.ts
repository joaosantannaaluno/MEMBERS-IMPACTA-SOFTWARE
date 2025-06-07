import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouterType } from '@manager-members/dashboards'

export default () => {
  return createTRPCProxyClient<AppRouterType>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3002',
        // You can pass any HTTP headers you wish here
        //   async headers() {
        //     return {
        //       authorization: getAuthCookie(),
        //     }
        //   },
      }),
    ],
  })
}
