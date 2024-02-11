CREATE ROLE "agg_loads_inserter";

-- Enables authenticator to set role in JWT to agg_loads_inserter https://supabase.com/docs/guides/database/postgres/roles#authenticator
GRANT "agg_loads_inserter" TO authenticator;