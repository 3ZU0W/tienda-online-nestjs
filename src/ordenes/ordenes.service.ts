import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    // La orden debe asociarse a un cliente existente (requerimiento 4.4)
    const cliente = await this.clienteRepository.findOneBy({
      idCliente: createOrdenDto.idCliente,
    });
    if (!cliente) {
      throw new NotFoundException(
        `No se puede crear la orden: el cliente con id ${createOrdenDto.idCliente} no existe`,
      );
    }
    const orden = this.ordenRepository.create(createOrdenDto);
    return this.ordenRepository.save(orden);
  }

  findAll(): Promise<Orden[]> {
    return this.ordenRepository.find({ relations: ['cliente'] });
  }

  async findOne(id: number): Promise<Orden> {
    // Trae la orden con todos sus productos (requerimiento 4.4)
    const orden = await this.ordenRepository.findOne({
      where: { idOrden: id },
      relations: ['cliente', 'ordenProductos', 'ordenProductos.producto'],
    });
    if (!orden) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }
    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    const orden = await this.findOne(id);
    Object.assign(orden, updateOrdenDto);
    return this.ordenRepository.save(orden);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const orden = await this.findOne(id);
    await this.ordenRepository.softRemove(orden);
    return { mensaje: `Orden con id ${id} eliminada correctamente` };
  }
}
