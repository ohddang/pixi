import { NineSlicePlane, useTick } from "@pixi/react";
import { useState } from "react";

const NineSlicePlaneSample = () => {
  const [i, setI] = useState(0);

  useTick(() => {
    setI((i) => i + 0.1);
  });

  return (
    <NineSlicePlane
      anchor={[200, 200]}
      pivot={[200, 200]}
      leftWidth={30}
      topHeight={30}
      rightWidth={30}
      bottomHeight={30}
      width={200 + 100 * Math.sin(i)}
      height={200 + 100 * Math.sin(i)}
      x={250 - 50 * Math.sin(i)}
      y={550 - 50 * Math.sin(i)}
      image="./sprite1.png"
    />
  );
};

export default NineSlicePlaneSample;
