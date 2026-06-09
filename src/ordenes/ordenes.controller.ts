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
import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@ApiTags('Órdenes')
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una orden asociada a un cliente existente' })
  @ApiResponse({ status: 201, description: 'Orden creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'El cliente indicado no existe' })
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenesService.create(createOrdenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las órdenes' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes' })
  findAll() {
    return this.ordenesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por id con todos sus productos' })
  @ApiResponse({ status: 200, description: 'Orden con sus productos' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordenesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar el estado de la orden' })
  @ApiResponse({ status: 200, description: 'Orden actualizada' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrdenDto: UpdateOrdenDto,
  ) {
    return this.ordenesService.update(id, updateOrdenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una orden' })
  @ApiResponse({ status: 200, description: 'Orden eliminada' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordenesService.remove(id);
  }
}
