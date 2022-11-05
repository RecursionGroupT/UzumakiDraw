export type Category = "INTRO" | "SPORT" | "FOOD" | "HOBBY" | "GAME" | null;

export interface Subject {
  title: string;
  category: Category;
}
export const subjects: Subject[] = [
  {
    title: "自己紹介を書いてください",
    category: "INTRO",
  },
  {
    title: "好きな果物",
    category: "FOOD",
  },
  // {
  //   title: "好きな洋食",
  //   category: "FOOD",
  // },
  // {
  //   title: "好きな和食",
  //   category: "FOOD",
  // },
  // {
  //   title: "好きなデザート",
  //   category: "FOOD",
  // },
  {
    title: "好きなスポーツ",
    category: "SPORT",
  },
  // {
  //   title: "好きなスポーツ2",
  //   category: "SPORT",
  // },
  // {
  //   title: "好きなスポーツ3",
  //   category: "SPORT",
  // },
  {
    title: "好きな趣味",
    category: "HOBBY",
  },
  // {
  //   title: "好きな趣味2",
  //   category: "HOBBY",
  // },
  // {
  //   title: "好きな趣味3",
  //   category: "HOBBY",
  // },
  {
    title: "好きなゲーム",
    category: "GAME",
  },
];
