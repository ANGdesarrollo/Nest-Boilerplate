import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
  ValidateNested,
  IsArray,
  IsEmail,
  Min,
  Max,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

class Coordenadas {
  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;
}

class Ubicacion {
  @IsString()
  pais: string;

  @IsString()
  ciudad: string;

  @IsString()
  codigoPostal: string;

  @ValidateNested()
  @Type(() => Coordenadas)
  coordenadas: Coordenadas;
}

class Contacto {
  @IsEmail()
  email: string;

  @IsString()
  telefono: string;
}

class Tienda {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsNumber()
  fundadaEn: number;

  @IsBoolean()
  activa: boolean;

  @IsNumber()
  @Min(0)
  @Max(5)
  calificacion: number;

  @ValidateNested()
  @Type(() => Ubicacion)
  ubicacion: Ubicacion;

  @ValidateNested()
  @Type(() => Contacto)
  contacto: Contacto;
}

class Caracteristicas {
  @IsString()
  pantalla: string;

  @IsString()
  procesador: string;

  @IsString()
  ram: string;

  @IsString()
  almacenamiento: string;
}

class Producto {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  marca: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  descuento: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @ValidateNested()
  @Type(() => Caracteristicas)
  caracteristicas: Caracteristicas;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  coloresDisponibles: string[];
}

class Subcategoria {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @ValidateNested({ each: true })
  @Type(() => Producto)
  productos: Producto[];
}

class Categoria {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @ValidateNested({ each: true })
  @Type(() => Subcategoria)
  subcategorias: Subcategoria[];
}

class Inventario {
  @IsNumber()
  @Min(0)
  totalProductos: number;

  @ValidateNested({ each: true })
  @Type(() => Categoria)
  categorias: Categoria[];
}

class Cliente {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  fechaRegistro: string;
}

class Estadisticas {
  @IsNumber()
  @Min(0)
  @Max(1)
  tasaDeConversion: number;

  @IsNumber()
  @Min(0)
  promedioValorCarrito: number;
}

export class MegaTiendaOnline {
  @ValidateNested()
  @Type(() => Tienda)
  tienda: Tienda;

  @ValidateNested()
  @Type(() => Inventario)
  inventario: Inventario;

  @ValidateNested()
  @Type(() => Cliente)
  clientes: Cliente;

  @ValidateNested()
  @Type(() => Estadisticas)
  estadisticas: Estadisticas;
}

//

import { z } from 'zod';

const coordenadasSchema = z.object({
  latitud: z.number(),
  longitud: z.number(),
});

const ubicacionSchema = z.object({
  pais: z.string(),
  ciudad: z.string(),
  codigoPostal: z.string(),
  coordenadas: coordenadasSchema,
});

const contactoSchema = z.object({
  email: z.string().email(),
  telefono: z.string(),
});

const tiendaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  fundadaEn: z.number().int().positive(),
  activa: z.boolean(),
  calificacion: z.number().min(0).max(5),
  ubicacion: ubicacionSchema,
  contacto: contactoSchema,
});

const caracteristicasSchema = z.object({
  pantalla: z.string(),
  procesador: z.string(),
  ram: z.string(),
  almacenamiento: z.string(),
});

const productoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  marca: z.string(),
  precio: z.number().positive(),
  descuento: z.number().min(0).max(1),
  stock: z.number().int().nonnegative(),
  caracteristicas: caracteristicasSchema,
  coloresDisponibles: z.array(z.string()).nonempty(),
});

const subcategoriaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  productos: z.array(productoSchema),
});

const categoriaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  subcategorias: z.array(subcategoriaSchema),
});

const inventarioSchema = z.object({
  totalProductos: z.number().int().nonnegative(),
  categorias: z.array(categoriaSchema),
});

const clienteSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  email: z.string().email(),
  fechaRegistro: z.string(),
});

const estadisticasSchema = z.object({
  tasaDeConversion: z.number().min(0).max(1),
  promedioValorCarrito: z.number().positive(),
});

export const megaTiendaOnlineSchema = z.object({
  tienda: tiendaSchema,
  inventario: inventarioSchema,
  clientes: clienteSchema,
  estadisticas: estadisticasSchema,
});
