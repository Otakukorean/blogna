/** @type {import('next').NextConfig} */
const nextConfig = {
     output: 'export' ,
     experimental: {
          appDir: true,
        },
     images :{
          domains : ["images.unsplash.com","c4.wallpaperflare.com",'avatars.githubusercontent.com','cdn.discordapp.com','upload.wikimedia.org']

     } ,
     env : {
          NEXTAUTH_URL: process.env.NEXTAUTH_URL
     }
}

module.exports = nextConfig
