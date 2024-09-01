import { Graphics, Stage } from "@pixi/react";
import { FederatedPointerEvent, Graphics as GraphicsType, Rectangle, Renderer } from "pixi.js";
import { useCallback, useRef, useState } from "react";
import LineGraphics from "../graphics/LineGraphics";

export interface IVertex {
  x: number;
  y: number;
}

export interface IDrawingInfo {
  key: string;
  vertices: IVertex[];
  color: string;
  width: number;
}

const DrawingBoard = () => {
  const [drawingObjects, setDrawingObjects] = useState<IDrawingInfo[]>([]);
  const [currentDrawing, setCurrentDrawing] = useState<IDrawingInfo | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [isErase, setIsErase] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(true);
  const paletteColors = ["#ff3256", "#32dd56", "#3256ff", "#ff56ff", "#ffdd56", "#56ffff", "#ffa0a0", "#000000"];
  const toolItems = ["Draw", "Erase"];
  const rendererRef = useRef<Renderer | null>(null);

  const getRandomColorChannel = () => {
    return Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
  };

  const handlePointerDown = (event: FederatedPointerEvent | null) => {
    // setIsEarse(true);
    if (event !== null) {
      const newDrawing: IDrawingInfo = {
        vertices: [],
        color: selectedColor,
        key: `${event.globalX}-${event.globalY}`,
        width: 5,
      };
      newDrawing.vertices.push({ x: event.globalX, y: event.globalY });
      setCurrentDrawing(newDrawing);
    }
  };

  const handlePointerUp = () => {
    // setIsEarse(false);
    setCurrentDrawing(null);
    const key = currentDrawing?.vertices
      .map((vertex) => `${vertex.x}-${vertex.y}`)
      .join("-")
      .slice(0, 200);

    if (key != undefined) currentDrawing!.key = key;

    setDrawingObjects([...drawingObjects, currentDrawing!]);
  };

  const handlePointerMove = (event: FederatedPointerEvent | null) => {
    if (currentDrawing != null && event != null) {
      currentDrawing.vertices.push({ x: event.globalX, y: event.globalY });
      setCurrentDrawing({ ...currentDrawing });
      console.log("move", new Date().getMilliseconds());
    }
  };

  const draw = useCallback((g: GraphicsType) => {
    g.clear();
    g.beginFill("0xeeeeff");
    g.lineStyle(0);
    g.drawRect(0, 0, 800, 600);
    g.endFill();
  }, []);

  const hitGraphicsArea = new Rectangle(0, 0, 800, 600);

  const onhandleUp = (key: string) => {
    const newDrawingObjects = drawingObjects.filter((object) => object.key !== key);
    setDrawingObjects(newDrawingObjects);
  };

  const handleToolPointerUp = (tool: string) => {
    setIsDraw(tool === "Draw");
    setIsErase(tool === "Erase");
  };

  const onColorPicking = (event: FederatedPointerEvent | null) => {
    // get pixel color
  };

  return (
    <div style={{ position: "relative" }}>
      <Stage width={800} height={600} options={{ background: 0xeeeeee }}>
        <Graphics
          width={800}
          height={600}
          draw={draw}
          eventMode="static"
          interactive={isDraw}
          hitArea={hitGraphicsArea}
          onpointerdown={handlePointerDown}
          onpointermove={handlePointerMove}
          onpointerup={handlePointerUp}
        />
        {drawingObjects.map((object) => (
          <LineGraphics
            key={object.key}
            vertices={object.vertices}
            color={object.color}
            width={object.width}
            isActive={isErase}
            handleUp={() => onhandleUp(object.key)}
          />
        ))}
        {currentDrawing && (
          <Graphics
            draw={(g: GraphicsType) => {
              g.lineStyle(5, currentDrawing.color, 1);

              currentDrawing.vertices.forEach((vertex, index) => {
                if (index === 0) {
                  g.moveTo(vertex.x, vertex.y);
                } else {
                  g.lineTo(vertex.x, vertex.y);
                }
              });
            }}
          />
        )}
      </Stage>
      <div style={{ width: "200px", position: "absolute", bottom: "10px", right: "10px" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "5px" }}>
          {paletteColors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: `${color}`,
                boxShadow: `${selectedColor === color ? "0px 0px 4px 2px rgba(0,0,0,0.8)" : "none"}`,
              }}
              onPointerUp={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
      <div style={{ width: "200px", position: "absolute", top: "10px", left: "10px" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "5px" }}>
          {toolItems.map((tool) => (
            <button key={tool} onPointerUp={() => handleToolPointerUp(tool)}>
              {tool}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawingBoard;
