import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenProducto } from './entities/orden-producto.entity';
import { Orden } from '../ordenes/entities/orden.entity';
import { Producto } from '../productos/entities/producto.entity';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@Injectable()
export class OrdenProductoService {
  constructor(
    @InjectRepository(OrdenProducto)
    private readonly ordenProductoRepository: Repository<OrdenProducto>,
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(dto: CreateOrdenProductoDto): Promise<OrdenProducto> {
    // La orden debe existir (requerimiento 4.5: incluye idOrden)
    const orden = await this.ordenRepository.findOneBy({ idOrden: dto.idOrden });
    if (!orden) {
      throw new NotFoundException(`La orden con id ${dto.idOrden} no existe`);
    }

    // El producto debe existir
    const producto = await this.productoRepository.findOneBy({
      idProducto: dto.idProducto,
    });
    if (!producto) {
      throw new NotFoundException(
        `El producto con id ${dto.idProducto} no existe`,
      );
    }

    // Si no se envía precio_unitario, se toma el precio actual del producto
    const ordenProducto = this.ordenProductoRepository.create({
      idOrden: dto.idOrden,
      idProducto: dto.idProducto,
      cantidad: dto.cantidad,
      precio_unitario: dto.precio_unitario ?? producto.precio,
    });
    return this.ordenProductoRepository.save(ordenProducto);
  }

  findAll(): Promise<OrdenProducto[]> {
    return this.ordenProductoRepository.find({
      relations: ['orden', 'producto'],
    });
  }

  async findOne(id: number): Promise<OrdenProducto> {
    const ordenProducto = await this.ordenProductoRepository.findOne({
      where: { idOrdenProducto: id },
      relations: ['orden', 'producto'],
    });
    if (!ordenProducto) {
      throw new NotFoundException(`orden_producto con id ${id} no encontrado`);
    }
    return ordenProducto;
  }

  async update(
    id: number,
    dto: UpdateOrdenProductoDto,
  ): Promise<OrdenProducto> {
    const ordenProducto = await this.findOne(id);
    // Solo se actualiza cantidad o precio unitario (requerimiento 4.5)
    if (dto.cantidad !== undefined) ordenProducto.cantidad = dto.cantidad;
    if (dto.precio_unitario !== undefined)
      ordenProducto.precio_unitario = dto.precio_unitario;
    return this.ordenProductoRepository.save(ordenProducto);
  }

  /**
   * Quita un producto de una orden:
   * DELETE /orden_producto/:id/productos/:productId
   * donde :id es el idOrden y :productId es el idProducto.
   */
  async removeProductoDeOrden(
    idOrden: number,
    idProducto: number,
  ): Promise<{ mensaje: string }> {
    const ordenProducto = await this.ordenProductoRepository.findOne({
      where: { idOrden, idProducto },
    });
    if (!ordenProducto) {
      throw new NotFoundException(
        `No existe el producto ${idProducto} dentro de la orden ${idOrden}`,
      );
    }
    await this.ordenProductoRepository.softRemove(ordenProducto);
    return {
      mensaje: `Producto ${idProducto} eliminado de la orden ${idOrden} correctamente`,
    };
  }
}
