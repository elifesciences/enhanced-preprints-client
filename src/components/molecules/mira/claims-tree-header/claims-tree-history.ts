// Uses the Navigation API, which (unlike the History API) exposes the URLs of the tab's previous same-origin entries.
// Our TypeScript version doesn't include its types yet, so only the parts used here are declared.
type NavigationHistoryEntry = {
  key: string,
  index: number,
  url: string | null,
};

type Navigation = {
  currentEntry: NavigationHistoryEntry | null,
  entries: () => Array<NavigationHistoryEntry>,
  traverseTo: (key: string) => unknown,
};

const claimsTreePath = '/mira/claims-tree';

const isClaimsTreeUrl = (url: string | null): boolean => {
  if (!url) {
    return false;
  }

  const { pathname } = new URL(url);

  return pathname === claimsTreePath || pathname.startsWith(`${claimsTreePath}/`);
};

// Goes back to the most recent history entry that isn't a claims tree page. Returns false if that isn't possible,
// e.g. the claims tree was opened in a new tab.
export const exitClaimsTree = (): boolean => {
  const { navigation } = window as unknown as { navigation?: Navigation };
  const current = navigation?.currentEntry;

  if (!navigation || !current) {
    return false;
  }

  const previousEntries = navigation.entries().slice(0, current.index);
  const target = previousEntries.findLast((entry) => !isClaimsTreeUrl(entry.url));

  if (target) {
    navigation.traverseTo(target.key);
    return true;
  }

  // entries() only lists the same-origin entries either side of the current one, so if the history is longer there
  // may be a page from another site behind the first of them.
  if (window.history.length > navigation.entries().length) {
    window.history.go(-(current.index + 1));
    return true;
  }

  return false;
};
