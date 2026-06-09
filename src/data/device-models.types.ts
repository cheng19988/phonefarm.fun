export type DeviceModel = {
  slug: string;
  name: string;
  brand: string;
  series: string;
  ramGb?: number;
  storageGb?: number;
  ports: string[];
  variant?: string;
  image: string;
  cardImage?: string;
  sourceFile?: string;
  boxSlug: string;
};
