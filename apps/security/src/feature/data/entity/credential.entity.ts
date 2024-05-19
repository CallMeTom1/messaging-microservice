import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import {Exclude} from "class-transformer";
import {CredentialI} from "../../common/security";
@Entity('credentials')
export class Credential implements CredentialI{
  @PrimaryColumn('varchar', { length:26})
  credentialId: string;
  @Column({nullable: false, unique: true})
  username: string;
  @Exclude({ toPlainOnly: true })
  @Column({nullable: true})
  password: string;
  @Column({nullable: true, unique: true})
  mail: string;
  @Column({ nullable: true, unique: true })
  googleHash: string;
  @Column({ nullable: true, unique: true })
  facebookHash: string;
  @Column({default:false})
  isAdmin:boolean;
  @Column({default: true})
  active: boolean;
  @CreateDateColumn()
  created: string;
  @UpdateDateColumn()
  updated: string;
}