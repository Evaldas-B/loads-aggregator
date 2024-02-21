CREATE OR REPLACE FUNCTION filter_loads_by_path_radius(
  path TEXT DEFAULT NULL, -- Expected format: LineString(5.48722 50.8678, 4.91613 52.3262)
  radius INT DEFAULT NULL -- Expected format: 30
)
RETURNS TABLE (
  load_id UUID
) AS
$$
#variable_conflict use_column -- Allows to reuse load_id in RETURNS TABLE definition
  BEGIN

    -- If at least one of the required filters is not provided don't filter at all
    IF path IS NULL OR radius IS NULL THEN
    RETURN QUERY SELECT id FROM agg_loads;

    ELSE 
      RETURN QUERY
        SELECT
            load_id
        FROM
            agg_locations
        GROUP BY load_id
          HAVING 
          -- Checks if ALL locations belonging to load pass the location filter
            COUNT(load_id) = 
            COUNT(
              CASE WHEN ST_DWithin(coordinates, ST_GeomFromText(path), radius * 1000)
              THEN 1 END -- Count how many locations belonging to load are in radius
            );
    END IF;
  END;
$$ LANGUAGE PLPGSQL;