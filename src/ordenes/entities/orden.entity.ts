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
import { Cliente } from '../../clientes/entities/cliente.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity('orden')
export class Orden {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idOrden: number;

  @ApiProperty({ example: 3, description: 'Cliente que realiza la orden' })
  @Column()
  idCliente: number;

  @ApiProperty({ example: 'pendiente', description: 'Estado de la orden' })
  @Column({ default: 'pendiente' })
  estado: string;

  @ApiProperty({ example: 2401.0 })
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  // Relación N a 1: Muchas órdenes pertenecen a un cliente
  @ManyToOne(() => Cliente, (cliente) => cliente.ordenes)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  // Lado de la relación N a M (a través de la tabla intermedia orden_producto)
  @OneToMany(() => OrdenProducto, (op) => op.orden)
  ordenProductos: OrdenProducto[];
}
