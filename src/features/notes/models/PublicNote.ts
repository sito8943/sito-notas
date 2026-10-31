/** A note opened through its public link. updatedAt is epoch ms. */
export interface PublicNote {
  /** Only when the signed-in user owns the note or it is shared with them */
  noteId?: number;
  title: string;
  content: string;
  updatedAt: number;
  ownerName: string;
}
