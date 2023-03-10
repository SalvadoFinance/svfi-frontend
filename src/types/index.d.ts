declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.webp';

declare interface SvgrComponent extends React.FC<React.SVGProps<SVGSVGElement>> {}

declare module '*.svg' {
  const content: SvgrComponent;
  export default content;
}
declare module '*.svg?url';

declare interface Window {
  ethereum: any;
  gtag: any;
}

declare interface IConnection {
  account?: string;
  chainId: string;
}
