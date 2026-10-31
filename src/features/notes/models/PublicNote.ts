/** A note opened through its public link. updatedAt is epoch ms. */
export interface PublicNote {
  title: string;
  content: string;
  updatedAt: number;
  ownerName: string;
}
