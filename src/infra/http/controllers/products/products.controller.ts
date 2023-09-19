import { ProductCreationProps } from '@domain/Product/Product';
import { EditProductDTO } from '@infra/http/dtos/Products/editProduct.dto';
import { ProductService } from '@infra/http/services/products/product.service';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Post('registered')
  async register(@Body() registerProductDTO: any) {
    const response: any = await this.productService.register(registerProductDTO);
    if (response instanceof Error) throw new BadRequestException(response.message);
    return { message: 'Produto cadastrado com sucesso!' };
  }

  @Get(':id/find')
  async findProductById(@Param('id') id: string) {
    const product = await this.productService.findProduct(id);
    return product;
  }

  @Get('all')
  async findAllProducts(): Promise< any> {
    const products = await this.productService.findAllProduct();
    return products;
  }

  @Delete(':id/delete')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
  }

  @Patch(':id/edit')
  async editProduct(
    @Body() editProductDTO: any,
    @Param('id') id: string,
  ) {
    const updatedProduct: any = await this.productService.editProduct(id, editProductDTO);
    if (updatedProduct instanceof Error) throw new BadRequestException(updatedProduct.message);
    return { message: 'Produto editado com sucesso!' };
  }

  @Put(':id/update')
  async editAllProduct(
    @Body() editProductDTO: any,
    @Param('id') id: string,
  ) {
    const updatedProduct:any = await this.productService.editAllProduct(id, editProductDTO);
    if (updatedProduct instanceof Error) throw new BadRequestException(updatedProduct.message);
    return { message: 'Produto editado com sucesso!' };
  }
}
