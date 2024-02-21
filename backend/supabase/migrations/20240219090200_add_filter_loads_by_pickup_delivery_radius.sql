CREATE OR REPLACE FUNCTION filter_locations_by_radius(
  location_type location_type, -- Expected value: 'pickup' | 'delivery'
  center TEXT DEFAULT NULL, -- Expected format: POINT(6.0839 50.7753)
  radius INT DEFAULT 10 -- Expected format: integer representing kilometers
)
RETURNS TABLE (
  load_id UUID
) AS
$$
#variable_conflict use_column -- Allows to reuse load_id in RETURNS TABLE definition
BEGIN
  -- If at least one of the required filters is not provided don't filter at all
  IF center IS NULL OR radius IS NULL THEN
    RETURN QUERY SELECT DISTINCT load_id FROM agg_locations;

  ELSE
    RETURN QUERY 
      SELECT load_id
      FROM agg_locations
      WHERE type = location_type -- targets only specific location type (pickup | delivery)
      GROUP BY load_id

      HAVING 
      -- Checks if ALL locations belonging to load pass the location filter
      COUNT(load_id) = 
      COUNT(
        CASE WHEN ST_DWithin(coordinates, center::GEOGRAPHY, radius * 1000)
        THEN 1 END -- Count how many locations belonging to load are in radius
      );
  END IF;
END;
$$ LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION filter_loads_by_pickup_delivery_radius(
  pickup_center TEXT DEFAULT NULL, -- Expected format: POINT(6.0839 50.7753)
  pickup_radius INT DEFAULT 10, -- Expected format: integer representing distance in kilometers
  delivery_center TEXT DEFAULT NULL, -- Expected format: POINT(6.0839 50.7753)
  delivery_radius INT DEFAULT 10 -- Expected format: integer representing distance in kilometers
) 
RETURNS TABLE (
  load_id UUID
) AS
$$
#variable_conflict use_column -- Allows to reuse load_id in RETURNS TABLE definition

BEGIN
  RETURN QUERY
    -- Apply filters and return only load id's of those tables that passed all filters
    SELECT load_id FROM filter_locations_by_radius('pickup', pickup_center, pickup_radius)
    INTERSECT
    SELECT load_id FROM filter_locations_by_radius('delivery', delivery_center, delivery_radius);
END;
$$ LANGUAGE PLPGSQL;