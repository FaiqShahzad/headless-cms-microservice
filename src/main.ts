import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5000',
        package: 'user',
        protoPath: join(__dirname, 'proto/user.proto'),
        loader: { keepCase: true },
      },
    },
  );
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(configService));
  await app.listen();
}
bootstrap();
