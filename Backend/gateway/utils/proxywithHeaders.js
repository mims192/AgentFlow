import proxy from "express-http-proxy"

export const proxywithHeaders = (targetUrl) => {
    return proxy(targetUrl,{
        proxyReqOptDecorator: (proxyReqopts, srcReq)=>{
            if(srcReq.user){
                proxyReqopts.headers["x-user-id"]=srcReq.user.userId //custom header to pass userId to chat service
            }
            return proxyReqopts
        }
    })
}

