import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdenProductoService } from './orden-producto.service';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@ApiTags('Orden-Producto')
@Controller('orden_producto')
export class OrdenProductoController {
  constructor(private readonly ordenProductoService: OrdenProductoService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un producto a una orden (incluye idOrden)' })
  @ApiResponse({ status: 201, description: 'Registro creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'La orden o el producto no existen' })
  create(@Body() dto: CreateOrdenProductoDto) {
    return this.ordenProductoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las orden_producto' })
  @ApiResponse({ status: 200, description: 'Lista de orden_producto' })
  findAll() {
    return this.ordenProductoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden_producto por id' })
  @ApiResponse({ status: 200, description: 'Registro encontrado' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordenProductoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cantidad o precio unitario' })
  @ApiResponse({ status: 200, description: 'Registro actualizado' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrdenProductoDto,
  ) {
    return this.ordenProductoService.update(id, dto);
  }

  @Delete(':id/productos/:productId')
  @ApiOperation({ summary: 'Quitar un producto de la orden' })
  @ApiResponse({ status: 200, description: 'Producto quitado de la orden' })
  @ApiResponse({
    status: 404,
    description: 'El producto no existe dentro de la orden',
  })
  removeProductoDeOrden(
    @Param('id', ParseIntPipe) id: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.ordenProductoService.removeProductoDeOrden(id, productId);
  }
}
