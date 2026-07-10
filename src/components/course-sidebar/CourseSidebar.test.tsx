import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseSidebar } from './CourseSidebar';
import {
  MOCK_COURSE,
  MOCK_CURRENT_ITEM_ID,
  makeLargeCourse,
} from './mock-data';

/**
 * The shared setup stubs `matchMedia` to always miss, which would render the
 * mobile drawer. Force the desktop breakpoint so the column renders inline.
 */
function setViewport(isDesktop: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: isDesktop,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

function renderSidebar(
  props: Partial<Parameters<typeof CourseSidebar>[0]> = {},
) {
  const onSelectItem = vi.fn();
  const onLockedItem = vi.fn();

  render(
    <CourseSidebar
      course={MOCK_COURSE}
      currentItemId={MOCK_CURRENT_ITEM_ID}
      onSelectItem={onSelectItem}
      onLockedItem={onLockedItem}
      storageKey={`test-${Math.random()}`}
      {...props}
    />,
  );

  return { onSelectItem, onLockedItem };
}

const moduleHeader = (name: RegExp) => screen.getByRole('button', { name });

beforeEach(() => {
  setViewport(true);
  window.localStorage.clear();
});

afterEach(() => vi.restoreAllMocks());

describe('CourseSidebar — structure', () => {
  it('renders the course title and overall progress', async () => {
    renderSidebar();
    await screen.findByRole('navigation', { name: /course content/i });

    expect(screen.getByText('Modern Web Foundations')).toBeInTheDocument();
    // 3 of 11 items complete.
    const bar = screen.getByRole('progressbar', { name: /overall progress/i });
    expect(bar).toHaveAttribute('aria-valuenow', '27');
  });

  it('expands the module holding the current item by default', async () => {
    renderSidebar();
    const header = await screen.findByRole('button', {
      name: /HTML & Semantics/,
    });
    expect(header).toHaveAttribute('aria-expanded', 'true');

    expect(
      screen.getByRole('button', { name: /Semantic Elements in Practice/ }),
    ).toHaveAttribute('aria-current', 'true');
  });

  it('renders the module roll-up across every lesson, not just the visible ones', async () => {
    renderSidebar();
    await screen.findByRole('navigation', { name: /course content/i });
    // Module 1 is collapsed but still reports 2 of 3 (rolled up from both its
    // lessons) — split across a completion pill and a plain percent text.
    expect(screen.getByText('2 of 3 completed')).toBeInTheDocument();
    expect(screen.getByText('67% complete')).toBeInTheDocument();
  });

  it('has no search box and no separate continue-learning footer', async () => {
    renderSidebar();
    await screen.findByRole('navigation', { name: /course content/i });
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });
});

describe('CourseSidebar — brand row', () => {
  it('keeps the collapse toggle in the same row as the brand', async () => {
    renderSidebar({ brand: <span data-testid="brand-mark">Brand</span> });
    const brand = await screen.findByTestId('brand-mark');
    const collapseButton = screen.getByRole('button', {
      name: /collapse sidebar/i,
    });

    expect(brand.parentElement).toContainElement(collapseButton);
  });
});

describe('CourseSidebar — lesson grouping', () => {
  it('renders a lesson bundling multiple items as a caption plus nested rows', async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(
      await screen.findByRole('button', { name: /Web Foundations/ }),
    );

    // The lesson caption is a label, not a row — it carries a completion count.
    expect(screen.getByText('Responsive Design')).toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Responsive Design Guide/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Responsive Design Quiz/ }),
    ).toBeInTheDocument();
  });

  it('renders a single-item lesson as exactly one row, no extra caption', async () => {
    renderSidebar();
    await screen.findByRole('button', { name: /HTML Introduction/ });
    // "HTML Introduction" is both the lesson and its only item; it must not
    // also appear as a separate, non-interactive caption line.
    expect(screen.getAllByText('HTML Introduction')).toHaveLength(1);
  });

  it('collapses and expands a multi-item lesson independently of its module, like a module does', async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(
      await screen.findByRole('button', { name: /Web Foundations/ }),
    );

    // The lesson header's title text is exactly "Responsive Design" — walking
    // up from it avoids guessing the button's full concatenated accessible
    // name, which also includes the "2/2" badge.
    const lessonHeader = screen
      .getByText('Responsive Design')
      .closest('button')!;
    // Unlocked lessons open by default — nothing extra to click for the
    // common case of wanting to see what's inside.
    expect(lessonHeader).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('button', { name: /Responsive Design Guide/ }),
    ).toBeInTheDocument();

    await user.click(lessonHeader);
    expect(lessonHeader).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('button', { name: /Responsive Design Guide/ }),
    ).not.toBeInTheDocument();

    await user.click(lessonHeader);
    expect(lessonHeader).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('button', { name: /Responsive Design Guide/ }),
    ).toBeInTheDocument();
  });

  it('starts a locked multi-item lesson collapsed', async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(
      await screen.findByRole('button', { name: /CSS Layout Basics/ }),
    );

    const lessonHeader = screen.getByRole('button', { name: /CSS Grid/ });
    expect(lessonHeader).toHaveAttribute('aria-expanded', 'false');

    // Still expandable while locked — a learner can preview what's coming.
    await user.click(lessonHeader);
    expect(lessonHeader).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('button', { name: /CSS Grid Fundamentals/ }),
    ).toHaveAttribute('aria-disabled', 'true');
  });
});

