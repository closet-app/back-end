import { Migration } from '@mikro-orm/migrations';

export class Migration20220805013124 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "review" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_atd" timestamptz(0) not null, "name" text not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "review" cascade;');
  }

}
