import { LineCap, LineJoin } from "konva/lib/Shape";
import { createContext, useState, useMemo } from "react";

export type PenNames = "pencil" | "eraser" | "felt-tip" | "brush";

export interface IPenType {
  name: PenNames;
  lineCap: LineCap;
  lineJoin: LineJoin;
  shadowBlur: number;
  globalCompositeOperation: GlobalCompositeOperation;
  dashEnabled: boolean;
}

interface IKonvaContext {
  penColor: string; // "black", "white"
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
  penWidth: number;
  setPenWidth: React.Dispatch<React.SetStateAction<number>>;
  penType: IPenType;
  setPenType: React.Dispatch<React.SetStateAction<IPenType>>;
  isPenDash: boolean;
  setIsPenDash: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = {
  children: React.ReactNode;
};

export const KonvaContext: React.Context<IKonvaContext> = createContext({} as IKonvaContext);

export const KonvaContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [penColor, setPenColor] = useState<string>("black");
  const [penWidth, setPenWidth] = useState<number>(10);
  const [penType, setPenType] = useState<IPenType>({
    name: "pencil",
    lineCap: "butt",
    lineJoin: "miter",
    shadowBlur: 0,
    globalCompositeOperation: "source-over",
    dashEnabled: false,
  });
  const [isPenDash, setIsPenDash] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      penColor,
      setPenColor,
      penWidth,
      setPenWidth,
      penType,
      setPenType,
      isPenDash,
      setIsPenDash,
    }),
    [penColor, penWidth, penType, isPenDash]
  );

  return <KonvaContext.Provider value={value}>{children}</KonvaContext.Provider>;
};
