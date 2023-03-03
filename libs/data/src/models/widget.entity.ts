import {
	BeforeInsert,
  Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Channel } from '../models';


@Entity({ name: 'widgets' })
export class Widget {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column('numeric', {precision: 14, scale: 2})
  price: number;

  @Column('smallint')
  startX: number;

  @Column('smallint')
  startY: number;

  @Column()
  channelId: string;

	@ManyToOne(() => Channel, channel => channel.widgets)
	channel: Channel;

  @Column()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.createdAt = new Date();
  }
}
