export interface Product {
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
  productId: number;
  price: number;
  image: string;
  brandId: number;

  productTypeId: number;
  productType: {
    name: string;
    description: string;
    dateCreated: Date;
    dateModified: Date;
    isActive: boolean;
    isDeleted: boolean;
    productTypeId: number;
    products: string[];
  };
  brand: {
    name: string;
    description: string;
    dateCreated: Date;
    dateModified: Date;
    isActive: boolean;
    isDeleted: boolean;
    brandId: number;
    products: string[];
  };
}
