interface PageHeroProps {
  title: string;
  description: string;
  className?: string;
}

export function PageHero({ title, description, className }: PageHeroProps) {
  return (
    <div className={className}>
      <h1 className="text-brand-gold text-2xl font-black sm:text-3xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
        {description}
      </p>
    </div>
  );
}
