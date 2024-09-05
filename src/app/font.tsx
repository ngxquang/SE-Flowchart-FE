import localfont from "next/font/local";

export const lato = localfont({
  src: [
    {
      path: '../../public/fonts/Lato-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lato-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lato-Italic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Lato-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lato-Bold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: "--font-lato"
})