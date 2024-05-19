import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {SecurityServiceClient} from "../../../security/src/feature/common/security";
import {ClientGrpc} from "@nestjs/microservices";
import {MessagingServiceClient} from "../../../messaging/src/common/messaging";

@Injectable()
export class MessagingService {
    private messagingService : MessagingServiceClient;
    constructor(
        @Inject('security') private client : ClientGrpc) {}

}