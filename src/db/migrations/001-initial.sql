--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE Items (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL
);

INSERT INTO Items (id, name) VALUES (1, 'Buy Milk');
INSERT INTO Items (id, name) VALUES (2, 'Relax');
INSERT INTO Items (id, name) VALUES (3, 'Complete all tasks');



--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
--DROP TABLE Items;
