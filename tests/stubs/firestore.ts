/** Stand-in for Firestore: one config/app document, or a failed read. */
export const remote = { data: undefined as unknown, fail: false, reads: 0 };
export const doc = (_db: unknown, collection: string, id: string) => ({ path: `${collection}/${id}` });
export const getDoc = async (ref: { path: string }) => {
  remote.reads += 1;
  if (remote.fail || ref.path !== 'config/app') throw new Error('offline');
  return { data: () => remote.data };
};
export type Firestore = object;
