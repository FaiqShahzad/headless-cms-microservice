import { ArgumentsHost, Catch } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  constructor(private configService: ConfigService) {
    super();
  }

  catch(exception: any, host: ArgumentsHost) {
    if (this.configService.get<string>('NODE_ENV') === 'development')
      console.error(exception);

    if (exception instanceof RpcException) return super.catch(exception, host);
    return throwError(() => exception);
  }
}
