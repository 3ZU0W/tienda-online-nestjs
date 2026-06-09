import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    // POST requiere idCategoria existente (requerimiento 4.3)
    const categoria = await this.categoriaRepository.findOneBy({
      idCategoria: createProductoDto.idCategoria,
    });
    if (!categoria) {
      throw new NotFoundException(
        `No se puede crear el producto: la categoría con id ${createProductoDto.idCategoria} no existe`,
      );
    }
    const producto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    // Incluye su categoría (requerimiento 4.3)
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id);
    if (
      updateProductoDto.idCategoria &&
      updateProductoDto.idCategoria !== producto.idCategoria
    ) {
      const categoria = await this.categoriaRepository.findOneBy({
        idCategoria: updateProductoDto.idCategoria,
      });
      if (!categoria) {
        throw new NotFoundException(
          `La categoría con id ${updateProductoDto.idCategoria} no existe`,
        );
      }
    }
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const producto = await this.findOne(id);
    await this.productoRepository.softRemove(producto);
    return { mensaje: `Producto con id ${id} eliminado correctamente` };
  }
}
