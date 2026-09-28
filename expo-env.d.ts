/// <reference types="expo/types" />

declare module "*.svg" {
  import type { ComponentType } from "react";
  import type { SvgProps } from "react-native-svg";

  const content: ComponentType<SvgProps>;
  export default content;
}
// NOTE: This file should not be edited and should be in your git ignore
