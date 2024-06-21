import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { Product } from '../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  brands: any[] = [];
  productTypes: any[] = [];
  product = {} as Product;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      productTypeId: ['', Validators.required],
     
    });

    this.storeService.getBrands().subscribe((brands: any[]) => {
      this.brands = brands;
    });

    this.storeService.getProductTypes().subscribe((productTypes: any[]) => {
      this.productTypes = productTypes;
    });


  }

  getImageUrl(imageData: string): SafeUrl {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  // Handle file input change event
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
    } else {
      this.selectedImage = null;
    }
  }
  

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        brandId: this.productForm.value.brandId,
        productTypeId: this.productForm.value.productTypeId,
        image: 'this.productForm.value.image',
        dateCreated: new Date(),
        dateModified: new Date(),
        isActive: true,
        isDeleted: false,
        productId: 0,
        productType: this.productTypes.find(pt => pt.productTypeId == this.productForm.value.productTypeId),
        brand: this.brands.find(b => b.brandId == this.productForm.value.brandId)
      };
  
      this.storeService.addProduct(product).subscribe((response: any) => {
      window.alert('Product added successfully!');
      }
      );


    }
  }
}
