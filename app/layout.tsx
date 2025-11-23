import "@/app/globals.css"

type Props = { children: React.ReactNode }

export default function RootLayout(props: Props) {
  return (
    <html lang={"ja"}>
      <body>{props.children}</body>
    </html>
  )
}
