import { Migration } from '@mikro-orm/migrations';

export class Migration20220805151925 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "review" drop constraint "review_pkey";');
    this.addSql('alter table "review" rename column "_id" to "id";');
    this.addSql('alter table "review" rename column "name" to "title";');
    this.addSql('alter table "review" add constraint "review_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" drop constraint "review_pkey";');
    this.addSql('alter table "review" rename column "id" to "_id";');
    this.addSql('alter table "review" rename column "title" to "name";');
    this.addSql('alter table "review" add constraint "review_pkey" primary key ("_id");');
  }

}
