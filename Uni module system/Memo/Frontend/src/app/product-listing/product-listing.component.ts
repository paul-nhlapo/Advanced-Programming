import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Product } from '../models/product.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText: string = '';
  

  constructor(private storeService: StoreService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.storeService.getProducts().subscribe(response => {
      this.products = response;
      this.filteredProducts = response;
    });
  }

  getImageUrl(imageData: string): SafeUrl {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  filterProducts() {
    const filterText = this.searchText.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product => {
      return (
        product.name.toLowerCase().includes(filterText) ||
        product.description.toLowerCase().includes(filterText) ||
        product.price.toString().toLowerCase().includes(filterText) ||
        product.brand.name.toLowerCase().includes(filterText) ||
        product.productType.name.toLowerCase().includes(filterText)
      );
    });
  }

  sortProducts(sortBy: string, sortOrder: string): void {
    this.products.sort((a, b) => {
      const x = (a as any)[sortBy];
      const y = (b as any)[sortBy];
      if (sortOrder === 'asc') {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  }



}

