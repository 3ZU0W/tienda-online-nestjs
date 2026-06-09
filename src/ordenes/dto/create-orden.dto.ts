import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrdenDto {
  @ApiProperty({ example: 1, description: 'Id de un cliente existente' })
  @IsInt()
  @IsNotEmpty()
  idCliente: number;

  @ApiProperty({ example: 'pendiente', required: false })
  @IsString()
  @IsOptional()
  estado?: string;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  total?: number;
}
