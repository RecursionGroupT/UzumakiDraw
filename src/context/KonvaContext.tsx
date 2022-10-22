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

export interface ILine {
  penType: IPenType;
  points: number[];
  color: string;
  width: number;
}

export type Drawing = ILine[] | [];

interface IKonvaContext {
  penColor: string; // "black", "white"
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
  penWidth: number;
  setPenWidth: React.Dispatch<React.SetStateAction<number>>;
  penType: IPenType;
  setPenType: React.Dispatch<React.SetStateAction<IPenType>>;
  isPenDash: boolean;
  setIsPenDash: React.Dispatch<React.SetStateAction<boolean>>;
  isTimerExpired: boolean;
  setIsTimerExpired: React.Dispatch<React.SetStateAction<boolean>>;
  drawings: Drawing[];
  setDrawings: React.Dispatch<React.SetStateAction<Drawing[]>>;
}

type Props = {
  children: React.ReactNode;
};

export const KonvaContext: React.Context<IKonvaContext> = createContext({} as IKonvaContext);

export const KonvaContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [penColor, setPenColor] = useState<string>("black");
  const [penType, setPenType] = useState<IPenType>({
    name: "pencil",
    lineCap: "butt",
    lineJoin: "miter",
    shadowBlur: 0,
    globalCompositeOperation: "source-over",
    dashEnabled: false,
  });
  const [isPenDash, setIsPenDash] = useState<boolean>(false);
  const [penWidth, setPenWidth] = useState<number>(1);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const [drawings, setDrawings] = useState<Drawing[]>([]);

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
      isTimerExpired,
      setIsTimerExpired,
      drawings,
      setDrawings,
    }),
    [penColor, penWidth, penType, isPenDash, isTimerExpired, drawings]
  );

  return <KonvaContext.Provider value={value}>{children}</KonvaContext.Provider>;
};
