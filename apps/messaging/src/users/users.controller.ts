import { Controller, Inject } from '@nestjs/common';
import { MessagingServiceController, MessagingServiceControllerMethods, Message, Empty, User, CreateConversationRequest, Conversation, QueryMessagesRequest, Conversations, Users } from "../common/messaging";
import { Observable, of } from 'rxjs';
import {UsersService} from "./users.service";

@Controller()
@MessagingServiceControllerMethods()
export class UsersController implements MessagingServiceController {
    constructor(private readonly usersService: UsersService) {}

    sendMessage(request: Message): Promise<Empty> | Observable<Empty> | Empty {
        this.usersService.send_message(request);
        return of({});
    }

    queryMessages(request: QueryMessagesRequest): Observable<Message> {
        return this.usersService.queryMessages(request);
    }

    createUser(request: User): Promise<User> | Observable<User> | User {
        this.usersService.create_user(request);
        return of(request);  // Assuming the user is returned with the new userId
    }

    createConversation(request: CreateConversationRequest): Promise<Conversation> | Observable<Conversation> | Conversation {
        this.usersService.create_conversation(request);
        const newConversation = this.usersService.get_conversations().find(conv => conv.userIds.includes(request.userIds[0]));
        return of(newConversation);
    }


    getConversation(request: Empty): Promise<Conversations> | Observable<Conversations> | Conversations {
        const allConversations = this.usersService.get_conversations();
        return of({ conversations: allConversations });
    }

    getUsers(request: Empty): Promise<Users> | Observable<Users> | Users {
        const allUsers = this.usersService.get_users();
        return of({ users: allUsers });
    }
}
