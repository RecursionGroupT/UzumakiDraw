import { LineCap, LineJoin } from "konva/lib/Shape";
import { createContext, useState, useMemo } from "react";
// import { defaultDrawings } from "../util/defaultDrawings";
import { Category } from "../util/subject";

export type PenNames = "pencil" | "eraser" | "brush";

export interface IPenType {
  name: PenNames;
  lineCap: LineCap;
  lineJoin: LineJoin;
  globalCompositeOperation: GlobalCompositeOperation;
  dashEnabled: boolean;
}

export interface ILine {
  penType: IPenType;
  points: number[];
  color: string;
  width: number;
  opacity: number;
}

export interface Drawing {
  lines: ILine[] | [];
  category: Category;
  width: number;
  height: number;
  x: number;
  y: number;
  id: string;
  rotationDeg: {
    drawing: number;
    category: number;
  };
}

type DrawPageStageDimensions = { width: number; height: number };

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
  eraserWidth: number;
  setEraserWidth: React.Dispatch<React.SetStateAction<number>>;
  penOpacity: number;
  setPenOpacity: React.Dispatch<React.SetStateAction<number>>;
  drawPageStageDimensions: DrawPageStageDimensions;
  setDrawPageStageDimensions: React.Dispatch<React.SetStateAction<DrawPageStageDimensions>>;
}

type Props = {
  children: React.ReactNode;
};

export const KonvaContext: React.Context<IKonvaContext> = createContext({} as IKonvaContext);

export const KonvaContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [penColor, setPenColor] = useState<string>("black");
  const [penType, setPenType] = useState<IPenType>({
    name: "brush",
    lineCap: "round",
    lineJoin: "round",
    globalCompositeOperation: "source-over",
    dashEnabled: false,
  });
  const [isPenDash, setIsPenDash] = useState<boolean>(false);
  const [penWidth, setPenWidth] = useState<number>(10);
  const [eraserWidth, setEraserWidth] = useState<number>(50);
  const [penOpacity, setPenOpacity] = useState<number>(1);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [drawPageStageDimensions, setDrawPageStageDimensions] = useState<DrawPageStageDimensions>({
    width: 0,
    height: 0,
  });

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
      eraserWidth,
      setEraserWidth,
      penOpacity,
      setPenOpacity,
      drawPageStageDimensions,
      setDrawPageStageDimensions,
    }),
    [penColor, penWidth, penType, isPenDash, isTimerExpired, drawings, eraserWidth, penOpacity, drawPageStageDimensions]
  );

  return <KonvaContext.Provider value={value}>{children}</KonvaContext.Provider>;
};
