import { useState } from "react";
import { BLEND_MODES } from "pixi.js";
import { Container, Sprite, Stage } from "@pixi/react";
import ContainerSample from "../components/ContainerSample";
import AnimatedSpriteSample from "../components/AnimatedSpriteSample";
import GraphicsSample from "../components/GraphicsSample";
import NineSlicePlaneSample from "../components/NineSlicePlaneSample";
import ReactSpringSample from "../components/ReactSpringSample";

const SampleBoard = () => {
  const [transform, setTransform] = useState({ x: 400, y: 300, rotation: 0, scale: 1 });

  const bunnyUrl = "https://pixijs.io/pixi-react/img/bunny.png";

  const set = () => ({
    x: Math.random() * 800,
    y: Math.random() * 600,
    rotation: Math.random() * 10,
    scale: Math.max(1, Math.random() * 10),
  });

  return (
    <Stage width={800} height={600} options={{ background: 0x1099bb }} onPointerUp={() => setTransform(set)}>
      <Sprite image={bunnyUrl} blendMode={BLEND_MODES.COLOR} x={300} y={150} />
      <Sprite image={bunnyUrl} blendMode={BLEND_MODES.DST_IN} x={500} y={150} />
      <Sprite image={bunnyUrl} blendMode={BLEND_MODES.ADD} x={400} y={200} />

      <ContainerSample />

      <Container x={400} y={500}>
        <AnimatedSpriteSample />
      </Container>

      <GraphicsSample />

      <NineSlicePlaneSample />

      <ReactSpringSample {...transform} />
    </Stage>
  );
};

export default SampleBoard;
