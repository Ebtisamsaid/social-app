export const generateUrl=(url)=>{ return   `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Activation</title>
    </head>
    <body>
        <form action="/activate-account" method="POST">
          
            
            <a role="button" href=${url}>verify-Email</a>
        </form>
    </body>
    </html>
    `}