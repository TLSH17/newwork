// import type { Client } from "pg";
// import type { Memo } from "../models";
import { Knex } from 'knex';
// import {knex} from '../server';

export class MemoService {
  constructor(private knex: Knex) { }

  async createMemo(content: string, image: string) {
    const result = await this.knex("memos").insert(
      {
        content: content,
        image: image,
        // /*sql */ `INSERT INTO memos (content, image) VALUES ($1, $2)`,
        // [content, image]
      });
    return result;
  }

  async getAllMemo() {
    const result = await this.knex("memos")
      .select("id", "content", "image")
      .orderBy("id");

    return result;
  }

  async editMemo(id: number, content: string) {
    const result = await this.knex("memos")
      .update({ content: content })
      .where("id", id);

    return result;
    // query(
    //   /*sql */ `UPDATE memos SET content = $1 WHERE id = $2`,
    //   [content, id]
    // );
    // return result.rowCount > 0;
  }

  async deleteMemo(id: number) {
    const result = await this.knex("memos")
      .where("id", id)
      .del();

    return result;

    // query(/*sql */ `DELETE FROM memos WHERE id = $1`, [id]);

  }


  async getLikeMemos(userId: number) {
    const result = await this.knex.raw(
      `    SELECT m.id, m.content, m.image
      FROM likes
      INNER JOIN memos m ON likes.memo_id = m.id
      WHERE likes.user_id = userId`
    )
    return result;


    //   await this.client.query<Memo>(
    //     /*sql */ `
    // SELECT m.id, m.content, m.image
    // FROM likes
    // INNER JOIN memos m ON likes.memo_id = m.id
    // WHERE likes.user_id = $1
    // `,
    //     [userId]
    //   )
    // ).rows;
  }

  async createLikeMemo(userId: number, memoId: number) {

    const result = await this.knex("likes")
      .insert({
        user_id: userId,
        memo_id: memoId,
      })

    return result;
    // await this.client.query(
    //   /*sql */ `INSERT INTO likes (user_id, memo_id) VALUES ($1, $2)`,
    //   [userId, memoId]
    // );
  }
}
