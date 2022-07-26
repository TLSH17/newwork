// import type { Client } from "pg";
import { Knex } from "knex";

import { Memo } from "../models";

export class MemoKnexService {
  constructor(private knex: Knex) { }

  async createMemo(content: string, image: string) {
    // await this.client.query(
    //   /*sql */ `INSERT INTO memos (content, image) VALUES ($1, $2)`,
    //   [content, image]
    // );

    let data = { content: content, image: image }

    await this.knex("memos").insert(data);
  }

  async getAllMemo() {
    // return (
    //   await this.client.query<Memo>(
    //     /*sql */ `SELECT id, content, image FROM memos ORDER BY id`
    //   )
    // ).rows;

    const memos: Memo[] = await this.knex.select("id", "content", "image").from("memos");

    console.log(memos);

    return memos;
  }

  async editMemo(id: number, content: string) {
    // const result = await this.client.query(
    //   /*sql */ `UPDATE memos SET content = $1 WHERE id = $2`,
    //   [content, id]
    // );
    // return result.rowCount > 0;

    console.log("under consturction")
    return true
  }

  deleteMemo = (id: number) => {
    // this.client.query(/*sql */ `DELETE FROM memos WHERE id = $1`, [id]);
  }


  async getLikeMemos(userId: number) {
    // return (
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
    console.log("under consturction")
  }

  async createLikeMemo(userId: number, memoId: number) {
    // await this.client.query(
    //   /*sql */ `INSERT INTO likes (user_id, memo_id) VALUES ($1, $2)`,
    //   [userId, memoId]
    // );
    console.log("under consturction")

  }
}
