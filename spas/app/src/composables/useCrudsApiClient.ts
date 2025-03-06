import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouterType } from '../../../../apis/cruds/src/index'

export default () => {
  return createTRPCProxyClient<AppRouterType>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000',
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