describe('CourseSidebar — accordion', () => {
  it('opens one module and closes the previous', async () => {
    const user = userEvent.setup();
    renderSidebar();

    const current = await screen.findByRole('button', {
      name: /HTML & Semantics/,
    });
    const other = moduleHeader(/Web Foundations/);

    await user.click(other);

    expect(other).toHaveAttribute('aria-expanded', 'true');
    expect(current).toHaveAttribute('aria-expanded', 'false');
  });

  it('collapses on a second click', async () => {
    const user = userEvent.setup();
    renderSidebar();

    const header = await screen.findByRole('button', {
      name: /HTML & Semantics/,
    });
    await user.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens a locked module for reading, with its items still inert', async () => {
    const user = userEvent.setup();
    const { onSelectItem, onLockedItem } = renderSidebar();

    const locked = await screen.findByRole('button', {
      name: /CSS Layout Basics/,
    });
    await user.click(locked);
    expect(locked).toHaveAttribute('aria-expanded', 'true');

    const row = screen.getByRole('button', { name: /Flexbox Deep Dive/ });
    await user.click(row);
    expect(onLockedItem).toHaveBeenCalledTimes(1);
    expect(onSelectItem).not.toHaveBeenCalled();
  });

  it('never opens an unpublished module', async () => {
    const user = userEvent.setup();
    renderSidebar();

    const disabled = await screen.findByRole('button', {
      name: /Capstone Project/,
    });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(disabled).not.toHaveAttribute('aria-expanded');

    await user.click(disabled);
    expect(disabled).not.toHaveAttribute('aria-expanded', 'true');
  });

  it('remembers the expanded module across remounts', async () => {
    const user = userEvent.setup();
    const key = 'remember-test';

    const { unmount } = render(
      <CourseSidebar
        course={MOCK_COURSE}
        currentItemId={MOCK_CURRENT_ITEM_ID}
        onSelectItem={vi.fn()}
        storageKey={key}
      />,
    );
    await user.click(
      await screen.findByRole('button', { name: /Web Foundations/ }),
    );
    unmount();

    render(
      <CourseSidebar
        course={MOCK_COURSE}
        currentItemId={MOCK_CURRENT_ITEM_ID}
        onSelectItem={vi.fn()}
        storageKey={key}
      />,
    );

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /Web Foundations/ }),
      ).toHaveAttribute('aria-expanded', 'true'),
    );
  });
});

describe('CourseSidebar — selection', () => {
  it('calls onSelectItem for an unlocked item', async () => {
    const user = userEvent.setup();
    const { onSelectItem } = renderSidebar();

    await user.click(
      await screen.findByRole('button', { name: /Accessible Forms/ }),
    );

    expect(onSelectItem).toHaveBeenCalledTimes(1);
    const [item, lesson, module] = onSelectItem.mock.calls[0]!;
    expect(item).toMatchObject({ id: 'item-forms-a11y' });
    expect(lesson).toMatchObject({ id: 'lesson-forms-a11y' });
    expect(module).toMatchObject({ id: 'module-2' });
  });
});

describe('CourseSidebar — keyboard', () => {
  it('moves focus between rows with the arrow keys', async () => {
    const user = userEvent.setup();
    renderSidebar();

    const first = await screen.findByRole('button', {
      name: /Web Foundations/,
    });
    first.focus();

    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(moduleHeader(/HTML & Semantics/));

    await user.keyboard('{ArrowUp}');
    expect(document.activeElement).toBe(first);
  });

  it('expands and collapses a module with the right and left arrows', async () => {
    const user = userEvent.setup();
    renderSidebar();

    const header = await screen.findByRole('button', {
      name: /Web Foundations/,
    });
    header.focus();

    await user.keyboard('{ArrowRight}');
    expect(header).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{ArrowLeft}');
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('CourseSidebar — mini rail', () => {
  it('collapses to a rail that hides item titles', async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(
      await screen.findByRole('button', { name: /collapse sidebar/i }),
    );

    expect(
      screen.queryByRole('button', { name: /Semantic Elements in Practice/ }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Module 2: HTML & Semantics/ }),
    ).toBeInTheDocument();
  });

  it('opens a floating preview on hover and selects an item directly from it', async () => {
    const user = userEvent.setup();
    const { onSelectItem } = renderSidebar();

    await user.click(
      await screen.findByRole('button', { name: /collapse sidebar/i }),
    );
    await user.hover(screen.getByRole('button', { name: /Module 2:/ }));

    const panel = await screen.findByRole('group', {
      name: 'HTML & Semantics',
    });
    expect(within(panel).getByText('Accessible Forms')).toBeInTheDocument();

    // No separate "Resume" affordance — every row is itself the way in.
    expect(
      within(panel).queryByRole('button', { name: /resume/i }),
    ).not.toBeInTheDocument();

    await user.click(
      within(panel).getByRole('button', {
        name: /Semantic Elements in Practice/,
      }),
    );
    expect(onSelectItem.mock.calls[0]?.[0]).toMatchObject({
      id: 'item-semantic-elements',
    });
  });
});

describe('CourseSidebar — large courses', () => {
  it('gives an oversized module its own scroll viewport', async () => {
    renderSidebar({
      course: makeLargeCourse(200),
      currentItemId: 'bulk-item-41-a',
    });

    await waitFor(() => {
      const viewport = document.querySelector(
        '.overflow-y-auto.overscroll-contain',
      );
      expect(viewport).not.toBeNull();
    });
  });
});

describe('CourseSidebar — mobile drawer', () => {
  it('renders a trigger instead of a column below the desktop breakpoint', async () => {
    setViewport(false);
    const user = userEvent.setup();
    renderSidebar();

    const trigger = await screen.findByRole('button', {
      name: /open course content/i,
    });
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

    await user.click(trigger);
    expect(
      await screen.findByRole('navigation', { name: /course content/i }),
    ).toBeInTheDocument();
  });
});
