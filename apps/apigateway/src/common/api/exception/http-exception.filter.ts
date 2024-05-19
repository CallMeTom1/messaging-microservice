import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import {HttpAdapterHost} from "@nestjs/core";
import {IRpcException} from "../../../../../security/src/common/config/exception/rcp.exception";
import {RpcException} from "@nestjs/microservices";

@Catch()
export class AllGlobalExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: RpcException, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();


        const responseBody = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: exception.message,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, 500);
    }
}