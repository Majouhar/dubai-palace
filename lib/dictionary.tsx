import { LocalDictPromise } from "@/app/types/commonTypes";

const dictionaries: LocalDictPromise= {
    en: () => import("./../app/dictionaries/en.json").then(r => r.default),
    ml: () => import("./../app/dictionaries/ml.json").then(r => r.default)
  }
  
  export const getDictionary = (lang:string) => {
    return dictionaries[lang]();
  }