import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateOrdenDto } from './create-orden.dto';

export class UpdateOrdenDto extends PartialType(CreateOrdenDto) {
  @ApiProperty({ example: 'pagada', required: false })
  @IsString()
  @IsOptional()
  estado?: string;
}
