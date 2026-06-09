import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Documentación OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Tienda Online API - TAW-251')
    .setDescription(
      'API REST para gestionar clientes, categorías, productos y órdenes',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Expone el JSON OpenAPI en /openapi.json (útil para Scalar y herramientas externas)
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'openapi.json',
  });

  // Documentación con Scalar en /api
  app.use(
    '/api',
    apiReference({
      content: document,
    }),
  );

  // Puerto dinámico requerido por Render
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Aplicación corriendo en el puerto ${port}`);
  console.log(`Documentación Scalar disponible en /api`);
}
bootstrap();
