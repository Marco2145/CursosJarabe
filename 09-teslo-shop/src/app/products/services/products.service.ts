import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { forkJoin, map, Observable, of, pipe, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Unisex,
  tags: [],
  images: [],
  user: {} as User,
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    // Revisamos cache
    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${BASE_URL}/products`, {
        params: {
          limit: limit,
          offset: offset,
          gender: gender,
        },
      })
      .pipe(
        tap((response) => {
          this.productsCache.set(key, response);
        })
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    // Revisamos cache
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(`${BASE_URL}/products/${idSlug}`).pipe(
      tap((response) => {
        this.productCache.set(idSlug, response);
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    // En caso de que ID sea new -> Regresar un producto vacío
    if (id === 'new') {
      return of(emptyProduct);
    }

    // Revisamos cache
    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http.get<Product>(`${BASE_URL}/products/${id}`).pipe(
      tap((response) => {
        this.productCache.set(id, response);
      })
    );
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    // Observable en cadena
    const currentImages = productLike.images ?? [];

    return this.uploadImages(imageFileList).pipe(
      // Cada imagen se sube por separado al backend
      map((imageNames) => ({
        ...productLike,
        images: [...currentImages, ...imageNames],
      })),
      switchMap((updatedProduct) =>
        this.http.patch<Product>(`${BASE_URL}/products/${id}`, updatedProduct)
      ),
      tap((product) => this.updateProductCache(product, true))
    );

    // return this.http
    //   .patch<Product>(`${BASE_URL}/products/${id}`, productLike)
    //   .pipe(tap((product) => this.updateProductCache(product, false)));
  }

  createProduct(productLike: Partial<Product>, imageFileList?: FileList): Observable<Product> {
    // Observable en cadena
    const currentImages = productLike.images ?? [];

    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => ({
        ...productLike,
        images: [...currentImages, ...imageNames],
      })),
      switchMap((updatedProduct) =>
        this.http.post<Product>(`${BASE_URL}/products`, updatedProduct)
      ),
      // Actualizamos cache
      tap((product) => this.updateProductCache(product, true))
    );

    // return this.http
    //   .post<Product>(`${BASE_URL}/products`, productLike)
    //   .pipe(tap((product) => this.updateProductCache(product, true)));
  }

  updateProductCache(product: Product, alsoDeletePaginationCache: boolean) {
    const { id } = product;

    // Actualizar cache individual del producto
    this.productCache.set(id, product);

    // Cuando se genera un producto nuevo, es necesario limpiar las paginaciones porque no va a estar el nuevo producto ahí
    if (alsoDeletePaginationCache) {
      this.productsCache.clear();
    } else {
      // Actualizar cache de paginaciones
      this.productsCache.forEach((productResponse) => {
        productResponse.products = productResponse.products.map((currentProduct) => {
          return currentProduct.id === id ? product : currentProduct;
        });
      });
    }
  }

  uploadImages(images?: FileList): Observable<String[]> {
    if (!images) return of([]);

    const uploadObservables = Array.from(images).map((imageFile) => this.uploadImage(imageFile));

    // return forkJoin(uploadObservables).pipe(
    //   tap((imageNames) => console.log(imageNames))
    // );
    return forkJoin(uploadObservables);
  }

  uploadImage(imageFile: File): Observable<String> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http
      .post<{ fileName: string }>(`${BASE_URL}/files/product`, formData)
      .pipe(map((resp) => resp.fileName));
  }
}
