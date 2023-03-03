import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  BeforeInsert, 
  UpdateDateColumn 
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamptz' })
  public createdAt: Date;
  
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
  
  @BeforeInsert()
  private beforeInsert(): void {
    this.createdAt = new Date();
  }
}