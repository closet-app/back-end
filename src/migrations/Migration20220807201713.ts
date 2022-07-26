import { Migration } from '@mikro-orm/migrations';

export class Migration20220807201713 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "review" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" text not null, "last_name" text not null, "email" text not null, "password" text not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "review" cascade;');

    this.addSql('drop table if exists "users" cascade;');
  }

}
