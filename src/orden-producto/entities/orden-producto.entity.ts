import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Orden } from '../../ordenes/entities/orden.entity';
import { Producto } from '../../productos/entities/producto.entity';

/**
 * Tabla intermedia de la relación N:M entre Orden y Producto (relación "INCLUYE").
 * Como la relación lleva atributos extra (cantidad y precio_unitario), se
 * implementa como entidad propia con dos relaciones N:1 (patrón recomendado por
 * TypeORM para un many-to-many con datos adicionales).
 */
@Entity('orden_producto')
export class OrdenProducto {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idOrdenProducto: number;

  @ApiProperty({ example: 5 })
  @Column()
  idProducto: number;

  @ApiProperty({ example: 2 })
  @Column()
  idOrden: number;

  @ApiProperty({ example: 3 })
  @Column('int')
  cantidad: number;

  @ApiProperty({ example: 1200.5 })
  @Column('decimal', { precision: 10, scale: 2 })
  precio_unitario: number;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Orden, (orden) => orden.ordenProductos)
  @JoinColumn({ name: 'idOrden' })
  orden: Orden;

  @ManyToOne(() => Producto, (producto) => producto.ordenProductos)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;
}
