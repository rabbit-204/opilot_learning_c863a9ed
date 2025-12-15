/* eslint-disable */
// app/mocks/aic-kits.tsx
import React, { ReactNode } from 'react';

// --- 1. TYPES & INTERFACES ---
export interface HeaderHandle {
  hideDropdown: () => void;
}
export type Color = string;

// --- 2. HEADER & THEME ---
export const Header = React.forwardRef<HeaderHandle, any>((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    hideDropdown: () => console.log('Mock: hideDropdown called'),
  }));
  return (
    <div className="border-b p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-50">
      <div className="font-bold text-blue-600 cursor-pointer" onClick={props.onLogoClick}>AIC Academy (Mock)</div>
      <div className="flex gap-4">
        {props.navItems?.map((item: any) => (
          <button key={item.label} onClick={item.onClick} className={item.isActive ? "text-blue-600 font-bold" : "text-gray-600"}>{item.label}</button>
        ))}
      </div>
      <div>{props.isSignedIn ? "Profile" : <button onClick={props.onSignInClick}>Sign In</button>}</div>
    </div>
  );
});
Header.displayName = "Header";

export const ThemeProvider = ({ children }: { children: ReactNode, theme?: any }) => <>{children}</>;
export const getTheme = () => ({});

// --- 3. UI COMPONENTS (CLEAN PROPS) ---

// FIX: Box Component - Tách tất cả props style ra khỏi ...rest
export const Box = ({ 
  children, style, 
  // Spacing
  m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, px, py,
  // Dimensions & Display
  width, height, minWidth, minHeight, maxWidth, maxHeight, fw, fh,
  display, flex, flexDirection, flexWrap, alignItems, justifyContent, gap,
  // Styling
  bgColor, color, b, borderColor, r,
  // Position
  position, top, bottom, left, right, zIndex,
  // Misc
  opacity, overflow, cursor, pointerEvents, transform, transition, filter,
  // Events
  onClick,
  ...rest 
}: any) => {
  // Tạo style giả lập để giao diện trông đỡ vỡ (không bắt buộc nhưng nên có)
  const computedStyle: any = {
    ...style,
    padding: p, margin: m, marginBottom: mb, marginTop: mt,
    backgroundColor: bgColor ? `var(--${bgColor}, #f0f0f0)` : undefined,
    display: display,
    flexDirection: flexDirection,
    alignItems: alignItems,
    justifyContent: justifyContent,
    flexWrap: flexWrap,
    gap: gap,
    width: fw ? '100%' : width,
    height: fh ? '100%' : height,
    maxWidth: maxWidth,
    border: b ? '1px solid #ccc' : undefined,
    borderColor: borderColor,
    borderRadius: r === 'full' ? '9999px' : r ? '4px' : undefined,
    textAlign: rest.textAlign, // Một số trường hợp Box dùng textAlign
  };

  // Loại bỏ textAlign khỏi rest nếu đã xử lý
  const { textAlign, ...finalRest } = rest;

  return <div style={computedStyle} onClick={onClick} {...finalRest}>{children}</div>;
};

// FIX: Text Component
export const Text = ({ 
  children, style, 
  fontSize, fontWeight, color, textAlign, textTransform, useRichText, 
  ...rest 
}: any) => {
  const computedStyle = {
    ...style,
    fontSize: fontSize === '3xl' ? '1.8rem' : fontSize === '2xl' ? '1.5rem' : fontSize === 'xl' ? '1.25rem' : '1rem',
    fontWeight: fontWeight,
    color: color,
    textAlign: textAlign,
    textTransform: textTransform,
  };

  if (useRichText) {
    return <div style={computedStyle} dangerouslySetInnerHTML={{__html: children}} {...rest} />;
  }
  return <div style={computedStyle} {...rest}>{children}</div>;
};

// FIX: Button Component
export const Button = ({ text, icon: Icon, rightIcon: RightIcon, loading, corner, variant, size, color, ...props }: any) => (
  <button 
    className={`px-4 py-2 m-1 rounded flex items-center gap-2 justify-center transition-opacity 
      ${variant === 'outlined' ? 'border border-blue-600 text-blue-600' : 
        variant === 'text' ? 'text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white'}
      ${props.className || ''}`} 
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && <span className="animate-spin">↻</span>}
    {Icon && <span>★</span>} 
    <span>{text || props.children}</span>
    {RightIcon && <span>★</span>}
  </button>
);

