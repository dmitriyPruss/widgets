import {
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Widget } from '.';


@Entity({ name: 'channels' })
export class Channel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  key: string;

  @Column()
  ingestEndpoint: string;

  @Column()
  playbackURL: string;

  @Column()
  ARN: string;

	@OneToMany(
		() => Widget,
		(widget) => widget.channel,
		{ cascade: ['insert', 'update'] }
	)
	widgets: Widget[];

  @Column()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @BeforeInsert()
  private beforeInsert(): void {
	  this.createdAt = new Date();
  }
}
