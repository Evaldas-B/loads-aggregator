CREATE TYPE location_type AS ENUM('pickup', 'delivery');

CREATE TABLE agg_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    city VARCHAR(256),
    country VARCHAR(2) NOT NULL,
    postcode VARCHAR(64),
    coordinates GEOGRAPHY(POINT) NOT NULL,
    
    load_id UUID REFERENCES agg_loads(id) ON DELETE CASCADE NOT NULL,
    type location_type NOT NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID DEFAULT auth.uid()
);

-- Enables row level security only, this denies all operations unless there are policies that allow specific operations
ALTER TABLE agg_locations ENABLE ROW LEVEL SECURITY;

-- Authenticated users are permitted to read only those records where the "is_deleted" field is set to FALSE
CREATE POLICY allow_authenticated_users_to_read_non_deleted_records 
ON agg_locations 
FOR SELECT
TO authenticated
USING (is_deleted = FALSE);

-- Computed field(virtual column) that returns longitude
CREATE FUNCTION lng(agg_locations)
RETURNS FLOAT AS $$
    SELECT ST_X($1.coordinates::geometry)
$$ LANGUAGE SQL;

-- Computed field(virtual column) that returns latitude
CREATE FUNCTION lat(agg_locations)
RETURNS FLOAT AS $$
    SELECT ST_Y($1.coordinates::geometry)
$$ LANGUAGE SQL;