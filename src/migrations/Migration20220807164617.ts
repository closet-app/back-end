import { Migration } from '@mikro-orm/migrations';

export class Migration20220807164617 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "review" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" text not null, "last_name" text not null, "email" text not null, "password" text not null);');

    this.addSql('drop table if exists "user" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, "first_name" text not null default null, "last_name" text not null default null, "email" text not null default null, "password" text not null default null);');

    this.addSql('drop table if exists "review" cascade;');

    this.addSql('drop table if exists "users" cascade;');
  }

}
