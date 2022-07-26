import type { Client } from "pg";
import { Memo } from "../models";

export class MemoService {
  constructor(private client: Client) {}

  async createMemo(content: string, image: string) {
    await this.client.query(
      /*sql */ `INSERT INTO memos (content, image) VALUES ($1, $2)`,
      [content, image]
    );
  }

  async getAllMemo() {
    return (
      await this.client.query<Memo>(
        /*sql */ `SELECT id, content, image FROM memos ORDER BY id`
      )
    ).rows;
  }

  async editMemo(id: number, content: string) {
    const result = await this.client.query(
      /*sql */ `UPDATE memos SET content = $1 WHERE id = $2`,
      [content, id]
    );
    return result.rowCount > 0;
  }

  deleteMemo = (id: number) =>
    this.client.query(/*sql */ `DELETE FROM memos WHERE id = $1`, [id]);

  async getLikeMemos(userId: number) {
    return (
      await this.client.query<Memo>(
        /*sql */ `
    SELECT m.id, m.content, m.image
    FROM likes
    INNER JOIN memos m ON likes.memo_id = m.id
    WHERE likes.user_id = $1
    `,
        [userId]
      )
    ).rows;
  }

  async createLikeMemo(userId: number, memoId: number) {
    await this.client.query(
      /*sql */ `INSERT INTO likes (user_id, memo_id) VALUES ($1, $2)`,
      [userId, memoId]
    );
  }
}
