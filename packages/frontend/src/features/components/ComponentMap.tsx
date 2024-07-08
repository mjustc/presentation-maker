import Shape from "./Shape";
import Image from "./Image";
import Text from "./Text";
import {
  ComponentType,
  IImageComponent,
  IShapeComponent,
  ITextComponent,
  IVideoComponent,
} from "../../types/component";
import Video from "./Video";

type BaseComponentProps = {
  onSelect: () => void;
  initialX: number;
  initialY: number;
  x: number;
  y: number;
};

type ComponentMapProps = {
  [key in ComponentType]: (props: any & BaseComponentProps) => JSX.Element; //change this any
};

export type TextComponentProps = ITextComponent & BaseComponentProps;
export type ShapeComponentProps = IShapeComponent & BaseComponentProps;
export type ImageComponentProps = IImageComponent & BaseComponentProps;
export type VideoComponentProps = IVideoComponent & BaseComponentProps;

const ComponentMap: ComponentMapProps = {
  [ComponentType.Text]: (props: TextComponentProps) => {
    const { onSelect, ...restProps } = props;
    return <Text onSelect={onSelect} key={`${props.id}`} {...restProps} />;
  },

  [ComponentType.Shape]: (props: ShapeComponentProps) => {
    const { onSelect, ...restProps } = props;
    return <Shape onSelect={onSelect} key={`${props.id}`} {...restProps} />;
  },
  [ComponentType.Image]: (props: ImageComponentProps) => {
    const { onSelect, ...restProps } = props;
    return <Image onSelect={onSelect} key={`${props.id}`} {...restProps} />;
  },
  [ComponentType.Video]: (props: VideoComponentProps) => {
    const { onSelect, ...restProps } = props;
    return <Video onSelect={onSelect} key={`${props.id}`} {...restProps} />;
  },
};

export default ComponentMap;
