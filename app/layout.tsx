import { Metadata } from 'next/types';
import Conatiner from './components/Container/Conatiner'
import LinksMenu from './components/LinksMenu/LinksMenu'
import './style.css'


export const metadata: Metadata = {
  icons: {
    icon: {
      url: "/favicon.png",
      type: "image/png",
    },
    shortcut: { url: "/favicon.png", type: "image/png" },
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/android-chrome-512x512.png" sizes="any" />
      <meta charSet='utf-8' />
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="description" content="Blogna - بلوجنا موقع عربي لنشر محتوى في مجال الانمي و المسلسلات العالمية" />
      <meta name='keyword' content='بلوجر,بلوج,الربح من بلوجر,شرح بلوجر,بلوجر 2023,ماهو بلوجر,قوالب بلوجر,الربح من بلوجر 2023,عمل بلوج,بلوجرز,انشاء مدونة بلوجر,إنشاء مدونة بلوجر,كيفية الربح من بلوجر,طريقة الربح من بلوجر,بلوجر 2022,شروط بلوجر,بلوجر 2021,كورس بلوجر,قالب بلوجر,شرح انشاء مدونة بلوجر,مدونة بلوجر,ماهو البلوج,الربح من بلوجر للمبتدئين,شرح ماهو بلوجر,دورة بلوجر كاملة للمبتدئين,دورة بلوجر 2023,عمل مدونة بلوجر,دورة بلوجر 2022,مدونة على بلوجر,دورة بلوجر 2021 , انمي,ملخص انمي,انمي جديد,تلخيص انمي,انمي حب,ملخصات انمي,انمي اكشن,مسلسلات انمي,انمي دراما,انمي رومانسي,انمي مدرسي,انمي في السريع,ملخص انمي كامل,بتاع انمي,انمي قاتل الشياطين,انمي ماش,انمي كيان,انمي روم بلس,افلام انمي,انميات حب,انميات اكشن,انميات رومانسيه,انمي بينو,ملخص فيلم انمي,انميات رومانسية مدرسية,تلخيصات انمي,انمي مصري,#ملخص انمي,ملخصات انميات,ملخص فلم انمي' />
      </head>

      <body>
     
     
      <Conatiner>
      
        {children}
        </Conatiner>
        </body>
    </html>
  )
}
