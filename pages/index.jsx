import { useIntl } from "react-intl";
import Seo from "../components/Seo/Seo";
import Image from "next/image";
import { Ads, HelpHome, OrdersHome } from "../components";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const intl = useIntl();

  return (
    <>
      <Seo
        title={"Onlayn Hamshira"}
        description={""}
        key={"onlayn hamshira , onlayn , hamshira"}
      />
      <main className="flex flex-col gap-7 py-5">
        <Ads />
        <OrdersHome />
        <HelpHome />
      </main>
    </>
  );
}
