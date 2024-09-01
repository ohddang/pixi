import { Texture } from "pixi.js";
import { Spring } from "react-spring";
import * as ReactPixiAnimated from "@pixi/react-animated";

interface ReactSpringSampleProps {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const ReactSpringSample = (props: ReactSpringSampleProps) => {
  return (
    <Spring to={props}>
      {(props) => <ReactPixiAnimated.Sprite texture={Texture.WHITE} tint={0xaddb67} anchor={0.5} {...props} />}
    </Spring>
  );
};

export default ReactSpringSample;
