import Head from "next/head";

const CustomHead: any = ({ title, description }) => {
  const keywords: string[] = ['Next.js', 'React', 'SWGU', 'Star Wars', 'TCG'];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <meta key="keywords" name="keywords" content={keywords.join(',')} />
    </Head>
  )
}

export default CustomHead