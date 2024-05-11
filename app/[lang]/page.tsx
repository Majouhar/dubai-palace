import Image from "next/image";
import classes from "./home.module.css";
import { getDictionary } from "@/lib/dictionary";
import Line from "../components/line";
import ShufflingCards from "../components/items/shufflingItemCard";
import { getAllProducts } from "@/lib/actions";
import HomeDisplayImage from "@/assets/images/HomeBannerImage.png";

export default async function Home({
  params: { lang },
}: Readonly<{
  params: { lang: string };
}>) {
  const dict = await getDictionary(lang);
  const allData = await getAllProducts();
  return (
    <main>
      <div className={classes.container}>
        <div className={classes.title}>
          <h1
            className={
              lang === "ml" ? classes["ml-title"] : classes["en-title"]
            }
          >
            {dict["title-p1"]}
            <span>{dict["title-p2"]}</span>
            {dict["title-p3"]}
            <span>{dict["title-p4"]}</span>
            {dict["title-p5"]}
            <span>{dict["title-p6"]}</span>
          </h1>
          <Line />
          <p>{dict["what-looking"]}</p>
          <div className={classes.sections}>
            <div className={classes.row}>
              <Bubbles label={dict["gulf-pardha"]} />
              <Bubbles label={dict["churidhar"]} />
              <Bubbles label={dict["top"]} />
            </div>

            <div className={classes.row}>
              <Bubbles label={dict["shalls"]} />
              <Bubbles label={dict["fullsleeve-maxi"]} />
              <Bubbles label={dict["mens"]} />
            </div>
          </div>
          <p>{dict["explore-all"]}</p>
        </div>
        <div className={classes.banner}>
          <Image src={HomeDisplayImage} width={400} height={400} alt="Kerala Women Wearing Abaya" />
        </div>
      </div>
      <section className={classes.newArrivals}>
        <div className={classes.head}>
          <Line isReverse />
          <h2>New Arrivals</h2>
          <Line />
        </div>
        <ShufflingCards newData={allData} />
      </section>
    </main>
  );
}

const Bubbles = ({ label }: Readonly<{ label: string }>) => {
  return (
    <div className={classes.bubble}>
      <h6>{label}</h6>
    </div>
  );
};
