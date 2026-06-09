import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { CreateOrdenProductoDto } from './create-orden-producto.dto';

export class UpdateOrdenProductoDto extends PartialType(CreateOrdenProductoDto) {
  @ApiProperty({ example: 4, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  cantidad?: number;

  @ApiProperty({ example: 1150.0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  precio_unitario?: number;
}
