import { useMemo } from "react";

import { Texture } from "pixi.js";
import { AnimatedSprite } from "@pixi/react";

const textureNames = ["sprite1.png", "sprite2.png", "sprite3.png", "sprite4.png", "sprite5.png"];

const AnimatedSpriteSample = () => {
  const textures = useMemo(() => {
    return textureNames.map((name) => {
      const texture = Texture.from(name);
      return texture;
    });
  }, []);

  return (
    <AnimatedSprite
      width={150}
      height={150}
      anchor={0.5}
      textures={textures}
      isPlaying={true}
      initialFrame={0}
      animationSpeed={0.1}
    />
  );
};

export default AnimatedSpriteSample;
