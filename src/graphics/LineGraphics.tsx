import { Graphics } from "@pixi/react";
import { FederatedPointerEvent, Graphics as GraphicsType, Point, Polygon } from "pixi.js";
import { useEffect, useState } from "react";
import { IVertex } from "../board/DrawingBoard";

interface LineGraphicsProps {
  vertices: IVertex[];
  color: string;
  width: number;
  isActive: boolean;
  handleUp: (event: FederatedPointerEvent | null) => void;
}
const LineGraphics = (props: LineGraphicsProps) => {
  const [polygon, setPolygon] = useState<Polygon>();

  useEffect(() => {
    const points: Point[] = [];

    props.vertices.forEach((vertex) => {
      points.push(new Point(vertex.x, vertex.y));
    });

    const polygon = new Polygon(points);

    setPolygon(polygon);
  }, [props.vertices, props.width]);

  return (
    <Graphics
      eventMode="static"
      interactive={props.isActive}
      hitArea={polygon}
      draw={(g: GraphicsType) => {
        g.lineStyle(5, props.color, 1);

        // hit area draw
        if (polygon !== undefined) {
          g.drawPolygon(polygon);
        }

        // props.vertices.forEach((vertex, index) => {
        //   if (index === 0) {
        //     g.moveTo(vertex.x, vertex.y);
        //   } else {
        //     g.lineTo(vertex.x, vertex.y);
        //   }
        // });
      }}
      onpointerup={props.handleUp}
      on
    />
  );
};

export default LineGraphics;
