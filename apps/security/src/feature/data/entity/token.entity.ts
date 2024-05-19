import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import {Credential} from './credential.entity';
import {TokenI} from '../../common/security'
@Entity('token')
export class Token implements TokenI{
  @PrimaryColumn('varchar', {length:26})
  tokenId: string;
  @Column({nullable: false})
  token: string;
  @Column({nullable: false})
  refreshToken: string;
  @OneToOne(() => Credential,{eager:true})
  @JoinColumn({name: 'credential_id'})
  credential: Credential
}