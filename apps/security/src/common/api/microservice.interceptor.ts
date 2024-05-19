import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {instanceToPlain} from "class-transformer";
import {MicroserviceCodeResponse} from "./enum";
import {ConfigKey, configManager} from "../config";
import isNil from 'lodash/isNil';
@Injectable()
export class MicroserviceInterceptor implements NestInterceptor {
    logger = new Logger(MicroserviceInterceptor.name);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const method = context.getHandler().name;
        return next
            .handle()
            .pipe(
                map((response: any) => {
                    return {code: this.mapToResponseCode(method), data: instanceToPlain(response, {
                            excludePrefixes: ['logger', '__']}), result: true}
                })
            );
    }

    mapToResponseCode(path: String): MicroserviceCodeResponse {
        this.logger.log(`path ${path}`);
        const part = path
            .replace(configManager.getValue(ConfigKey.APP_BASE_URL), '')
            .split('/')
            .filter(s => s.length > 0)
            .slice(0, 2)
            .map(s => s.toUpperCase());
        const code = MicroserviceCodeResponse[`${part.join('_')}_SUCCESS` as keyof typeof
            MicroserviceCodeResponse];
        this.logger.log(`Mapping path: ${path}`);
        return code != null ? MicroserviceCodeResponse.COMMON_SUCCESS : code;
    }
}