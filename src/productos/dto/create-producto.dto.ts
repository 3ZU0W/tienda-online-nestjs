import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({ example: 1, description: 'Id de una categoría existente' })
  @IsInt()
  @IsNotEmpty()
  idCategoria: number;

  @ApiProperty({ example: 'Laptop Lenovo ThinkPad' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Laptop de 14 pulgadas, 16GB RAM' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 1200.5 })
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty({ example: 25 })
  @IsInt()
  @Min(0)
  stock: number;
}
