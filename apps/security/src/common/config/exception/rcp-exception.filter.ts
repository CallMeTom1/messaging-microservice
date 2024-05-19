import { ArgumentsHost, Catch, RpcExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter {
    private readonly logger = new Logger(GrpcExceptionFilter.name);

    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        this.logger.error('An RPC exception occurred', exception.stack);

        const error = exception.getError();

        // Vérifier le type de 'error' pour s'assurer qu'il contient les informations nécessaires
        this.logger.log(`Error object: ${JSON.stringify(error)}`);



        // Lever une nouvelle exception RpcException avec l'erreur formatée
        return throwError(() => new RpcException(error));
    }
}
