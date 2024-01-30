// import { WelcomeEmailTemplate } from '../../../../components/emails/WelcomeEmail'
// import { Resend } from 'resend'
// import * as React from 'react'

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   const req = await request.json();
 
//   const { name, email } = req; 

//   if (!email || !name) {
//     return Response.json({ message: 'Missing fields' }, { status: 400 });
//   }
 
//   try {
//     const data = await resend.emails.send({
//       from: 'Debby - Gidiopolis <debby@gidiopolis.com>',
//       to: [email],
//       subject: 'Welcome To Gidiopolis',
//       react: WelcomeEmailTemplate({ name, href: 'https://gidiopolis.com/' }) as React.ReactElement,
//     });

//     return Response.json(data);

//   } catch (error) {
//     console.log('There was an error sending the email', error)
//     return Response.json({ error });
//   }
// }


import { WelcomeEmailTemplate } from '../../../../components/emails/WelcomeEmail'
import { Resend } from 'resend'
import * as React from 'react'
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {

  try {
    const data = await resend.emails.send({
      from: 'Debby - Gidiopolis <debby@gidiopolis.com>',
      to: ['deniafe@gmail.com'],
      subject: 'Welcome To Gidiopolis',
      react: WelcomeEmailTemplate({ name: 'Toyin', href: 'https://gidiopolis.com/' }) as React.ReactElement,
    });

    return NextResponse.json(data);

  } catch (error) {
    console.log('There was an error sending the email', error)
    return NextResponse.json({ error });
  }
}