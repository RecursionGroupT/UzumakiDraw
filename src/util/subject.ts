export type Category = "ME" | "FOOD" | "HOBBY" | "LIFESTYLE" | "OTHERS" | null;

export interface Subject {
  title: string;
  category: Category;
}

export const subjects: Subject[] = [
  {
    title: "似顔絵",
    category: "ME",
  },
  {
    title: "好きなおやつ",
    category: "FOOD",
  },
  {
    title: "好きなご飯",
    category: "FOOD",
  },
  {
    title: "好きな飲み物",
    category: "FOOD",
  },
  // {
  //   title: "好きなデザート",
  //   category: "FOOD",
  // },
  // {
  //   title: "好きなお菓子",
  //   category: "FOOD",
  // },
  // {
  //   title: "好きなジュース",
  //   category: "FOOD",
  // },
  {
    title: "好きなスポーツ",
    category: "HOBBY",
  },
  {
    title: "好きなゲーム",
    category: "HOBBY",
  },
  // {
  //   title: "好きなアニメ",
  //   category: "HOBBY",
  // },
  {
    title: "好きな映画",
    category: "HOBBY",
  },
  {
    title: "好きな音楽",
    category: "HOBBY",
  },
  // {
  //   title: "好きな本",
  //   category: "HOBBY",
  // },

  // {
  //   title: "好きな場所",
  //   category: "LIFESTYLE",
  // },
  {
    title: "現在の職業",
    category: "LIFESTYLE",
  },
  {
    title: "使っているSNS",
    category: "LIFESTYLE",
  },
  {
    title: "好きなブランド",
    category: "LIFESTYLE",
  },
  {
    title: "好きな動物",
    category: "OTHERS",
  },
  {
    title: "好きな季節",
    category: "OTHERS",
  },
  {
    title: "好きな色",
    category: "OTHERS",
  },
  {
    title: "好きなプログラミング言語",
    category: "OTHERS",
  },
];
