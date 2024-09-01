import { useEffect, useMemo, useState } from "react";

import { BlurFilter, TextStyle } from "pixi.js";
import { Container, Text } from "@pixi/react";

const ContainerSample = () => {
  const [angle, setAngle] = useState(0);
  const [scale, setScale] = useState(1);
  const blurFilter = useMemo(() => new BlurFilter(2), []);

  useEffect(() => {
    let i = 0;
    let si = 0;
    setInterval(() => {
      i += 1;
      si += 0.05;
      setAngle(i % 360);
      setScale(Math.abs(Math.sin(si)) + 0.5);
    }, 30);
  }, []);

  return (
    <Container x={400} y={300} angle={angle} scale={scale}>
      <Text
        text="Hello World"
        anchor={0}
        // pivot={{ x: 200, y: 0 }}
        x={0}
        y={0}
        filters={[blurFilter]}
        style={
          new TextStyle({
            align: "center",
            fill: "0xffffff",
            fontSize: 50,
            letterSpacing: 20,
            dropShadow: true,
            dropShadowColor: "#E72264",
            dropShadowDistance: 6,
          })
        }
      />
    </Container>
  );
};

export default ContainerSample;
