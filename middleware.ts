import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://www.blogna.blog','https://blogna.blog'] : ['http://localhost:3000', 'https://www.google.com']

export async function middleware(request: NextRequest) {


 const origin = request.headers.get('origin')

 if(origin && !allowedOrigins.includes(origin) || !origin) {
  return new NextResponse(null , {
    status : 400 ,
    statusText : "Bad Request" ,
    headers : {
      'Content-Type' : 'text/plain'
    }
  })
 }  

 return NextResponse.next()
}


export const config = {
  matcher : '/api/:path'
}