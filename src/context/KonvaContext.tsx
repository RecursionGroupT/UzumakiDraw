import { createContext, useState, useMemo } from "react";

export type PenType = "pen" | "eraser" | "pencil";

interface IKonvaContext {
  penColor: string; // "black", "white"
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
  penWidth: number;
  setPenWidth: React.Dispatch<React.SetStateAction<number>>;
  penType: PenType;
  setPenType: React.Dispatch<React.SetStateAction<PenType>>;
}

type Props = {
  children: React.ReactNode;
};

export const KonvaContext: React.Context<IKonvaContext> = createContext({} as IKonvaContext);

export const KonvaContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [penColor, setPenColor] = useState<string>("black");
  const [penWidth, setPenWidth] = useState<number>(10);
  const [penType, setPenType] = useState<PenType>("pen");

  const value = useMemo(
    () => ({
      penColor,
      setPenColor,
      penWidth,
      setPenWidth,
      penType,
      setPenType,
    }),
    [penColor, penWidth, penType]
  );

  return <KonvaContext.Provider value={value}>{children}</KonvaContext.Provider>;
};