export const Input = ({ label, leftIcon, rightIcon, error, helperText, onChange, value, ...props }: any) => (
  <div className="w-full mb-2">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <div className="relative flex items-center">
      {leftIcon && <span className="mr-2 text-gray-400 absolute left-2">{leftIcon}</span>}
      <input 
        className={`border p-2 rounded w-full ${leftIcon ? 'pl-8' : ''} ${error ? 'border-red-500' : 'border-gray-300'}`}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)} 
        {...props} 
      />
      {rightIcon && <span className="ml-2 text-gray-400">{rightIcon}</span>}
    </div>
    {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export const Touchable = ({ children, style, ...props }: any) => (
  <div role="button" {...props} style={{ cursor: 'pointer', ...style }}>{children}</div>
);

export const Divider = ({ color, thickness, orientation, ...props }: any) => (
  <hr 
    className={`border-gray-200 ${orientation === 'vertical' ? 'h-full w-px mx-2 inline-block' : 'w-full my-4'}`} 
    style={{ 
      borderColor: color, 
      borderWidth: thickness ? `${thickness}px` : undefined 
    }} 
    {...props} 
  />
);

export const Loading = ({ children, size, loading, color }: any) => (
  <div>
    {loading && <div className="text-blue-500 text-sm">Loading...</div>}
    {children}
  </div>
);

export const Skeleton = ({ children, visible, variant, width, height }: any) => (
  visible ? children : (
    <div 
      className={`animate-pulse bg-gray-200 ${variant === 'circle' ? 'rounded-full' : 'rounded'}`} 
      style={{ width: width || '100%', height: height || '20px' }}
    ></div>
  )
);

export const Tag = ({ children, color, icon, rightIcon, variant, size, radius, textColor, ...props }: any) => (
  <span className={`px-2 py-1 rounded text-xs border inline-flex items-center gap-1 mx-1`} style={{backgroundColor: '#f3f4f6'}} {...props}>
    {icon && <span>•</span>}
    {children}
    {rightIcon && <span>•</span>}
  </span>
);

export const Base = ({ children, header }: any) => (
  <div className="min-h-screen bg-gray-50 font-sans">
    {header && (
      <Header 
        navItems={header.navItems} 
        isSignedIn={header.isSignedIn} 
        onSignInClick={header.onSignInClick}
      />
    )}
    <div className="container mx-auto p-4">{children}</div>
  </div>
);

// FIX: Accordion tách bgColor
export const Accordion = ({ renderHeader, renderContent, initialExpanded, disabled, bgColor, ...props }: any) => {
  const [isOpen, setIsOpen] = React.useState(initialExpanded || false);
  return (
    <div className={`border rounded mb-2 bg-white ${disabled ? 'opacity-50 pointer-events-none' : ''}`} {...props}>
      <div className="p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center" onClick={() => !disabled && setIsOpen(!isOpen)}>
        <div>{renderHeader(isOpen)}</div>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && <div className="p-3 border-t">{renderContent()}</div>}
    </div>
  );
};

export const Carousel = <T,>({ items, renderItem, itemsPerView, itemWidth, autoPlay, autoScroll, ...props }: any) => (
  <div className="overflow-hidden p-4 border rounded bg-white relative">
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {items?.map((item: T, index: number) => (
        <div key={index} style={{ minWidth: itemWidth || '200px', flex: itemsPerView ? `0 0 ${100/itemsPerView}%` : undefined }}>
          {renderItem({ item, isFocused: false })}
        </div>
      ))}
    </div>
    {autoPlay && <div className="text-xs text-gray-400 mt-1 text-center">AutoPlay Enabled</div>}
  </div>
);

export const List = <T,>({ data, renderItem, ListHeaderComponent, ListFooterComponent, ItemSeparatorComponent }: any) => (
  <div className="space-y-2">
    {ListHeaderComponent}
    {data?.map((item: T, index: number) => (
      <React.Fragment key={index}>
        {renderItem(item, index)}
        {index < data.length - 1 && ItemSeparatorComponent}
      </React.Fragment>
    ))}
    {ListFooterComponent}
  </div>
);

export const Art = ({ type, art: ArtComponent, size, weight, color, ...props }: any) => {
  if (type === 'icon' && typeof ArtComponent === 'function') {
    return <span style={{color}} className={`text-${size}`}>[Icon]</span>; 
  }
  if (type === 'image') return <img src={ArtComponent} alt="art" className="w-10 h-10 object-cover rounded" />;
  if (type === 'emoji') return <span style={{ fontSize: '24px' }}>{ArtComponent}</span>;
  if (type === 'svg') return <div dangerouslySetInnerHTML={{ __html: ArtComponent }} className="w-10 h-10" />;
  
  return <span>{ArtComponent}</span>;
};

export const Vimeo = ({ videoId, playerHeight, config, callbacks, ...props }: any) => (
  <div className="bg-black text-white flex items-center justify-center rounded" style={{ height: playerHeight || 300 }}>
    Vimeo Video Placeholder (ID: {videoId})
  </div>
);

export const Select = (props: any) => <select {...props} />;
export const Card = (props: any) => <div {...props} />;
export const Badge = (props: any) => <span {...props} />;