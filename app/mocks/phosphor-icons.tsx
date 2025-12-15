// app/mocks/phosphor-icons.tsx
import React from "react";

// Mock component cho Icon
const MockIcon = (props: any) => (
  <span {...props} style={{ border: "1px dashed #ccc", padding: "2px", display: "inline-block", fontSize: "16px", ...props.style }}>
    {/* Hiển thị tên Icon nếu có thể để dễ debug, hoặc chỉ hiện hình vuông */}
    Icon
  </span>
);

// Type IconWeight (để tránh lỗi import type)
export type IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";

// Export các Icon cần thiết cho Demo
export const AirplaneInFlight = MockIcon;
export const Heart = MockIcon;
export const House = MockIcon;
export const Star = MockIcon;
export const Check = MockIcon;
export const X = MockIcon;

// Các icon khác (dự phòng)
export const User = MockIcon;
export const Gear = MockIcon;
export const SignOut = MockIcon;
export const List = MockIcon;
export const CaretDown = MockIcon;
export const CaretRight = MockIcon;
export const MagnifyingGlass = MockIcon;
export const Plus = MockIcon;
export const Trash = MockIcon;
export const Pencil = MockIcon;
export const Bell = MockIcon;
export const Warning = MockIcon;
export const ArrowLeft = MockIcon;
export const ArrowRight = MockIcon;

export default MockIcon;