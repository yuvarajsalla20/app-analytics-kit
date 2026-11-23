/** Stand-in for OpenPanel: remembers what the kit created and sent. */
export const created: Record<string, unknown>[] = [];
export const sent: { name: string; path: string }[] = [];

export class OpenPanel {
  constructor(options: Record<string, unknown>) {
    created.push(options);
  }
  screenView(path: string) {
    sent.push({ name: 'screen_view', path });
  }
}
