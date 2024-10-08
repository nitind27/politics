import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    style={{
      fill: "#fff",
    }}
    viewBox="0 0 50 50"
    {...props}
  >
    <path d="M25 2C12.319 2 2 12.319 2 25s10.319 23 23 23 23-10.319 23-23S37.681 2 25 2zm8.71 30.29c.39.39.39 1.03 0 1.42-.2.19-.45.29-.71.29s-.51-.1-.71-.29L25 26.42l-7.29 7.29c-.2.19-.45.29-.71.29s-.51-.1-.71-.29c-.39-.39-.39-1.03 0-1.42L23.58 25l-7.29-7.29c-.39-.39-.39-1.03 0-1.42.39-.39 1.03-.39 1.42 0L25 23.58l7.29-7.29c.39-.39 1.03-.39 1.42 0 .39.39.39 1.03 0 1.42L26.42 25l7.29 7.29z" />
  </svg>
);
export { SvgComponent as IconCross };
