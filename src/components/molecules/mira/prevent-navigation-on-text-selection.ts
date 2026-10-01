import type { MouseEvent } from 'react';

export const preventNavigationOnTextSelection = (event: MouseEvent<HTMLAnchorElement>): void => {
  const selection = window.getSelection();

  if (selection && !selection.isCollapsed && selection.containsNode(event.currentTarget, true)) {
    event.preventDefault();
  }
};
