import React from "react";
import { webcrypto } from "node:crypto";
import { TextDecoder, TextEncoder } from "node:util";

import '@testing-library/jest-dom';

Object.defineProperty(globalThis, "crypto", {
  value: webcrypto,
  configurable: true,
});
Object.defineProperty(globalThis, "TextEncoder", {
  value: TextEncoder,
  configurable: true,
});
Object.defineProperty(globalThis, "TextDecoder", {
  value: TextDecoder,
  configurable: true,
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt?: string } & Record<string, unknown>) => {
    const rest = { ...props };

    delete rest.priority;
    delete rest.fill;

    return React.createElement("img", {
      ...rest,
      alt: props.alt ?? "",
    });
  },
}));
