import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Electrónica' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Productos electrónicos y tecnología' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
