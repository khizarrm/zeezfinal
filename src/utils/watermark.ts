interface WatermarkOptions {
  text?: string;
  opacity?: number;
  fontSize?: number;
  color?: string;
  rotate?: number;
  tile?: boolean;
}

const defaultOptions: WatermarkOptions = {
  text: 'ZEEZ CREATIONS',
  opacity: 0.15,
  fontSize: 24,
  color: '#ffffff',
  rotate: -30,
  tile: true,
};

export async function applyWatermark(
  imageSrc: string,
  options: WatermarkOptions = {}
): Promise<string> {
  const config = { ...defaultOptions, ...options };

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(imageSrc);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.globalAlpha = config.opacity!;
      ctx.font = `bold ${config.fontSize}px Arial`;
      ctx.fillStyle = config.color!;

      if (config.tile) {
        const textWidth = ctx.measureText(config.text!).width;
        const spacing = textWidth + 100;
        const verticalSpacing = config.fontSize! + 80;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((config.rotate! * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        for (let y = -canvas.height; y < canvas.height * 2; y += verticalSpacing) {
          for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
            ctx.fillText(config.text!, x, y);
          }
        }

        ctx.restore();
      } else {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((config.rotate! * Math.PI) / 180);
        ctx.textAlign = 'center';
        ctx.fillText(config.text!, 0, 0);
        ctx.restore();
      }

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    img.onerror = () => {
      resolve(imageSrc);
    };

    img.src = imageSrc;
  });
}

export async function applyWatermarkToBlob(blob: Blob, options?: WatermarkOptions): Promise<string> {
  const url = URL.createObjectURL(blob);
  try {
    const result = await applyWatermark(url, options);
    URL.revokeObjectURL(url);
    return result;
  } catch {
    URL.revokeObjectURL(url);
    throw new Error('Failed to apply watermark');
  }
}

