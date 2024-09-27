// const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export const nextImageUrl = (src: string) => {
  // const width = deviceSizes.find(
  //   (deviceSize) => deviceSize > window.innerWidth,
  // );
  return `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=100`;
};
