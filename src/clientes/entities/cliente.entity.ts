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
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity('cliente')
export class Cliente {
  @ApiProperty({ example: 1, description: 'Identificador único del cliente' })
  @PrimaryGeneratedColumn()
  idCliente: number;

  @ApiProperty({ example: 'Juan Carlos' })
  @Column()
  nombres: string;

  @ApiProperty({ example: 'Pérez' })
  @Column()
  paterno: string;

  @ApiProperty({ example: 'Gómez' })
  @Column()
  materno: string;

  @ApiProperty({ example: 'juan.perez@email.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  // Relación 1 a N: Un cliente puede tener muchas órdenes
  @OneToMany(() => Orden, (orden) => orden.cliente)
  ordenes: Orden[];
}
