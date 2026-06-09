import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('categoria')
export class Categoria {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @ApiProperty({ example: 'Electrónica' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Productos electrónicos y tecnología' })
  @Column()
  descripcion: string;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  // Relación 1 a N: Una categoría puede tener muchos productos
  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
