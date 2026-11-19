type StoryblokBridgeInstance = {
  on: (
    events: string | string[],
    cb: (payload?: { action?: string }) => void,
  ) => void;
};

/** Reload the page when the Visual Editor changes the open story. */
export function initStoryblokBridge() {
  const StoryblokBridge = (
    window as unknown as {
      StoryblokBridge?: new (
        options: Record<string, unknown>,
      ) => StoryblokBridgeInstance;
    }
  ).StoryblokBridge;

  if (!StoryblokBridge) return;

  const bridge = new StoryblokBridge({});
  bridge.on(["input", "published", "change"], () => {
    window.location.reload();
  });
}
