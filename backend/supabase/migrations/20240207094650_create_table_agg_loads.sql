CREATE TABLE agg_loads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    load_factors NUMERIC[],
    shipping_prices NUMERIC[],
    route GEOGRAPHY(LineString) NOT NULL, -- Route connecting all locations related to load
    distance NUMERIC NOT NULL,

    -- Contacts
    phones VARCHAR(64)[],
    emails VARCHAR(256)[],
    company VARCHAR(256),

    -- Metadata
    is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by UUID DEFAULT auth.uid()
);

-- Enables row level security, this denies all operations unless there are policies that allow specific operations
ALTER TABLE agg_loads ENABLE ROW LEVEL SECURITY;

-- Enables all privileges(CRUD + references, trigger, truncate, usage)
GRANT ALL PRIVILEGES ON TABLE agg_loads TO "agg_loads_inserter";

-- Enables all actions for users with admin role
CREATE POLICY "enable_all_actions_for_agg_loads_inserter" 
ON agg_loads
AS PERMISSIVE FOR ALL
TO "agg_loads_inserter"
USING (TRUE)
WITH CHECK (TRUE);


-- Authenticated users are permitted to read only those records where the "is_deleted" field is set to FALSE
CREATE POLICY allow_authenticated_users_to_read_non_deleted_records 
ON agg_loads 
FOR SELECT
TO authenticated
USING (is_deleted = FALSE);

-- Computed field(virtual column) that returns path in lng,lat format
CREATE FUNCTION route_coordinates(agg_loads)
RETURNS jsonb AS $$
  SELECT (jsonb(ST_AsGeoJSON($1.route))) -> 'route_coordinates'
  FROM agg_loads;
$$
LANGUAGE SQL;
