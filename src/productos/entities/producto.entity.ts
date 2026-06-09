import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity('producto')
export class Producto {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idProducto: number;

  @ApiProperty({ example: 2, description: 'Categoría a la que pertenece' })
  @Column()
  idCategoria: number;

  @ApiProperty({ example: 'Laptop Lenovo ThinkPad' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Laptop de 14 pulgadas, 16GB RAM' })
  @Column()
  descripcion: string;

  @ApiProperty({ example: 1200.5 })
  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @ApiProperty({ example: 25 })
  @Column('int')
  stock: number;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  // Relación N a 1: Muchos productos pertenecen a una categoría
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  // Lado de la relación N a M (a través de la tabla intermedia orden_producto)
  @OneToMany(() => OrdenProducto, (op) => op.producto)
  ordenProductos: OrdenProducto[];
}
