'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Info,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { NAV_LINKS } from '@/constants/navigation';
import { useHeaderT } from '@/i18n';
import { authHref } from '@/constants/auth-links';

const NAV_ICONS: Record<string, LucideIcon> = {
  '/courses': BookOpen,
  '/programs': GraduationCap,
  '/about': Info,
};

const itemBase =
  'flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors duration-150';
const itemColor =
  'text-brand-navy/70 hover:bg-brand-navy/5 hover:text-brand-navy';
const navLinkCls =
  'text-brand-navy/55 hover:bg-brand-navy/4 hover:text-brand-navy block px-4 py-2 text-sm transition-colors';

interface MobileAccordionItemProps {
  id: string;
  icon: LucideIcon;
  iconClassName?: string;
  label: string;
  labelClassName?: string;
  expanded: boolean;
  onToggle: () => void;
  className?: string;
  activeClassName?: string;
  borderClassName?: string;
  children: React.ReactNode;
}

function MobileAccordionItem({
  id,
  icon: Icon,
  iconClassName = 'h-4 w-4 shrink-0 opacity-50',
  label,
  labelClassName = 'flex-1 text-left font-medium',
  expanded,
  onToggle,
  className,
  activeClassName = 'text-brand-navy!',
  borderClassName = 'border-brand-navy/10',
  children,
}: MobileAccordionItemProps) {
  const panelId = `mp-${id.replace(/\W/g, '-')}`;
  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          itemBase,
          className ?? itemColor,
          expanded && activeClassName,
        )}
      >
        <Icon aria-hidden className={iconClassName} />
        <span className={labelClassName}>{label}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            'h-4 w-4 opacity-40 transition-[rotate] duration-200',
            expanded && 'rotate-180 opacity-70',
          )}
        />
      </button>
      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className={cn('ml-4 border-l py-0.5', borderClassName)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileNav({ onClose }: { onClose: () => void }) {
  const t = useHeaderT();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  return (
    <div className="py-1">
      {NAV_LINKS.map((link) => {
        const Icon = NAV_ICONS[link.href] ?? Info;
        const hasChildren = !!link.children?.length;
        const isExpanded = expanded === link.href;

        return (
          <div key={link.href}>
            {hasChildren ? (
              <MobileAccordionItem
                id={link.href}
                icon={Icon}
                label={link.label}
                expanded={isExpanded}
                onToggle={() => toggle(link.href)}
              >
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className={navLinkCls}
                  >
                    {child.label}
                  </Link>
                ))}
              </MobileAccordionItem>
            ) : (
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(itemBase, itemColor)}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0 opacity-50" />
                <span className="flex-1 font-medium">{link.label}</span>
                <ChevronRight aria-hidden className="h-4 w-4 opacity-20" />
              </Link>
            )}
          </div>
        );
      })}

      <div aria-hidden className="bg-brand-navy/10 mx-4 my-1.5 h-px" />

      <MobileAccordionItem
        id="__login"
        icon={LogIn}
        label={t('login')}
        expanded={expanded === '__login'}
        onToggle={() => toggle('__login')}
      >
        <Link
          href={authHref('login', 'learner')}
          onClick={onClose}
          className={navLinkCls}
        >
          {t('learner')}
        </Link>
        <Link
          href={authHref('login', 'educator')}
          onClick={onClose}
          className={navLinkCls}
        >
          {t('educator')}
        </Link>
      </MobileAccordionItem>

      <MobileAccordionItem
        id="__register"
        icon={UserPlus}
        iconClassName="h-4 w-4 shrink-0"
        label={t('register')}
        labelClassName="flex-1 text-left"
        expanded={expanded === '__register'}
        onToggle={() => toggle('__register')}
        className="text-brand-gold hover:bg-brand-gold/5 font-semibold"
        activeClassName=""
        borderClassName="border-brand-gold/20"
      >
        <Link
          href={authHref('signup', 'learner')}
          onClick={onClose}
          className="text-brand-gold/70 hover:bg-brand-gold/5 hover:text-brand-gold block px-4 py-2 text-sm transition-colors"
        >
          {t('learner')}
        </Link>
        <Link
          href={authHref('signup', 'educator')}
          onClick={onClose}
          className="text-brand-gold/70 hover:bg-brand-gold/5 hover:text-brand-gold block px-4 py-2 text-sm transition-colors"
        >
          {t('educator')}
        </Link>
      </MobileAccordionItem>
    </div>
  );
}
