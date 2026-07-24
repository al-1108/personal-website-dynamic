alter table public.blogs
  add column if not exists youtube_url text;

alter table public.blogs
  alter column image drop not null;

alter table public.blogs
  drop constraint if exists blogs_exactly_one_media;

alter table public.blogs
  add constraint blogs_exactly_one_media check (
    (
      nullif(btrim(image), '') is not null
      and nullif(btrim(youtube_url), '') is null
    )
    or
    (
      nullif(btrim(image), '') is null
      and nullif(btrim(youtube_url), '') is not null
    )
  );
