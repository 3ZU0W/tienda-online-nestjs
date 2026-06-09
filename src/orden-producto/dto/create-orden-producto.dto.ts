import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrdenProductoDto {
  @ApiProperty({ example: 1, description: 'Id de una orden existente' })
  @IsInt()
  @IsNotEmpty()
  idOrden: number;

  @ApiProperty({ example: 5, description: 'Id de un producto existente' })
  @IsInt()
  @IsNotEmpty()
  idProducto: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  cantidad: number;

  @ApiProperty({
    example: 1200.5,
    required: false,
    description: 'Si no se envía, se toma el precio actual del producto',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  precio_unitario?: number;
}
