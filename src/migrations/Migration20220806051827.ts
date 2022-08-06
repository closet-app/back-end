import { Migration } from '@mikro-orm/migrations';

export class Migration20220806051827 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('alter table "review" drop constraint "review_pkey";');
    this.addSql('alter table "review" rename column "_id" to "id";');
    this.addSql('alter table "review" rename column "updated_atd" to "updated_at";');
    this.addSql('alter table "review" add constraint "review_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');

    this.addSql('alter table "review" drop constraint "review_pkey";');
    this.addSql('alter table "review" rename column "id" to "_id";');
    this.addSql('alter table "review" rename column "updated_at" to "updated_atd";');
    this.addSql('alter table "review" add constraint "review_pkey" primary key ("_id");');
  }

}
